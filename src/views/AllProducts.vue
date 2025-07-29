<!-- AllProducts.vue -->
<template>
  <div class="all-products py-16">
    <!-- Hero Header Section -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-6 mb-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              {{ t('all_products') }}
            </h1>
            <p class="text-gray-600 text-lg">{{ t('products_subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- Product Detail Modal -->
      <div v-if="selectedProduct" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" @click="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h5 class="text-2xl font-bold text-gray-800">{{ selectedProduct.title }}</h5>
            <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" @click="closeModal">
              ✕
            </button>
          </div>
          <div class="p-6">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <img :src="selectedProduct.image_url" :alt="selectedProduct.title" class="w-full rounded-xl" />
              </div>
              <div class="space-y-4">
                <div>
                  <strong class="text-gray-700">{{ t('price') }}</strong>
                  <span class="text-3xl font-bold text-green-600 ml-2">
                    {{ formatPrice(selectedProduct.price) }}
                  </span>
                </div>
                <p><strong class="text-gray-700">{{ t('category') }}</strong> {{ selectedProduct.category }}</p>
                <p><strong class="text-gray-700">{{ t('stock') }}</strong> {{ selectedProduct.stock_quantity }}</p>
                <p><strong class="text-gray-700">{{ t('status') }}</strong>
                  <span :class="selectedProduct.is_active ? 'text-green-600' : 'text-red-600'" class="font-semibold">
                    {{ selectedProduct.is_active ? t('active') : t('inactive') }}
                  </span>
                </p>
                <div>
                  <strong class="text-gray-700">{{ t('description') }}</strong>
                  <p class="mt-2 text-gray-600 leading-relaxed">{{ selectedProduct.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button type="button" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200" @click="closeModal">
              {{ t('close') }}
            </button>
            <button type="button" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5" @click="addToCart(selectedProduct)"
              :disabled="selectedProduct.stock_quantity === 0 || !selectedProduct.is_active">
              {{ t('add_to_cart') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <!-- Error Display -->
      <div v-if="error" class="bg-red-100/80 border border-red-400/30 text-red-700 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-red-500"></span>
          <span>{{ error }}</span>
        </div>
        <button @click="loadProducts" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          {{ t('try_again') }}
        </button>
      </div>

      <!-- Skeleton loading -->
      <div v-if="loading && products.length === 0" class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <div v-for="n in 6" :key="n" 
                class="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden animate-pulse">
              
              <!-- Image skeleton -->
              <div class="relative h-48 bg-gray-200 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
              
              <!-- Content skeleton -->
              <div class="p-6 space-y-4">
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded-md w-3/4 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="h-4 bg-gray-200 rounded-md w-1/2 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="h-3 bg-gray-200 rounded-md w-full relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="h-3 bg-gray-200 rounded-md w-4/5 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="h-3 bg-gray-200 rounded-md w-2/3 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <div class="h-3 bg-gray-200 rounded-md w-20 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="h-3 bg-gray-200 rounded-md w-16 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                </div>
                
                <div class="h-6 bg-gray-200 rounded-md w-24 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
                
                <div class="flex gap-2 pt-3">
                  <div class="h-10 bg-gray-200 rounded-lg flex-1 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="h-10 bg-gray-200 rounded-lg flex-1 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products State -->
      <div v-if="!loading && products.length === 0 && !error" class="text-center py-16">
        <h2 class="text-3xl font-bold text-gray-600 mb-2">{{ t('no_products_found') }}</h2>
        <p class="text-gray-500 mb-6">{{ t('no_products_message') }}</p>
        <button @click="loadProducts" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg">
          {{ t('reload_products') }}
        </button>
      </div>

      <!-- Products Section -->
      <div v-if="products.length > 0">
        <!-- Filter & Stats Card -->
        <div class="bg-white/90 backdrop-blur-md border border-orange-200/50 rounded-2xl p-6 mb-4 shadow-lg">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-semibold text-lg">
                {{ filteredProducts.length }} {{ t('products') }}
              </span>
              <span class="text-gray-600 text-sm">
                {{ t('showing') }} {{ paginatedProducts.length }} {{ t('of') }} {{ filteredProducts.length }} {{ t('products') }}
                <span v-if="totalPages > 1">({{ t('page') }} {{ currentPage }} {{ t('of') }} {{ totalPages }})</span>
              </span>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="flex items-center gap-2">
                <select v-model="selectedCategory" @change="resetPagination" class="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white text-sm">
                  <option value="">{{ t('all_categories') }}</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="showInStockOnly" @change="resetPagination" type="checkbox" class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500/20">
                  <span class="text-sm font-medium text-gray-700">{{ t('in_stock_only') }}</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="showActiveOnly" @change="resetPagination" type="checkbox" class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500/20">
                  <span class="text-sm font-medium text-gray-700">{{ t('active_only') }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search box -->
        <div class="flex items-center gap-2 pb-8 justify-end">
          <div class="relative">
            <input 
              v-model="searchedTerm" 
              @input="resetPagination"
              type="text" 
              :placeholder="t('search_products')"
              class="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white text-sm w-64"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-400">🔍</span>
            </div>
            <button 
              v-if="searchedTerm" 
              @click="searchedTerm = ''; resetPagination()"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          <div v-for="product in paginatedProducts" :key="product.id" class="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col" :class="{
            'opacity-50': product.stock_quantity === 0 || !product.is_active
          }">
            <!-- Product Image -->
            <div class="relative flex-shrink-0">
              <img :src="product.image_url" :alt="product.title" @error="handleImageError" loading="lazy"
                class="w-full h-48 object-cover" />

              <!-- Stock Badges -->
              <div class="absolute top-2 right-2">
                <span v-if="product.stock_quantity === 0" class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {{ t('out_of_stock') }}
                </span>
                <span v-else-if="product.stock_quantity < 20" class="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {{ t('low_stock') }} ({{ product.stock_quantity }})
                </span>
              </div>

              <!-- Status Badge -->
              <div v-if="!product.is_active" class="absolute top-2 left-2">
                <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {{ t('inactive') }}
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-6 flex flex-col justify-between h-full">
              <div>
                <h5 class="text-xl font-bold text-gray-800 mb-3">{{ product.title }}</h5>
                <p class="text-gray-600 text-sm mb-3 line-clamp-3">
                  {{ truncateText(product.description, 80) }}
                </p>

                <!-- Product Meta -->
                <div class="flex justify-between items-center mb-3 text-sm text-gray-500">
                  <span>{{ product.category }}</span>
                  <span>{{ product.stock_quantity }} {{ t('in_stock') }}</span>
                </div>

                <!-- Price -->
                <div class="mb-4">
                  <span class="text-2xl font-bold text-green-600">
                    {{ formatPrice(product.price) }}
                  </span>
                </div>
              </div>

              <!-- Bottom Section: Buttons + Timestamps -->
              <div class="space-y-3">
                <!-- Action Buttons -->
                <div class="flex gap-2">
                  <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-3 rounded-lg transition-colors duration-200 text-sm" @click="viewProduct(product)"
                    :disabled="!product.is_active">
                    {{ t('view') }}
                  </button>
                  <button class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5 text-sm" @click="addToCart(product)"
                    :disabled="product.stock_quantity === 0 || !product.is_active">
                    {{ product.stock_quantity === 0 ? t('unavailable') : t('add_to_cart') }}
                  </button>
                </div>

                <!-- Timestamps -->
                <div class="pt-2 border-t border-gray-100">
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>{{ formatDate(product.created_at) }}</span>
                    <span v-if="product.updated_at && product.updated_at !== product.created_at">
                      {{ t('updated') }} {{ formatDate(product.updated_at) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center mt-12 gap-2">
        <button 
          @click="goToFirstPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {{ t('first') }}
        </button>

        <button 
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {{ t('previous') }}
        </button>

        <button 
          v-for="page in pageNumbers" 
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
            currentPage === page 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border border-orange-500' 
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
          ]"
        >
          {{ page }}
        </button>

        <button 
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {{ t('next') }}
        </button>

        <button 
          @click="goToLastPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {{ t('last') }}
        </button>
      </div>

      <!-- Pagination Info -->
      <div v-if="totalPages > 1" class="text-center mt-4 text-sm text-gray-600">
        {{ t('showing') }} {{ (currentPage - 1) * itemsPerPage + 1 }} {{ t('of') }} {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} {{ t('of') }} {{ filteredProducts.length }} {{ t('products') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { formatPrice } from '@/utils/currency'
import { t } from '@/utils/language'
// Reactive data
const products = ref([])
const loading = ref(false)
const error = ref(null)
const selectedProduct = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(9) // Show 9 products per page

// Filters
const selectedCategory = ref('')
const showInStockOnly = ref(false)
const showActiveOnly = ref(true)
const searchedTerm = ref('')

// API Configuration
const API_BASE = 'https://gobuy-backend-3to7.onrender.com/api'

// Load products from backend
const loadProducts = async () => {
  loading.value = true
  error.value = null

  try {
    console.log('Fetching products from backend...')

    const response = await fetch(`${API_BASE}/posts`) // Using your existing endpoint

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    products.value = data

    console.log(`Successfully loaded ${data.length} products`)

  } catch (err) {
    console.error(' Failed to load products:', err)
    error.value = `Failed to load products: ${err.message}`
  } finally {
    loading.value = false
  }
}

// Computed properties
const categories = computed(() => {
  const uniqueCategories = [...new Set(products.value.map(p => p.category))]
  return uniqueCategories.sort()
})

const filteredProducts = computed(() => {
  let filtered = products.value

  // Filter by name (search in title and description)
  if (searchedTerm.value) {
    const searchLower = searchedTerm.value.toLowerCase().trim()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Filter by stock
  if (showInStockOnly.value) {
    filtered = filtered.filter(p => p.stock_quantity > 0)
  }

  // Filter by active status
  if (showActiveOnly.value) {
    filtered = filtered.filter(p => p.is_active)
  }

  return filtered
})

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const pageNumbers = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)
  
  // Adjust start if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

// Product actions
const viewProduct = (product) => {
  selectedProduct.value = product
  console.log('👁️ Viewing product:', product.title)
}

const closeModal = () => {
  selectedProduct.value = null
}

// Auth helper function (matching your navbar pattern)
const getAuthToken = () => {
  // Use the same token storage as your navbar
  return localStorage.getItem('auth_token')
}

const getAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

// Enhanced addToCart function that uses your backend API
const addToCart = async (product) => {
  // Validation checks
  if (product.stock_quantity === 0) {
    alert(' Sorry, this product is out of stock!')
    return
  }

  if (!product.is_active) {
    alert(' Sorry, this product is currently unavailable!')
    return
  }

  // Debug the product object
  console.log('🔍 Product object:', {
    id: product.id,
    title: product.title,
    stock_quantity: product.stock_quantity,
    is_active: product.is_active
  })

  const token = getAuthToken()
  if (!token) {
    alert('Please log in to add items to your cart!')
    return
  }

  try {
    console.log('Adding to cart:', product.title)
    
    const requestBody = {
      product_id: product.id,
      quantity: 1
    }
    
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
    
    console.log('Request details:')
    console.log('  - URL:', `${API_BASE}/cart`)
    console.log('  - Body:', requestBody)
    console.log('  - Headers:', headers)

    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    })

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

    // Always get response as text first
    const responseText = await response.text()
    console.log('📡 Raw response:', responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
        console.log(' Parsed error:', errorData)
      } catch (parseError) {
        console.error(' Failed to parse error response:', parseError)
        errorData = { error: responseText }
      }
      
      // Log the specific error details
      console.error(' Backend error details:', {
        status: response.status,
        error: errorData.error,
        details: errorData.details
      })
      
      throw new Error(errorData.error || `HTTP ${response.status}: ${responseText}`)
    }

    const data = JSON.parse(responseText)
    console.log('Success response:', data)
    alert(`${data.message}`)

  } catch (err) {
    console.error('Complete error details:', err)
    alert(`Failed to add item to cart: ${err.message}`)
  }
}

// Function to get cart count for header display
const getCartCount = async () => {
  const token = getAuthToken()
  if (!token) return 0

  try {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })

    if (!response.ok) return 0

    const cartItems = await response.json()
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)

  } catch (err) {
    console.error('Failed to get cart count:', err)
    return 0
  }
}



// Pagination functions
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll to top of products section
    document.querySelector('.all-products')?.scrollIntoView({ behavior: 'smooth' }) // I'm using this to scroll everything to the top whenever the user changes page
  }
}

const goToFirstPage = () => {
  goToPage(1)
}

const goToLastPage = () => {
  goToPage(totalPages.value)
}

const goToPreviousPage = () => {
  goToPage(currentPage.value - 1)
}

const goToNextPage = () => {
  goToPage(currentPage.value + 1)
}

// Reset pagination when filters change
const resetPagination = () => {
  currentPage.value = 1
}

// Lifecycle
onMounted(() => {
  loadProducts()
})
</script>
<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
</style>