<!-- Order.vue -->
<template>
  <div class="cart-page py-16">
    <!-- Hero Header Section -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-6 mb-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              {{ t('your_cart') }}
            </h1>
            <p class="text-gray-600 text-lg">{{ t('cart_subtitle') }}</p>
          </div>
          <div class="hidden md:block">
            <button @click="loadCart" :disabled="loading" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2 hover:transform hover:-translate-y-1 hover:shadow-lg disabled:hover:transform-none">
              {{ loading ? t('loading') : t('refresh_cart') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <!-- Error Display -->
      <div v-if="error" class="bg-red-100/80 border border-red-400/30 text-red-700 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-red-500">❌</span>
          <span>{{ error }}</span>
        </div>
        <button @click="loadCart" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          {{ t('try_again') }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading && cartItems.length === 0" class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items Skeleton (Left Side) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 animate-pulse">
            <div class="flex items-center justify-between">
              <div class="h-6 bg-gray-200 rounded-md w-32 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
              <div class="h-8 bg-gray-200 rounded-full w-20 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
            </div>
          </div>

          <!-- Individual Cart Item Skeletons -->
          <div v-for="n in 3" :key="n" class="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden animate-pulse">
            <div class="p-6">
              <div class="flex gap-4">
                <!-- Product Image Skeleton -->
                <div class="flex-shrink-0">
                  <div class="w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                </div>

                <!-- Product Info Skeleton -->
                <div class="flex-1 min-w-0 space-y-3">
                  <div class="h-5 bg-gray-200 rounded-md w-3/4 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  
                  <div class="space-y-2">
                    <div class="h-3 bg-gray-200 rounded-md w-full relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-md w-4/5 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <div class="h-3 bg-gray-200 rounded-md w-16 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-md w-20 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="h-6 bg-gray-200 rounded-md w-20 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-md w-24 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quantity Controls Skeleton -->
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center gap-3">
                  <div class="h-4 bg-gray-200 rounded-md w-16 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    <div class="w-8 h-6 bg-gray-200 rounded-md relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                    <div class="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    </div>
                  </div>
                </div>

                <!-- Actions Skeleton -->
                <div class="flex items-center gap-2">
                  <div class="h-5 bg-gray-200 rounded-md w-20 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                  <div class="h-8 bg-gray-200 rounded-lg w-20 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Skeleton (Right Side) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 animate-pulse">
            <!-- Title -->
            <div class="h-6 bg-gray-200 rounded-md w-32 mb-6 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            </div>
            
            <!-- Summary Lines -->
            <div class="space-y-4 mb-6">
              <div v-for="n in 4" :key="n" class="flex justify-between">
                <div class="h-4 bg-gray-200 rounded-md w-20 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
                <div class="h-4 bg-gray-200 rounded-md w-16 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
              </div>
            </div>

            <!-- Buttons Skeleton -->
            <div class="space-y-3">
              <div class="h-12 bg-gray-200 rounded-xl w-full relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
              <div class="h-12 bg-gray-200 rounded-xl w-full relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
            </div>

            <!-- Promo Code Skeleton -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <div class="flex gap-2">
                <div class="flex-1 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
                <div class="h-10 bg-gray-200 rounded-lg w-16 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-if="!loading && cartItems.length === 0 && !error" class="text-center py-16">
        <h2 class="text-3xl font-bold text-gray-600 mb-2">{{ t('empty_cart') }}</h2>
        <p class="text-gray-500 mb-6">{{ t('empty_cart_message') }}</p>
        <router-link to="/products" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg no-underline">
          {{ t('browse_products') }}
        </router-link>
      </div>

      <!-- Cart Items -->
      <div v-if="cartItems.length > 0" class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items List (Left Side) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Cart Summary Card -->
          <div class="bg-white/90 backdrop-blur-md border border-orange-200/50 rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-bold text-gray-800">{{ t('cart_items') }}</h3>
              <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-semibold">
                {{ cartItems.length }} {{ cartItems.length === 1 ? t('item') : t('items') }}
              </span>
            </div>
          </div>

          <!-- Individual Cart Items -->
          <div v-for="item in cartItems" :key="item.id" class="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div class="p-6">
              <div class="flex gap-4">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <img :src="item.products.image_url" :alt="item.products.title" 
                    class="w-24 h-24 object-cover rounded-lg" 
                    @error="handleImageError" />
                </div>

                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-xl font-bold text-gray-800 mb-2">{{ item.products.title }}</h4>
                  <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ item.products.description }}</p>
                  <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{{ item.products.category }}</span>
                    <span>{{ item.products.stock_quantity }} {{ t('available') }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-green-600">
                      {{ formatPrice(item.products.price) }}
                    </span>
                    <span class="text-sm text-gray-500">
                      {{ t('added') }} {{ formatDate(item.added_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center gap-3">
                  <span class="text-gray-700 font-medium">{{ t('quantity') }}</span>
                  <div class="flex items-center gap-2">
                    <button @click="updateQuantity(item, item.quantity - 1)" 
                      :disabled="item.quantity <= 1 || updating.has(item.id)"
                      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-full transition-colors duration-200">
                      −
                    </button>
                    <span class="w-12 text-center font-semibold text-lg">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item, item.quantity + 1)" 
                      :disabled="item.quantity >= item.products.stock_quantity || updating.has(item.id)"
                      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-full transition-colors duration-200">
                      +
                    </button>
                  </div>
                </div>

                <!-- Item Actions -->
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold text-gray-800">
                    {{ t('total') }} {{ formatPrice(item.products.price * item.quantity) }}
                  </span>
                  <button @click="removeFromCart(item)" 
                    :disabled="updating.has(item.id)"
                    class="ml-4 bg-red-100 hover:bg-red-200 disabled:bg-gray-100 text-red-600 disabled:text-gray-400 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    🗑️ {{ t('remove') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary (Right Side) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">{{ t('order_summary') }}</h3>
            
            <!-- Summary Details -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('subtotal') }} ({{ totalItems }} {{ t('items') }})</span>
                <span class="font-semibold">${{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('shipping') }}</span>
                <span class="font-semibold text-green-600">{{ t('free') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('tax') }}</span>
                <span class="font-semibold">${{ formatPrice(tax) }}</span>
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between">
                  <span class="text-xl font-bold text-gray-800">{{ t('total') }}</span>
                  <span class="text-2xl font-bold text-green-600">${{ formatPrice(total) }}</span>
                </div>
              </div>
            </div>

            <!-- Checkout Actions -->
            <div class="space-y-3">
              <button @click="proceedToCheckout" 
                :disabled="cartItems.length === 0 || hasOutOfStockItems"
                class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg disabled:hover:transform-none">
                {{ hasOutOfStockItems ? t('items_unavailable') : t('proceed_to_checkout') }}
              </button>
              
              <router-link to="/products" 
                class="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200 no-underline">
                {{ t('continue_shopping') }}
              </router-link>
            </div>

            <!-- Promo Code Section -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <div class="flex gap-2">
                <input v-model="promoCode" 
                  type="text" 
                  :placeholder="t('promo_code')"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-sm" />
                <button @click="applyPromoCode" 
                  :disabled="!promoCode.trim()"
                  class="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                  {{ t('apply') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { t } from '@/utils/language'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {formatPrice} from '@/utils/currency'
// Router
const router = useRouter()

// Reactive data
const cartItems = ref([])
const loading = ref(false)
const error = ref(null)
const updating = ref(new Set()) // Track which items are being updated
const promoCode = ref('')

// API Configuration
const API_BASE = 'https://gobuy-backend-3to7.onrender.com/api'

// ============================================
// Auth helpers
// ============================================
const getAuthToken = () => {
  return localStorage.getItem('auth_token')
}

const getAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

// ============================================
// Load cart from backend
// ============================================
const loadCart = async () => {
  const token = getAuthToken()
  if (!token) {
    error.value = 'Please log in to view your cart'
    return
  }

  loading.value = true
  error.value = null

  try {
    console.log('🔍 Fetching cart from backend...')

    const response = await fetch(`${API_BASE}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Please log in to view your cart')
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    cartItems.value = data

    console.log(`✅ Successfully loaded ${data.length} cart items`)

  } catch (err) {
    console.error('❌ Failed to load cart:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// ============================================
// Cart operations
// ============================================
const updateQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(item)
    return
  }

  if (newQuantity > item.products.stock_quantity) {
    alert(`⚠️ Cannot add more than ${item.products.stock_quantity} items`)
    return
  }

  updating.value.add(item.id)

  try {
    console.log(`🔄 Updating quantity for ${item.products.title} to ${newQuantity}`)

    const response = await fetch(`${API_BASE}/cart/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ quantity: newQuantity })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update quantity')
    }

    // Update local state
    item.quantity = newQuantity
    console.log('✅ Quantity updated successfully')

  } catch (err) {
    console.error('❌ Failed to update quantity:', err)
    alert(`❌ Failed to update quantity: ${err.message}`)
  } finally {
    updating.value.delete(item.id)
  }
}

