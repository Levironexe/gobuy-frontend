<!-- Profile.vue -->
<template>
  <div v-if="session && session.user" class="text-black w-full min-h-screen bg-gray-50 mt-16 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ t('my_profile') }}</h2>
        <p class="text-gray-600">{{ t('profile_subtitle') }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !profileLoaded" class="flex flex-col items-center justify-center py-16">
        <div class="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p class="text-gray-600">{{ t('loading_profile') }}</p>
      </div>

      <!-- Profile Form -->
      <form v-else class="bg-white rounded-2xl shadow-lg p-8 mb-8" @submit.prevent="updateProfile">
        <div class="mb-6">
          <label for="email" class="block text-gray-700 font-semibold mb-2">{{ t('email_address') }}</label>
          <input 
            id="email" 
            type="email" 
            :value="session.user.email" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
            disabled 
          />
          <small class="text-gray-500 text-sm mt-1 block">{{ t('email_cannot_change') }}</small>
        </div>

        <div class="mb-6">
          <label for="username" class="block text-gray-700 font-semibold mb-2">{{ t('display_name') }}</label>  
          <input 
            id="username" 
            type="text" 
            v-model="username" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
            :placeholder="t('enter_display_name')"
          />
        </div>

        <div class="mb-6">
          <label for="website" class="block text-gray-700 font-semibold mb-2">{{ t('website') }}</label>
          <input 
            id="website" 
            type="url" 
            v-model="website" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div class="mb-6">
          <label for="avatar_url" class="block text-gray-700 font-semibold mb-2">{{ t('avatar_url') }}</label>
          <input 
            id="avatar_url" 
            type="url" 
            v-model="avatar_url" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
            placeholder="https://example.com/avatar.jpg"
          />
          <div v-if="avatar_url" class="flex justify-center mt-4">
            <img :src="avatar_url" :alt="t('avatar_preview')" class="w-20 h-20 rounded-full object-cover border-3 border-orange-500" />
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="bg-red-100/80 border border-red-400/30 text-red-700 rounded-xl p-4 mb-6 flex items-center gap-2">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100/80 border border-green-400/30 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-2">
          {{ successMessage }}
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none disabled:hover:shadow-none mx-auto"
            :disabled="loading"
          >
            <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ loading ? t('updating') : t('update_profile') }}
          </button>
        </div>
      </form>

      <!-- Profile Statistics -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">{{ t('account_information') }}</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-gray-50 rounded-xl p-4 text-center">
            <div class="text-gray-600 font-medium mb-1">{{ t('member_since') }}</div>
            <div class="text-gray-800 font-semibold">{{ formatDate(session.user.created_at) }}</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 text-center">
            <div class="text-gray-600 font-medium mb-1">{{ t('last_sign_in') }}</div>
            <div class="text-gray-800 font-semibold">{{ formatDate(session.user.last_sign_in_at) }}</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 text-center">
            <div class="text-gray-600 font-medium mb-1">{{ t('user_id') }}</div>
            <div class="text-gray-800 font-semibold font-mono text-sm">{{ session.user.id.slice(0, 8) }}...</div>
          </div>
        </div>
      </div>

      <!-- Logout Section -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-yellow-800 mb-2">{{ t('sign_out') }}</h3>
          <p class="text-yellow-700 mb-6">{{ t('sign_out_desc') }}</p>
          <button 
            class="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none disabled:hover:shadow-none mx-auto"
            @click="logoutAndRedirect" 
            :disabled="loading"
          >
            <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ loading ? t('signing_out') : t('sign_out') }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Not Authenticated State -->
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">🔒 {{ t('authentication_required') }}</h2>
      <p class="text-gray-600 mb-8">{{ t('please_sign_in_profile') }}</p>
      <a href="/login" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg">
        {{ t('sign_in') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { t } from '@/utils/language'
import { useUserStore } from '../store/user.js'
import { useRouter } from 'vue-router'
import { useAPI } from '@/composables/useAPI'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const { getProfile: getProfileAPI, updateProfile: updateProfileAPI, logout, loading: apiLoading, error: apiError } = useAPI()

const loading = ref(false)
const profileLoaded = ref(false)
const username = ref('')
const website = ref('')
const avatar_url = ref('')
const error = ref(null)
const successMessage = ref('')

const userStore = useUserStore()
const router = useRouter()

// Clear messages after timeout
const clearMessages = () => {
  setTimeout(() => {
    error.value = null
    successMessage.value = ''
  }, 5000)
}

// Logout and redirect
const logoutAndRedirect = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('Profile: Logging out user...')
    
    const storedToken = localStorage.getItem('auth_token')
    
    if (storedToken) {
      await logout(storedToken)
    }
    
    // Clear local storage and user store
    localStorage.removeItem('auth_token')
    localStorage.removeItem('profile')
    userStore.clearProfile()
    
    console.log('Profile: Logout successful')
    
    // Redirect to home page
    router.push('/')
    
  } catch (err) {
    console.error('Profile: Logout failed:', err)
    error.value = err.message || 'Logout failed'
    
    // Force logout even if API call fails
    localStorage.removeItem('auth_token')
    localStorage.removeItem('profile')
    userStore.clearProfile()
    router.push('/')
  } finally {
    loading.value = false
  }
}

// Get user profile from backend
const getProfile = async () => {
  try {
    loading.value = true
    error.value = null
    
    if (!session.value || !session.value.user) {
      loading.value = false
      return
    }
    
    console.log('Profile: Fetching user profile...')
    
    const storedToken = localStorage.getItem('auth_token')
    
    if (!storedToken) {
      throw new Error('No authentication token found')
    }
    
    const response = await getProfileAPI(storedToken)
    
    if (response && response.user) {
      // Populate form fields
      username.value = response.user.name || response.user.username || ''
      website.value = response.user.website || ''
      avatar_url.value = response.user.avatar_url || ''
      
      console.log('Profile: Profile loaded successfully')
    }
    
  } catch (err) {
    console.error('Profile: Failed to load profile:', err)
    error.value = err.message || apiError.value || 'Failed to load profile'
    clearMessages()
  } finally {
    loading.value = false
    profileLoaded.value = true
  }
}

// Update user profile
const updateProfile = async () => {
  try {
    loading.value = true
    error.value = null
    successMessage.value = ''
    
    if (!session.value || !session.value.user) {
      throw new Error('No active session')
    }
    
    console.log('Profile: Updating user profile...')
    
    const storedToken = localStorage.getItem('auth_token')
    
    if (!storedToken) {
      throw new Error('No authentication token found')
    }
    
    const updates = {
      username: username.value.trim(),
      name: username.value.trim(), // Backend might expect 'name' field
      website: website.value.trim(),
      avatar_url: avatar_url.value.trim()
    }
    
    const response = await updateProfileAPI(storedToken, updates)
    
    if (response) {
      // Update user store with new profile data
      userStore.updateProfile({
        name: updates.username || updates.name,
        picture: updates.avatar_url
      })
      
      successMessage.value = 'Profile updated successfully!'
      console.log('Profile: Profile updated successfully')
      clearMessages()
    }
    
  } catch (err) {
    console.error('Profile: Failed to update profile:', err)
    error.value = err.message || apiError.value || 'Failed to update profile'
    clearMessages()
  } finally {
    loading.value = false
  }
}

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load profile on component mount
onMounted(() => {
  getProfile()
})
</script>