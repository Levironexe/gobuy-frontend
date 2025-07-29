// frontend/src/store/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profile = ref(null)

  // Set user profile
  const setProfile = (userProfile) => {
    profile.value = userProfile
    console.log('👤 User Store: Profile set:', userProfile)
  }

  // Clear user profile (for logout)
  const clearProfile = () => {
    profile.value = null
    console.log('🔓 User Store: Profile cleared')
  }

  // Update specific profile fields
  const updateProfile = (updates) => {
    if (profile.value) {
      profile.value = { ...profile.value, ...updates }
      console.log('📝 User Store: Profile updated:', updates)
    }
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return profile.value !== null
  }

  // Get user display name
  const getDisplayName = () => {
    if (!profile.value) return 'Guest'
    return profile.value.name || profile.value.email || 'User'
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!profile.value) return 'G'
    const name = profile.value.name || profile.value.email || 'User'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return {
    profile,
    setProfile,
    clearProfile,
    updateProfile,
    isAuthenticated,
    getDisplayName,
    getInitials
  }
})