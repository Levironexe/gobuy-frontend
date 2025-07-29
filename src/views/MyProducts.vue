<!-- MyProducts.vue -->
<template>
  <div class="my-products-page py-16">
    <!-- Header -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-6 mb-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          {{ t('my_products') }}
        </h1>
        <p class="text-gray-600 text-lg text-center mt-2">{{ t('manage_listings') }}</p>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <!-- Error -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 rounded-xl p-4 mb-6">
        {{ error }}
      </div>

      <!-- Skeleton Loading -->
      <div v-if="loading && products.length === 0" class="py-16">
        <div class="container mx-auto px-4">
          <!-- Header skeleton -->
          <div class="flex justify-between items-center mb-6">
            <div class="h-8 bg-gray-200 rounded-md w-32 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            </div>
            <div class="h-10 bg-gray-200 rounded-lg w-28 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            </div>
          </div>

          <!-- Products grid skeleton -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" 
                class="bg-white rounded-xl border shadow-lg p-4 animate-pulse">
              
              <!-- Image skeleton -->
              <div class="w-full h-40 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
              
              <!-- Title skeleton -->
              <div class="h-6 bg-gray-200 rounded-md w-3/4 mb-2 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
              
              <!-- Description skeleton -->
              <div class="space-y-2 mb-3">
                <div class="h-4 bg-gray-200 rounded-md w-full relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
                <div class="h-4 bg-gray-200 rounded-md w-2/3 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
              </div>
              
              <!-- Price and stock skeleton -->
              <div class="flex justify-between items-center mb-4">
                <div class="h-6 bg-gray-200 rounded-md w-20 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
                <div class="h-4 bg-gray-200 rounded-md w-16 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
              </div>

              <!-- Buttons skeleton -->
              <div class="flex gap-2">
                <div class="flex-1 h-8 bg-gray-200 rounded text-sm relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
                <div class="flex-1 h-8 bg-gray-200 rounded text-sm relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products -->
      <div v-else-if="!loading && products.length === 0 && !error" class="text-center py-16">
        <div class="text-6xl mb-4">📦</div>
        <h2 class="text-3xl font-bold text-gray-600 mb-2">{{ t('no_products_yet') }}</h2>
        <p class="text-gray-500 mb-6">{{ t('start_selling') }}</p>
        <router-link to="/sell" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 no-underline">
          {{ t('add_product') }}
        </router-link>
      </div>

      <!-- Products List -->
      <div v-else-if="products.length > 0">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">{{ products.length }} {{ t('products') }}</h2>
          <router-link to="/sell" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg no-underline">
            {{ t('add_product') }}
          </router-link>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="product in products" :key="product.id" class="bg-white rounded-xl border shadow-lg p-4">
            <img :src="product.image_url" :alt="product.title" class="w-full h-40 object-cover rounded-lg mb-4" @error="handleImageError" />
            
            <h3 class="font-bold text-lg mb-2">{{ product.title }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ truncateText(product.description, 60) }}</p>
            
            <div class="flex justify-between items-center mb-4">
              <span class="text-xl font-bold text-green-600">{{ formatPrice(product.price) }}</span>
              <span class="text-sm text-gray-500">{{ product.stock_quantity }} {{ t('in_stock') }}</span>
            </div>

            <div class="flex gap-2">
              <button @click="toggleStatus(product)" :class="[
                'flex-1 py-2 px-3 rounded text-sm font-medium',
                product.is_active ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
              ]">
                {{ product.is_active ? t('deactivate') : t('activate') }}
              </button>
              <button @click="deleteProduct(product)" class="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm font-medium">
                {{ t('delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { t } from '@/utils/language'
import { ref, onMounted } from 'vue'
import { formatPrice } from '@/utils/currency'
const products = ref([])
const loading = ref(false)
const error = ref(null)

const API_BASE = 'https://gobuy-backend-3to7.onrender.com/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

const loadProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`${API_BASE}/my-products`, {
      headers: getAuthHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to load products')
    }

    const data = await response.json()
    products.value = data.products || []

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const toggleStatus = async (product) => {
  try {
    const response = await fetch(`${API_BASE}/my-products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ is_active: !product.is_active })
    })

    if (!response.ok) throw new Error('Failed to update product')

    product.is_active = !product.is_active
    alert('Product updated!')

  } catch (err) {
    alert('Failed to update product')
  }
}

const deleteProduct = async (product) => {
  if (!confirm(`Delete "${product.title}"?`)) return

  try {
    const response = await fetch(`${API_BASE}/my-products/${product.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    if (!response.ok) throw new Error('Failed to delete product')

    products.value = products.value.filter(p => p.id !== product.id)
    alert('Product deleted!')

  } catch (err) {
    alert('Failed to delete product')
  }
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
}

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