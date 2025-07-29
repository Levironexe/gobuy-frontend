<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white border-b border-orange-500 transition-all duration-300" :class="{ 
    'bg-black/50 backdrop-blur-lg shadow-lg': isScrolled 
  }">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Brand Logo -->
        <a href="/" class="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
          GoBuy
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <!-- Navigation Links -->
          <div class="flex items-center space-x-6">
            <a href="/" class="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200" :class="{ 'text-white hover:text-orange-400': isScrolled }">
              Home
            </a>
            <a href="/products" class="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200" :class="{ 'text-white hover:text-orange-400': isScrolled }">
              All Products
            </a>
            <a href="/sell" class="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200" :class="{ 'text-white hover:text-orange-400': isScrolled }">
              Sell
            </a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSf8BzXRS2mi1FwaMS8iz92Ytjy8EUCFPT7LBd8Vhpe-uaR1_Q/viewform" target="_blank" class="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 mr-4" :class="{ 'text-white hover:text-orange-400': isScrolled }">
              Support
            </a>
          </div>

          <!-- User Menu -->
          <div v-if="userStore.profile" class="relative group">
            <!-- Profile Button -->
            <button class="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50" :class="{ 'border-orange-400 hover:bg-white/10': isScrolled }">
              <img 
                v-if="userStore.profile.picture" 
                :src="userStore.profile.picture" 
                alt="Profile Picture"
                class="w-7 h-7 rounded-full object-cover"
              />
              <span class="font-medium text-gray-700" :class="{ 'text-white': isScrolled }">
                {{ userStore.profile.name || 'Profile' }}
              </span>
              <svg class="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-colors duration-200" :class="{ 'text-white': isScrolled }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="py-2">
                <a href="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-200">
                  My Profile
                </a>
                <a href="/cart" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-200">
                  My Orders
                </a>                
                <a href="/myproducts" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-200">
                  My Products
                </a>
                <a href="/settings" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-200">
                  Settings
                </a>
                <hr class="my-2 border-gray-200">
                <button 
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <!-- Guest User Menu -->
          <div v-else class="flex items-center gap-3">
            <a href="/login" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5">
              Log In
            </a>
            <a href="/register" class="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200" :class="{ 'text-white hover:text-orange-400': isScrolled }">
              Register
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50" :class="{ 'text-white hover:bg-white/10': isScrolled }" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-200 bg-white" :class="{ 'bg-black/80 border-gray-600': isScrolled }">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="/" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
            Home
          </a>
          <a href="/products" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
            All Products
          </a>
          <a href="/sell" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
            Sell
          </a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf8BzXRS2mi1FwaMS8iz92Ytjy8EUCFPT7LBd8Vhpe-uaR1_Q/viewform" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
            Support
          </a>
          
          <!-- Mobile User Menu -->
          <div v-if="userStore.profile" class="border-t border-gray-200 pt-4 mt-4" :class="{ 'border-gray-600': isScrolled }">
            <div class="flex items-center px-3 py-2 mb-2">
              <img 
                v-if="userStore.profile.picture" 
                :src="userStore.profile.picture" 
                alt="Profile Picture"
                class="w-8 h-8 rounded-full mr-3"
              />
              <span class="font-medium text-gray-700" :class="{ 'text-white': isScrolled }">
                {{ userStore.profile.name }}
              </span>
            </div>
            <a href="/profile" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
              My Profile
            </a>
            <a href="/orders" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
              My Orders
            </a>
            <a href="/myproducts" class="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-200">
              My Products
            </a>
            <a href="/settings" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
              Settings
            </a>
            <button 
              @click="handleLogout"
              class="w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          </div>
          
          <!-- Mobile Guest Menu -->
          <div v-else class="border-t border-gray-200 pt-4 mt-4 space-y-2" :class="{ 'border-gray-600': isScrolled }">
            <a href="/login" class="block px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-md text-center">
              Log In
            </a>
            <a href="/register" class="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md font-medium text-center transition-colors duration-200" :class="{ 'text-white hover:bg-white/10': isScrolled }">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../store/user.js';
import { useAPI } from '@/composables/useAPI';

const userStore = useUserStore();
const { getSession, logout } = useAPI();

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

onMounted(async () => {
  // Restore profile if not already loaded but session exists
  if (!userStore.profile) {
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedToken) {
      try {
        console.log('🔍 Navbar: Checking stored session...');
        
        const response = await getSession(storedToken);
        
        if (response && response.session) {
          const user = response.user;
          userStore.setProfile({
            name: user.name || user.email,
            email: user.email,
            picture: user.avatar_url
          });
          
          console.log('Navbar: Profile restored from session');
        }
      } catch (err) {
        console.log('Navbar: Invalid stored session, removing token');
        localStorage.removeItem('auth_token');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Handle logout
const handleLogout = async () => {
  try {
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedToken) {
      console.log('Navbar: Logging out user...');
      await logout(storedToken);
    }
    
    // Clear local storage and user store
    localStorage.removeItem('auth_token');
    userStore.clearProfile();
    
    console.log('Navbar: Logout successful');
    
    // Close mobile menu and redirect
    mobileMenuOpen.value = false;
    window.location.href = '/';
    
  } catch (err) {
    console.error('Navbar: Logout failed:', err);
    // Force logout even if API call fails
    localStorage.removeItem('auth_token');
    userStore.clearProfile();
    mobileMenuOpen.value = false;
    window.location.href = '/';
  }
};
</script>