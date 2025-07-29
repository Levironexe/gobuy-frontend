<!-- LogIn.vue -->
<template>
  <div v-if="isNotLoggedIn" class="login-page mt-16">
    <!-- Background with decorative elements -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center relative min-h-screen overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 top-[10%] -left-[5%] animate-float"></div>
      <div class="absolute w-48 h-48 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full opacity-10 top-[60%] -right-[5%] animate-float-delayed-2s"></div>
      <div class="absolute w-36 h-36 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-10 bottom-[20%] left-[10%] animate-float-delayed-4s"></div>
      
      <div class="container mx-auto py-5 px-4">
        <div class="flex justify-center">
          <div class="w-full max-w-md lg:max-w-lg">
            <!-- Login Card -->
            <div class="bg-white/95 backdrop-blur-xl border border-orange-200 rounded-3xl p-10 shadow-2xl relative z-10">
              <!-- Brand Header -->
              <div class="text-center mb-6">
                <div class="flex items-center justify-center gap-3 mb-3">
                  <span class="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">GoBuy</span>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ t('welcome_back') }}</h1>
                <p class="text-gray-600 text-base">{{ t('login_subtitle') }}</p>
              </div>

              <!-- Regular Login Form -->
              <form @submit.prevent="handleNormalLogin" class="mb-6">
                <div class="mb-4">
                  <label class="block text-gray-700 font-semibold mb-2 text-sm">{{ t('email_address') }}</label>
                  <div class="relative">
                    <input 
                      v-model="email" 
                      type="email" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white text-base"
                      :placeholder="t('enter_your_email')"
                      required 
                    />
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-gray-700 font-semibold mb-2 text-sm">{{ t('password') }}</label>
                  <div class="relative">
                    <input 
                      v-model="password" 
                      type="password" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white text-base"
                      :placeholder="t('enter_your_password')"
                      required 
                      minlength="6"
                    />
                  </div>
                </div>

                <button type="submit" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none disabled:hover:shadow-none mb-4" :disabled="loading">
                  <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {{ loading ? t('signing_in') : t('sign_in') }}
                </button>

                <div v-if="error" class="bg-red-100/80 border border-red-400/30 text-red-700 rounded-xl p-3 flex items-center gap-2">
                  <span class="text-red-500">⚠️</span>
                  {{ error }}
                </div>
              </form>

              <!-- Divider -->
              <div class="relative text-center my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative bg-white px-4">
                  <span class="text-gray-500 text-sm">{{ t('or_continue_with') }}</span>
                </div>
              </div>

              <!-- Social Login -->
              <button @click="handleLoginWithGoogle" class="w-full bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:transform hover:-translate-y-0.5 hover:shadow-md disabled:hover:transform-none disabled:hover:shadow-none mb-6" :disabled="googleLoading">
                <span v-if="googleLoading" class="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                <img v-else src="../../public/google-icon.png" class="h-8"/>
                {{ googleLoading ? t('connecting') : t('continue_with_google') }}
              </button>

              <!-- Magic Link Section -->
              <div class="bg-green-50/80 border border-green-200/50 rounded-2xl p-6 mb-6">
                <div class="flex justify-center items-center gap-2 mb-3">
                  <img src="../../public/supabase-logo.png" class="h-8"/>
                  <span class="font-semibold text-green-600 text-base">{{ t('magic_link_login') }}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">{{ t('magic_link_desc') }}</p>
                
                <form @submit.prevent="handleMagicLink" class="space-y-4">
                  <div>
                    <div class="relative">
                      <input 
                        v-model="email2" 
                        type="email" 
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 bg-white text-base"
                        :placeholder="t('enter_email_magic_link')"
                        required 
                      />
                    </div>
                  </div>
                  
                  <button type="submit" class="w-full bg-green-100/80 text-green-600 border-2 border-green-300/30 hover:bg-green-200/80 hover:border-green-400/50 py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 disabled:hover:transform-none font-semibold" :disabled="magicLinkLoading">
                    <span v-if="magicLinkLoading" class="inline-block w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></span>
                    {{ magicLinkLoading ? t('sending') : t('send_magic_link') }}
                  </button>
                </form>
              </div>

              <!-- Register Link -->
              <div class="text-center border-t border-gray-200/50 pt-6">
                <p class="text-gray-600 text-sm">
                  {{ t('dont_have_account') }}
                  <router-link to="/register" class="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors duration-200">{{ t('create_one_here') }}</router-link>
                </p>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useAPI } from '@/composables/useAPI'

