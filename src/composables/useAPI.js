import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://gobuy-backend-3to7.onrender.com/api'

export function useAPI() {
  const loading = ref(false)
  const error = ref(null)

  // Helper function for making API calls
  const apiCall = async (url, options = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || data.details || `HTTP ${response.status}`)
      }
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get all products
  const getProducts = async () => {
    return await apiCall('/posts')
  }

  // Add products to Supabase
  const createProduct = async (productData, token) => {
    console.log('🚀 Frontend sending:')
    console.log('📦 Product data:', productData)
    console.log('🔑 Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN')
    console.log('🌐 URL:', `${API_BASE}/posts`)
    return await apiCall('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
  }

  // Register new user
  const register = async (email, password) => {
    return await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  // Login with email and password
  const login = async (email, password) => {
    return await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  // Logout user
  const logout = async (token) => {
    return await apiCall('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Magic link login
  const sendMagicLink = async (email) => {
    return await apiCall('/auth/magic-link', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  // Google OAuth login
  const loginWithGoogle = async () => {
    return await apiCall('/auth/google', {
      method: 'POST'
    })
  }

  // Get current session
  const getSession = async (token) => {
    return await apiCall('/auth/session', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Get user profile (enhanced version)
  const getProfile = async (token) => {
    return await apiCall('/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Update user profile
  const updateProfile = async (token, profileData) => {
    return await apiCall('/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })
  }

  // Upload avatar image (if you want to add file upload later)
  const uploadAvatar = async (token, file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    
    return await apiCall('/auth/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData
      },
      body: formData
    })
  }

  return {
    loading,
    error,
    // Products
    getProducts,
    createProduct,
    // Auth
    register,
    login,
    logout,
    sendMagicLink,
    loginWithGoogle,
    getSession,
    // Profile
    getProfile,
    updateProfile,
    uploadAvatar
  }
}
