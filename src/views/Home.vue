  <!-- Home.vue -->
<template>
  <div class="home w-full">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-5 relative overflow-hidden">
      <div class="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center relative">
        <!-- Background decorative elements -->
        <div class="absolute w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 top-[10%] -left-[5%] animate-float"></div>
        <div class="absolute w-48 h-48 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full opacity-10 top-[60%] -right-[5%] animate-float-delayed-2s"></div>
        <div class="absolute w-36 h-36 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-10 bottom-[20%] left-[10%] animate-float-delayed-4s"></div>
        
        <!-- Trust badge -->
        <div class="bg-orange-100/60 border border-orange-300/30 rounded-full px-5 py-2 mb-6 backdrop-blur-md">
          <span class="text-orange-800 font-semibold text-sm flex items-center gap-2">
            <span class="text-base">⚡</span>
            {{ t('your_trusted_marketplace') }}
          </span>
        </div>
        
        <!-- Main heading -->
        <h1 class="text-center mb-3 text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight">
          {{ t('welcome_to_gobuy') }}
        </h1>
        
        <!-- Subtitle -->
        <p class="text-center text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
          {{ t('home_subtitle') }}
        </p>
        
        <!-- Action buttons -->
        <div class="flex justify-center gap-4 mb-8 flex-wrap">
          <a href="/products" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2 hover:transform hover:-translate-y-1 hover:shadow-xl text-lg">
            {{ t('browse_products') }}
          </a>
          <a href="/sell" class="bg-white/80 backdrop-blur-md border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2 hover:transform hover:-translate-y-1 hover:shadow-xl text-lg">
            {{ t('sell_your_product') }}
          </a>
        </div>

        <!-- Stats section -->
        <div class="flex justify-center gap-6 mt-8 flex-wrap max-w-4xl">
          <div class="bg-white/80 backdrop-blur-md border border-orange-200/50 rounded-2xl p-6 text-center min-w-[160px] hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div class="text-2xl mb-2">👥</div>
            <div class="text-2xl font-bold text-gray-800 mb-1">10K+</div>
            <div class="text-gray-600 font-medium text-sm">{{ t('active_users') }}</div>
          </div>
          <div class="bg-white/80 backdrop-blur-md border border-orange-200/50 rounded-2xl p-6 text-center min-w-[160px] hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div class="text-2xl mb-2">📦</div>
            <div class="text-2xl font-bold text-gray-800 mb-1">50K+</div>
            <div class="text-gray-600 font-medium text-sm">{{ t('products_listed') }}</div>
          </div>
          <div class="bg-white/80 backdrop-blur-md border border-orange-200/50 rounded-2xl p-6 text-center min-w-[160px] hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div class="text-2xl mb-2">🛡️</div>
            <div class="text-2xl font-bold text-gray-800 mb-1">99.9%</div>
            <div class="text-gray-600 font-medium text-sm">{{ t('secure_transactions') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t('how_it_works') }}</h2>
          <p class="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">{{ t('how_it_works_subtitle') }}</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div class="text-4xl mb-4 mt-2">🔍</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('browse_discover') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('browse_discover_desc') }}
            </p>
          </div>
          
          <div class="text-center bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div class="text-4xl mb-4 mt-2">💳</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('secure_purchase') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('secure_purchase_desc') }}
            </p>
          </div>
          
          <div class="text-center bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div class="text-4xl mb-4 mt-2">📦</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('fast_delivery') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('fast_delivery_desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t('why_choose_gobuy') }}</h2>
          <p class="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">{{ t('why_choose_subtitle') }}</p>
        </div>
        
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          <div class="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="text-4xl mb-4">🛡️</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('secure_payments') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('secure_payments_desc') }}
            </p>
          </div>
          
          <div class="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('lightning_fast') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('lightning_fast_desc') }}
            </p>
          </div>
          
          <div class="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="text-4xl mb-4">⭐</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('quality_assured') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('quality_assured_desc') }}
            </p>
          </div>
          
          <div class="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('smart_matching') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('smart_matching_desc') }}
            </p>
          </div>
          
          <div class="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('24_7_support') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('24_7_support_desc') }}
            </p>
          </div>
          
          <div class="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="text-4xl mb-4">🌍</div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t('global_reach') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ t('global_reach_desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { useUserStore } from '../store/user.js'
import { t } from '@/utils/language'

const userStore = useUserStore()
console.log(userStore.profile)
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