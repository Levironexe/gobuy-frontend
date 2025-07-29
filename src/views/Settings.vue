<template>
  <div class="settings-page py-16">
    <!-- Header -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-6 mb-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          <span class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">{{ t('settings') }}</span>
        </h1>
        <p class="text-gray-600 text-lg text-center mt-2">{{ t('settings_subtitle') }}</p>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-2xl">
      <!-- Success Message -->
      <div v-if="saved" class="bg-green-100 border border-green-400 text-green-700 rounded-xl p-4 mb-6">
        <div class="flex items-center gap-2">
          <span>✅</span>
          <div>
            <div class="font-medium">{{ t('settings_saved') }}</div>
            <div v-if="settings.currency !== 'USD'" class="text-sm text-green-600 mt-1">
              {{ t('currency_changed_refresh') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Form -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
        
        <!-- Language Settings -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('language_region') }}</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-medium mb-2">{{ t('language') }}</label>
              <select v-model="settings.language" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="vi">🇻🇳 Tiếng Việt</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">{{ t('currency') }}</label>
              <select v-model="settings.currency" @change="updateCurrencyPreview" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                <option value="USD">$ USD - US Dollar</option>
                <option value="EUR">€ EUR - Euro</option>
                <option value="GBP">£ GBP - British Pound</option>
                <option value="JPY">¥ JPY - Japanese Yen</option>
                <option value="CAD">$ CAD - Canadian Dollar</option>
                <option value="AUD">$ AUD - Australian Dollar</option>
                <option value="VND">₫ VND - Vietnamese Dong</option>
                <option value="CNY">¥ CNY - Chinese Yuan</option>
                <option value="KRW">₩ KRW - Korean Won</option>
                <option value="INR">₹ INR - Indian Rupee</option>
              </select>
              
              <!-- Currency Preview -->
              <div v-if="currencyPreview" class="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div class="text-sm text-orange-700">
                  <strong>{{ t('preview') }}</strong> $99.99 USD → {{ currencyPreview }}
                </div>
                <div v-if="loadingPreview" class="text-xs text-orange-600 mt-1">
                  <span class="inline-block w-3 h-3 border border-orange-400 border-t-transparent rounded-full animate-spin mr-1"></span>
                  {{ t('fetching_rates') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex gap-4">
          <button @click="saveSettings" :disabled="saving" 
            class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg disabled:hover:transform-none">
            {{ saving ? t('saving') : t('save_settings') }}
          </button>
          <button @click="resetSettings" 
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200">
            {{ t('reset_to_default') }}
          </button>
        </div>

        <!-- Prototype Notice -->
        <div class="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p class="text-blue-700 text-sm">
            <strong>{{ t('note') }}:</strong> {{ t('prototype_notice') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { t } from '@/utils/language'

const saving = ref(false)
const saved = ref(false)
const currencyPreview = ref('')
const loadingPreview = ref(false)

// Default settings
const defaultSettings = {
  language: 'en',
  currency: 'USD',
  theme: 'light',
  itemsPerPage: '9',
  emailNotifications: true,
  marketingEmails: false,
  priceAlerts: true,
  profilePublic: false,
  showOnlineStatus: true,
  allowAnalytics: true
}

const settings = ref({ ...defaultSettings })

// Individual localStorage keys for separate storage
const STORAGE_KEYS = {
  language: 'gobuy_language',
  currency: 'gobuy_currency', 
  theme: 'gobuy_theme',
  itemsPerPage: 'gobuy_items_per_page',
  emailNotifications: 'gobuy_email_notifications',
  marketingEmails: 'gobuy_marketing_emails',
  priceAlerts: 'gobuy_price_alerts',
  profilePublic: 'gobuy_profile_public',
  showOnlineStatus: 'gobuy_show_online_status',
  allowAnalytics: 'gobuy_allow_analytics'
}

// Save individual setting to localStorage
const saveSetting = (key, value) => {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value))
  } catch (err) {
    console.error(`Failed to save ${key}:`, err)
  }
}

// Load individual setting from localStorage
const loadSetting = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS[key])
    return saved ? JSON.parse(saved) : defaultValue
  } catch (err) {
    console.error(`Failed to load ${key}:`, err)
    return defaultValue
  }
}

// Update currency preview when currency changes
const updateCurrencyPreview = async () => {
  if (settings.value.currency === 'USD') {
    currencyPreview.value = '$99.99 USD'
    return
  }
  
  loadingPreview.value = true
  
  try {
    const { formatPriceAsync } = await import('@/utils/currency')
    const preview = await formatPriceAsync(99.99, settings.value.currency)
    currencyPreview.value = preview
  } catch (err) {
    console.error('Failed to get currency preview:', err)
    currencyPreview.value = t('preview_unavailable')
  } finally {
    loadingPreview.value = false
  }
}

// Save settings to separate localStorage keys
const saveSettings = async () => {
  saving.value = true
  saved.value = false

  try {
    // Get old values for comparison
    const { getUserCurrency, setUserCurrency, refreshExchangeRates } = await import('@/utils/currency')
    const { getUserLanguage, setUserLanguage } = await import('@/utils/language')
    
    const oldCurrency = getUserCurrency()
    const oldLanguage = getUserLanguage()
    
    const newCurrency = settings.value.currency
    const newLanguage = settings.value.language

    // Save each setting individually
    Object.keys(settings.value).forEach(key => {
      if (key === 'currency') {
        setUserCurrency(settings.value[key])
      } else if (key === 'language') {
        setUserLanguage(settings.value[key])
      } else {
        saveSetting(key, settings.value[key])
      }
    })

    console.log('All settings saved individually to localStorage')
    
    // Handle currency change
    if (oldCurrency !== newCurrency) {
      console.log(`💱 Currency changed from ${oldCurrency} to ${newCurrency}`)
      await refreshExchangeRates()
      console.log('✅ Exchange rates updated for new currency')
    }
    
    // Handle language change
    if (oldLanguage !== newLanguage) {
      console.log(`🌐 Language changed from ${oldLanguage} to ${newLanguage}`)
      // Page will refresh automatically due to language change
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      return
    }
    
    // If only currency changed, refresh for price updates
    if (oldCurrency !== newCurrency) {
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      return
    }
    
    saved.value = true
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      saved.value = false
    }, 3000)

  } catch (err) {
    console.error('Failed to save settings:', err)
    alert(t('settings_save_failed'))
  } finally {
    saving.value = false
  }
}

// Load settings from separate localStorage keys
const loadSettings = async () => {
  try {
    // Load currency and language utilities first
    const { getUserCurrency } = await import('@/utils/currency')
    const { getUserLanguage } = await import('@/utils/language')
    
    // Load each setting individually
    Object.keys(defaultSettings).forEach(key => {
      if (key === 'currency') {
        settings.value[key] = getUserCurrency()
      } else if (key === 'language') {
        settings.value[key] = getUserLanguage()
      } else {
        settings.value[key] = loadSetting(key, defaultSettings[key])
      }
    })
    
    console.log('Settings loaded from individual localStorage keys:', settings.value)
    
    // Update currency preview after loading
    await updateCurrencyPreview()
  } catch (err) {
    console.error('Failed to load settings:', err)
  }
}
// Reset to default settings
const resetSettings = () => {
  if (confirm(t('reset_confirm'))) {
    // Clear all individual localStorage keys
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    
    // Reset to defaults
    settings.value = { ...defaultSettings }
    
    alert(t('settings_reset'))
  }
}

// Load settings on mount
onMounted(async () => {
  await loadSettings()
})
</script>