const router = useRouter()
const userStore = useUserStore()
const { login, sendMagicLink, loginWithGoogle, getSession, loading, error: apiError } = useAPI()

const email = ref('')
const email2 = ref('')
const password = ref('')
const error = ref(null)
const magicLinkLoading = ref(false)
const googleLoading = ref(false)
const props = defineProps(['setSession'])
const isNotLoggedIn = ref(false)

// Function to log in with email and password
const handleNormalLogin = async () => {
  error.value = null
  
  try {
    console.log('Attempting login with backend API...')
    
    const response = await login(email.value, password.value)
    
    if (response && response.session) {
      // Set session in parent component
      props.setSession(response.session)
      
      // Update user store
      userStore.setProfile({
        id: response.user.id,
        name: response.user.name || response.user.email,
        email: response.user.email,
        picture: response.user.avatar_url
      })
      
      console.log('Login successful, redirecting...')
      router.push('/')
    }
  } catch (err) {
    console.error('Login failed:', err)
    error.value = err.message || apiError.value
  }
}

// Magic link login
const handleMagicLink = async () => {
  error.value = null
  magicLinkLoading.value = true
  
  try {
    console.log('Sending magic link via backend API...')
    
    const response = await sendMagicLink(email2.value)
    
    alert('Check your email for the login link!')
    console.log('Magic link sent successfully')
    
  } catch (err) {
    console.error('Magic link failed:', err)
    alert(err.message || 'Failed to send magic link')
  } finally {
    magicLinkLoading.value = false
  }
}

// Google Sign-In through backend
const handleLoginWithGoogle = async () => {
  error.value = null
  googleLoading.value = true
  
  try {
    console.log('Initiating Google login via backend API...')
    
    const response = await loginWithGoogle()
    
    // Handle redirect URL from backend
    if (response.redirectUrl) {
      window.location.href = response.redirectUrl
    }
    
  } catch (err) {
    console.error('Google login failed:', err)
    alert(err.message || 'Failed to login with Google')
  } finally {
    googleLoading.value = false
  }
}

// Check for existing session on mount
onMounted(async () => {
  // Check if there's a stored session token
  const storedToken = localStorage.getItem('auth_token')
  
  if (storedToken) {
    try {
      console.log('Checking existing session...')
      
      const response = await getSession(storedToken)
      
      if (response && response.session) {
        props.setSession(response.session)
        userStore.setProfile({
          name: response.user.name || response.user.email,
          email: response.user.email,
          picture: response.user.avatar_url
        })
        isNotLoggedIn.value = false
        router.push('/profile')
      }
    } catch (err) {
      console.log('No valid session found')
      localStorage.removeItem('auth_token')
    }
  }
  isNotLoggedIn.value = true

  // Handle OAuth callbacks (Google, etc.)
  const urlParams = new URLSearchParams(window.location.search)
  const authToken = urlParams.get('token')
  const authError = urlParams.get('error')
  
  if (authError) {
    error.value = authError
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname)
  }
  
  if (authToken) {
    try {
      // Store the token
      localStorage.setItem('auth_token', authToken)
      
      // Get user profile
      const response = await getSession(authToken)
      
      if (response && response.session) {
        props.setSession(response.session)
        userStore.setProfile({
          name: response.user.name || response.user.email,
          email: response.user.email,
          picture: response.user.avatar_url
        })
        
        // Clean up URL and redirect
        window.history.replaceState({}, document.title, window.location.pathname)
        router.push('/')
      }
    } catch (err) {
      console.error('OAuth callback failed:', err)
      error.value = 'Authentication failed'
      localStorage.removeItem('auth_token')
    }
  }
})
</script>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed-2s {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-delayed-4s {
  animation: float 6s ease-in-out infinite;
  animation-delay: 4s;
}
</style>