<script setup>
import Navbar from './components/Navbar.vue'
import { onMounted, ref } from 'vue'
import { useAPI } from '@/composables/useAPI'
import { useUserStore } from '@/store/user'
import { initializeCurrency } from '@/utils/currency'
import { initializeLanguage } from './utils/language'
const { getSession } = useAPI()
const userStore = useUserStore()
const session = ref(null)

// Session management function
const setSession = (newSession) => {
  session.value = newSession
  
  if (newSession) {
    // Store the access token for API calls
    if (newSession.access_token) {
      localStorage.setItem('auth_token', newSession.access_token)
    }
    
    // Update user store if session has user data
    if (newSession.user) {
      userStore.setProfile({
        name: newSession.user.user_metadata?.full_name || newSession.user.email,
        email: newSession.user.email,
        picture: newSession.user.user_metadata?.avatar_url
      })
    }
    
    console.log('App: Session set successfully')
  } else {
    // Clear session data
    localStorage.removeItem('auth_token')
    userStore.clearProfile()
    console.log('App: Session cleared')
  }
}

// Check for existing session on app startup
onMounted(async () => {
  console.log('App: Starting up, checking for existing session...')
  
  // Initialize the currency changer
  await initializeCurrency()
  
  // Initialize the language changer
  await initializeLanguage()

  // Check if there's a stored auth token
  const storedToken = localStorage.getItem('auth_token')
  
  if (storedToken) {
    try {
      console.log('App: Found stored token, validating with backend...')
      
      const response = await getSession(storedToken)
      
      if (response && response.session) {
        // Set the session
        setSession(response.session)
        console.log('App: Valid session restored')
      } else {
        // Invalid token, clear it
        localStorage.removeItem('auth_token')
        console.log('App: Invalid token removed')
      }
    } catch (err) {
      console.error('App: Session validation failed:', err)
      localStorage.removeItem('auth_token')
    }
  } else {
    console.log('App: No stored token found, user not authenticated')
  }
  
  // Handle OAuth callback (for Google login, etc.)
  const urlParams = new URLSearchParams(window.location.search)
  const authToken = urlParams.get('token')
  const authError = urlParams.get('error')
  
  if (authError) {
    console.error('App: OAuth error:', authError)
  }
  
  if (authToken) {
    try {
      console.log('🔍 App: OAuth callback token received, validating...')
      
      // Store the new token
      localStorage.setItem('auth_token', authToken)
      
      // Get the session data
      const response = await getSession(authToken)
      
      if (response && response.session) {
        setSession(response.session)
        console.log('App: OAuth login successful')
        
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname)
        
        // Redirect to dashboard or home
        window.location.href = '/'
      }
    } catch (err) {
      console.error('App: OAuth callback failed:', err)
      localStorage.removeItem('auth_token')
    }
  }
})

// Global auth state change handler
const handleAuthStateChange = (newSession) => {
  setSession(newSession)
}
</script>

<!-- App.vue -->
<template>
  <div id="app">
    <Navbar />
    <router-view 
      :session="session" 
      :setSession="setSession"
      @auth-state-change="handleAuthStateChange"
    />
  </div>
</template>

<style src="@/assets/main.css"></style>