const removeFromCart = async (item) => {
  if (!confirm(`Remove "${item.products.title}" from your cart?`)) {
    return
  }

  updating.value.add(item.id)

  try {
    console.log(`🗑️ Removing ${item.products.title} from cart`)

    const response = await fetch(`${API_BASE}/cart/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to remove item')
    }

    // Remove from local state
    cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== item.id)
    console.log('✅ Item removed successfully')

  } catch (err) {
    console.error('❌ Failed to remove item:', err)
    alert(`❌ Failed to remove item: ${err.message}`)
  } finally {
    updating.value.delete(item.id)
  }
}

const proceedToCheckout = () => {
  if (hasOutOfStockItems.value) {
    alert('⚠️ Please remove out-of-stock items before proceeding to checkout')
    return
  }

  // Navigate to checkout page (you'll need to create this)
  router.push('/checkout')
}

const applyPromoCode = () => {
  // Implement promo code logic here
  alert('🎟️ Promo code functionality coming soon!')
}

// ============================================
// Computed properties
// ============================================
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.products.price * item.quantity)
  }, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.08 // 8% tax
})

const total = computed(() => {
  return subtotal.value + tax.value
})

const hasOutOfStockItems = computed(() => {
  return cartItems.value.some(item => 
    item.quantity > item.products.stock_quantity || 
    !item.products.is_active
  )
})

// ============================================
// Utility functions
// ============================================

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/100x100?text=Product'
}

// ============================================
// Lifecycle
// ============================================
onMounted(() => {
  loadCart()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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