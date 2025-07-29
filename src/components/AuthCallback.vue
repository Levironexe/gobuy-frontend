<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-5 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 top-[10%] -left-[5%] animate-float"></div>
    <div class="absolute w-36 h-36 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full opacity-10 top-[60%] -right-[5%] animate-float-delayed-2s"></div>
    <div class="absolute w-24 h-24 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-10 bottom-[20%] left-[10%] animate-float-delayed-4s"></div>

    <!-- Main card container -->
    <div class="bg-white/90 backdrop-blur-lg rounded-2xl p-10 text-center shadow-xl border border-orange-200/50 max-w-lg w-full relative z-10 hover:shadow-2xl hover:border-orange-300/50 transition-all duration-300">
      
      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <div class="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
        <h2 class="text-2xl font-bold text-gray-800">Processing Authentication...</h2>
        <p class="text-gray-600 leading-relaxed">
          Please wait while we complete your sign-in to 
          <span class="font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">GoBuy</span>.
        </p>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">
          Welcome to 
          <span class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">GoBuy</span>!
        </h2>
        <p class="text-gray-600 leading-relaxed">
          Authentication successful. Redirecting you to the dashboard...
        </p>
        <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-progress"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Authentication Failed</h2>
        <p class="text-gray-600 leading-relaxed">{{ error }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="retryLogin" 
            class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            Try Again
          </button>
          <router-link 
            to="/login" 
            class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-1 hover:shadow-lg no-underline"
          >
            Back to Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { supabase } from '@/lib/supabase'
const props = defineProps(['setSession'])

const router = useRouter()
const userStore = useUserStore()

const loading = ref(true)
const success = ref(false)
const error = ref(null)

// Replace the entire processOAuthCallback function
const processMagicLinkCallback = async () => {
  try {
    console.log('AuthCallback: Processing magic link callback...')
    
    // For magic links, Supabase automatically handles the tokens
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      throw new Error(error.message)
    }
    
    if (!session) {
      throw new Error('No valid session found after magic link authentication')
    }
    
    console.log('AuthCallback: Magic link session established')
    
    // Store tokens for your backend calls
    localStorage.setItem('auth_token', session.access_token)
    if (session.refresh_token) {
      localStorage.setItem('refresh_token', session.refresh_token)
    }
    
    // Set session in parent component
    if (props.setSession) {
      props.setSession(session)
    }
    
    // Update user store
    userStore.setProfile({
      name: session.user.user_metadata?.name || session.user.email,
      email: session.user.email,
      picture: session.user.user_metadata?.avatar_url
    })
    
    // Show success state
    success.value = true
    loading.value = false
    
    // Redirect after delay
    setTimeout(() => {
      router.push('/')
    }, 2000)
    
  } catch (err) {
    console.error('AuthCallback: Magic link authentication failed:', err)
    error.value = err.message
    loading.value = false
    
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
  }
}

// Retry login function
const retryLogin = () => {
  // Clear error state and redirect to login
  error.value = null
  router.push('/login')
}

// Process the callback on component mount
onMounted(() => {
  processMagicLinkCallback()
})
</script>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
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

.animate-progress {
  animation: progress 2s ease-in-out;
}
</style>