<!-- Checkout.vue -->
<template>
  <div class="checkout-page py-16">
    <!-- Hero Header Section -->
    <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-6 mb-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          <span class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Checkout</span>
        </h1>
        <p class="text-gray-600 text-lg text-center mt-2">Complete your order</p>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-2xl">
      <!-- Prototype Notice -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">        
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          Checkout Coming Soon!
        </h2>
        
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <p class="text-blue-700 text-lg leading-relaxed">
            This is a <strong>prototype version</strong> of GoBuy. 
            The checkout and payment functionality is currently under development.
          </p>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <h3 class="font-bold text-orange-800 mb-2 text-lg">What's Coming:</h3>
          <ul class="text-orange-700 space-y-2">
            <li>Secure payment processing</li>
            <li>Order tracking</li>
            <li>Email confirmations</li>
            <li>Shipping options</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4">
          <router-link to="/cart" 
            class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg no-underline block">
            Back to Cart
          </router-link>
          
          <router-link to="/products" 
            class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-8 rounded-xl transition-colors duration-200 no-underline block">
            Continue Shopping
          </router-link>
          
          <router-link to="/" 
            class="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-medium py-4 px-8 rounded-xl transition-colors duration-200 no-underline block">
            Go Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>