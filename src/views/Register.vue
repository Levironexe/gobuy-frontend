<!-- Register.vue -->
<template>
  <div class="register-page mt-16" v-if="isNotLoggedIn">
    <!-- Background with decorative elements -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center relative min-h-screen overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 top-[10%] -left-[5%] animate-float"></div>
      <div class="absolute w-48 h-48 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full opacity-10 top-[60%] -right-[5%] animate-float-delayed-2s"></div>
      <div class="absolute w-36 h-36 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-10 bottom-[20%] left-[10%] animate-float-delayed-4s"></div>
      
      <div class="container mx-auto py-5 px-4">
        <div class="flex justify-center">
          <div class="w-full max-w-md lg:max-w-lg">
            <!-- Register Card -->
            <div class="bg-white/95 backdrop-blur-xl border border-orange-200 rounded-3xl p-10 shadow-2xl relative z-10">
              <!-- Brand Header -->
              <div class="text-center mb-6">
                <div class="flex items-center justify-center gap-3 mb-3">
                  <span class="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">GoBuy</span>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ t('join_gobuy') }}</h1>
                <p class="text-gray-600 text-base">{{ t('register_subtitle') }}</p>
              </div>

              <!-- Success Message -->
              <div v-if="success" class="bg-green-100/80 border border-green-400/30 text-green-700 rounded-xl p-4 mb-6 flex items-start gap-3">
                <div>
                  <div class="font-semibold">{{ t('account_created_success') }}</div>
                  <div class="text-sm text-green-600">
                    <span v-if="success">
                      {{ t('check_email_verify') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Register Form -->
              <form @submit.prevent="handleRegister" class="mb-6" v-if="!success">
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

                <div class="mb-4">
                  <label class="block text-gray-700 font-semibold mb-2 text-sm">{{ t('password') }}</label>
                  <div class="relative">
                    <input 
                      v-model="password" 
                      type="password" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white text-base"
                      :placeholder="t('create_password')"
                      required 
                      minlength="6"
                    />
                  </div>
                  <div class="mt-2">
                    <small class="text-gray-500 text-xs">{{ t('password_min_length') }}</small>
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-gray-700 font-semibold mb-2 text-sm">{{ t('confirm_password') }}</label>
                  <div class="relative">
                    <input 
                      v-model="confirmPassword" 
                      type="password" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white text-base"
                      :placeholder="t('confirm_your_password')"
                      required 
                    />
                  </div>
                </div>

                <button type="submit" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none disabled:hover:shadow-none mb-4" :disabled="loading">
                  <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {{ loading ? t('creating_account') : t('create_account') }}
                </button>

                <div v-if="error" class="bg-red-100/80 border border-red-400/30 text-red-700 rounded-xl p-3 flex items-center gap-2">
                  {{ error }}
                </div>
              </form>

              <!-- Features Section -->
              <div class="bg-green-50/80 border border-green-200/30 rounded-2xl p-6 mb-6" v-if="!success">
                <div class="flex items-center gap-2 font-semibold text-green-700 mb-4 text-base">
                  {{ t('what_youll_get') }}
                </div>
                <div class="grid gap-3">
                  <div class="flex items-center gap-3 text-gray-700 text-sm">
                    <span>{{ t('secure_encrypted_shopping') }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-700 text-sm">
                    <span>{{ t('exclusive_deals') }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-700 text-sm">
                    <span>{{ t('customer_support') }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-700 text-sm">
                    <span>{{ t('fast_reliable_delivery') }}</span>
                  </div>
                </div>
              </div>

              <!-- Login Link -->
              <div class="text-center border-t border-gray-200/50 pt-6" v-if="!success">
                <p class="text-gray-600 text-sm">
                  {{ t('already_have_account') }}
                  <router-link to="/login" class="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors duration-200">{{ t('sign_in_here') }}</router-link>
                </p>
              </div>

              <!-- Privacy Notice -->
              <div class="mt-4 pt-4 border-t border-gray-200/30 text-center" v-if="!success">
                <p class="text-gray-500 text-xs leading-relaxed">{{ t('terms_privacy_notice') }}
                  <a href="#" class="text-orange-500 hover:underline font-medium">{{ t('terms_of_service') }}</a> {{ t('and') }}
                  <a href="#" class="text-orange-500 hover:underline font-medium">{{ t('privacy_policy') }}</a>
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
const { register, loading, error: apiError, getSession } = useAPI()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const success = ref(false)
const props = defineProps(['setSession'])
const isNotLoggedIn = ref(false)

onMounted(async () => {
  const storedToken = localStorage.getItem('auth_token')
  if (storedToken) {
    try {
      const response = await getSession(storedToken)
      if (!response || !response.value) {
        isNotLoggedIn.value = true
      }
      router.push('/profile')
    } catch (err) {
      console.log('No valid session found')
      localStorage.removeItem('auth_token')
      router.push('/profile')
    }
  }
  isNotLoggedIn.value = true
})

const handleRegister = async () => {
  error.value = null
  success.value = false

  // Client-side validation
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  try {
    console.log('📝 Attempting registration with backend API...')
    
    const response = await register(email.value, password.value)
    
    if (response) {
      console.log('Registration successful:', response)
      
      // Check if user was immediately signed in (has session)
      if (response.session) {
        // User is signed in immediately
        props.setSession(response.session)
        
        userStore.setProfile({
          name: response.user.name || response.user.email,
          email: response.user.email,
          picture: response.user.avatar_url
        })
        
        // Store auth token if provided
        if (response.session.access_token) {
          localStorage.setItem('auth_token', response.session.access_token)
        }
        
        success.value = true
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        // User needs to verify email first
        success.value = true
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }

  } catch (err) {
    console.error('Registration failed:', err)
    error.value = err.message || apiError.value || 'Registration failed'
  }
}
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