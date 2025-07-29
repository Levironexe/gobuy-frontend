// utils/currency.js - Corrected API and localStorage structure

const FASTFOREX_API_KEY = '7f7ae93d1f-633aa4cd30-t04uaq'
const FASTFOREX_BASE_URL = 'https://api.fastforex.io'

// Get user's currency setting from localStorage (currency-specific key)
export const getUserCurrency = () => {
  try {
    // Check dedicated currency key first
    const currency = localStorage.getItem('gobuy_currency')
    if (currency) {
      return currency
    }
    
    // Fallback to nested settings for migration (optional)
    const settings = localStorage.getItem('gobuy_settings')
    if (settings) {
      const parsed = JSON.parse(settings)
      if (parsed.currency) {
        // Migrate to dedicated key
        setUserCurrency(parsed.currency)
        return parsed.currency
      }
    }
  } catch (err) {
    console.error('Failed to get currency setting:', err)
  }
  return 'USD' // Default fallback
}

// Set user's currency preference (dedicated storage)
export const setUserCurrency = (currency) => {
  try {
    // Store currency in dedicated key
    localStorage.setItem('gobuy_currency', currency)
    console.log(`💱 Currency set to: ${currency}`)
    
    // Dispatch event for cross-component reactivity
    window.dispatchEvent(new CustomEvent('currencyChanged', { 
      detail: { currency } 
    }))
  } catch (err) {
    console.error('Failed to update currency setting:', err)
  }
}

// Currency configuration (unchanged)
export const currencyConfig = {
  USD: { symbol: '$', name: 'US Dollar', decimals: 2 },
  EUR: { symbol: '€', name: 'Euro', decimals: 2 },
  GBP: { symbol: '£', name: 'British Pound', decimals: 2 },
  JPY: { symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', decimals: 2 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', decimals: 2 },
  VND: { symbol: '₫', name: 'Vietnamese Dong', decimals: 0 },
  CNY: { symbol: '¥', name: 'Chinese Yuan', decimals: 2 },
  KRW: { symbol: '₩', name: 'South Korean Won', decimals: 0 },
  INR: { symbol: '₹', name: 'Indian Rupee', decimals: 2 }
}

// Cache for exchange rates
let exchangeRatesCache = {
  rates: {},
  lastUpdated: null,
  baseCurrency: 'USD'
}

const CACHE_DURATION = 10 * 60 * 1000

const isCacheValid = () => {
  if (!exchangeRatesCache.lastUpdated) return false
  return Date.now() - exchangeRatesCache.lastUpdated < CACHE_DURATION
}

// Fetch exchange rates using correct API endpoint
export const fetchExchangeRates = async (fromCurrency = 'USD', toCurrencies = null) => {
  try {
    // Default currencies to fetch if none specified
    const defaultCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'VND', 'CNY', 'KRW', 'INR']
    const currencies = toCurrencies || defaultCurrencies
    
    console.log(`💱 Fetching exchange rates from ${fromCurrency} to [${currencies.join(', ')}]`)
    
    // Use /fetch-multi endpoint to match your sample
    const response = await fetch(
      `${FASTFOREX_BASE_URL}/fetch-multi?from=${fromCurrency}&to=${currencies.join(',')}&api_key=${FASTFOREX_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error(`FastForex API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }
    
    // Update cache with the results
    exchangeRatesCache = {
      rates: data.results || {},
      lastUpdated: Date.now(),
      baseCurrency: fromCurrency
    }
    
    console.log('✅ Exchange rates updated:', exchangeRatesCache.rates)
    return exchangeRatesCache.rates
    
  } catch (err) {
    console.error('❌ Failed to fetch exchange rates:', err)
    throw err
  }
}

export const getExchangeRate = async (fromCurrency = 'USD', toCurrency = 'USD') => {
  if (fromCurrency === toCurrency) return 1
  
  // Check cache first
  if (isCacheValid() && exchangeRatesCache.baseCurrency === fromCurrency) {
    const rate = exchangeRatesCache.rates[toCurrency]
    if (rate) return rate
  }
  
  // Fetch new rates if cache is invalid
  const rates = await fetchExchangeRates(fromCurrency)
  return rates[toCurrency] || 1
}

export const convertPrice = async (price, fromCurrency = 'USD', toCurrency = null) => {
  const targetCurrency = toCurrency || getUserCurrency()
  
  if (fromCurrency === targetCurrency) {
    return parseFloat(price)
  }
  
  const rate = await getExchangeRate(fromCurrency, targetCurrency)
  return parseFloat(price) * rate
}

export const formatPrice = (usdPrice, targetCurrency = null) => {
  const currency = targetCurrency || getUserCurrency()
  const config = currencyConfig[currency]
  
  if (!config || currency === 'USD') {
    return `$${parseFloat(usdPrice).toFixed(2)}`
  }
  
  // Only use cached rate if available
  if (isCacheValid() && exchangeRatesCache.rates[currency]) {
    const convertedPrice = parseFloat(usdPrice) * exchangeRatesCache.rates[currency]
    
    switch (currency) {
      case 'EUR':
        return `${convertedPrice.toFixed(config.decimals)} ${config.symbol}`
      case 'JPY':
      case 'VND':
      case 'KRW':
        return `${config.symbol}${Math.round(convertedPrice).toLocaleString()}`
      default:
        return `${config.symbol}${convertedPrice.toFixed(config.decimals)}`
    }
  }
  
  console.warn(`No cached rate for ${currency}, showing USD`)
  return `$${parseFloat(usdPrice).toFixed(2)}`
}

export const formatPriceAsync = async (usdPrice, targetCurrency = null) => {
  const currency = targetCurrency || getUserCurrency()
  const config = currencyConfig[currency]
  
  if (!config || currency === 'USD') {
    return `$${parseFloat(usdPrice).toFixed(2)}`
  }
  
  try {
    const convertedPrice = await convertPrice(usdPrice, 'USD', currency)
    
    switch (currency) {
      case 'EUR':
        return `${convertedPrice.toFixed(config.decimals)} ${config.symbol}`
      case 'JPY':
      case 'VND':
      case 'KRW':
        return `${config.symbol}${Math.round(convertedPrice).toLocaleString()}`
      default:
        return `${config.symbol}${convertedPrice.toFixed(config.decimals)}`
    }
  } catch (err) {
    console.error('Price formatting failed:', err)
    return `$${parseFloat(usdPrice).toFixed(2)}`
  }
}

export const initializeCurrency = async () => {
  const userCurrency = getUserCurrency()
  console.log(`🚀 Initializing currency system with: ${userCurrency}`)
  
  if (userCurrency !== 'USD') {
    try {
      await fetchExchangeRates('USD')
    } catch (err) {
      console.warn('⚠️ Failed to initialize exchange rates, will try again later')
    }
  }
}

export const getCurrencySymbol = (targetCurrency = null) => {
  const currency = targetCurrency || getUserCurrency()
  const config = currencyConfig[currency]
  return config ? config.symbol : '$'
}

export const getCurrencyInfo = (targetCurrency = null) => {
  const currency = targetCurrency || getUserCurrency()
  return currencyConfig[currency] || currencyConfig.USD
}

export const refreshExchangeRates = async () => {
  console.log('Manually refreshing exchange rates...')
  exchangeRatesCache.lastUpdated = null
  
  try {
    await fetchExchangeRates('USD')
    
    window.dispatchEvent(new CustomEvent('currencyChanged', { 
      detail: { currency: getUserCurrency() } 
    }))
    
    return exchangeRatesCache.rates
  } catch (err) {
    console.error('Failed to refresh exchange rates:', err)
    throw err
  }
}