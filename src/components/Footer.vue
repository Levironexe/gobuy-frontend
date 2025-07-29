<template>
  <footer class="bg-gray-800 text-gray-100 py-6 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Brand Section -->
        <div class="flex items-center">
          <span class="text-2xl font-bold text-orange-500">GoBuy</span>
        </div>
        
        <!-- Links Section -->
        <div class="flex justify-start md:justify-end">
          <div class="flex flex-wrap gap-6">
            <a href="/about" class="text-gray-300 hover:text-orange-500 transition-colors duration-200 font-medium">
              About
            </a>
            <a href="/contact" class="text-gray-300 hover:text-orange-500 transition-colors duration-200 font-medium">
              Contact
            </a>
            <a href="/privacy" class="text-gray-300 hover:text-orange-500 transition-colors duration-200 font-medium">
              Privacy
            </a>
            <a href="/terms" class="text-gray-300 hover:text-orange-500 transition-colors duration-200 font-medium">
              Terms
            </a>
          </div>
        </div>
      </div>
      
      <!-- Divider -->
      <hr class="border-gray-600 opacity-50 my-4">
      
      <!-- Copyright -->
      <div class="text-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} GoBuy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>