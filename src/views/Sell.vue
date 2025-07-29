<!-- Sell.vue -->
<template>
    <div v-if="checked" class="sell-page mt-16">
        <div class="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center relative min-h-screen overflow-hidden">
            <!-- Background decorations -->
            <div class="absolute w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 top-[10%] -left-[5%] animate-float"></div>
            <div class="absolute w-48 h-48 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full opacity-10 top-[60%] -right-[5%] animate-float-delayed-2s"></div>
            <div class="absolute w-36 h-36 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-10 bottom-[20%] left-[10%] animate-float-delayed-4s"></div>

            <div class="container mx-auto w-full py-5 px-4">
                <div class="">
                    <div class="flex bg-white/95 backdrop-blur-xl border border-orange-200 rounded-3xl shadow-2xl p-5 gap-5 justify-between w-full">
                        <div class="w-full">
                            <div class="text-left mb-4">
                                <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ t('upload_product') }}</h1>
                                <p class="text-gray-600 text-lg">{{ t('sell_subtitle') }}</p>
                            </div>

                            <!-- Success Message -->
                            <div v-if="success" class="bg-green-100/80 border border-green-400/30 text-green-700 rounded-xl p-4 mb-4 flex items-start gap-3">
                                <div>
                                    <div class="font-semibold">{{ t('product_uploaded') }}</div>
                                    <div class="text-sm text-green-600">
                                        {{ t('product_uploaded_desc') }}
                                    </div>
                                </div>
                            </div>

                            <!-- Error Message -->
                            <div v-if="error" class="bg-red-100/80 border border-red-400/30 text-red-700 rounded-xl p-4 mb-4 flex items-center gap-2">
                                <span class="text-red-500">⚠️</span>
                                {{ error }}
                            </div>

                            <!-- Upload Form -->
                            <form v-if="!success" @submit.prevent="handleUpload" class="mb-4">
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-lg font-medium mb-2">{{ t('title') }}</label>
                                    <div class="relative">
                                        <input 
                                            v-model="title" 
                                            type="text" 
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                                            :placeholder="t('product_title')"
                                            required 
                                        />
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-gray-700 text-lg font-medium mb-2">{{ t('description') }}</label>
                                    <div class="relative">
                                        <textarea 
                                            v-model="description" 
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white resize-none"
                                            :placeholder="t('product_description')"
                                            rows="3" 
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-gray-700 text-lg font-medium mb-2">{{ t('price_usd') }}</label>
                                    <div class="relative">
                                        <input 
                                            v-model.number="price" 
                                            type="number" 
                                            min="0" 
                                            step="0.01"
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                                            placeholder="Price" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-gray-700 text-lg font-medium mb-2">{{ t('category') }}</label>
                                    <div class="relative">
                                        <input 
                                            v-model="category" 
                                            type="text" 
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                                            placeholder="Category (e.g. Electronics)" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-gray-700 text-lg font-medium mb-2">{{ t('stock_quantity') }}</label>
                                    <div class="relative">
                                        <input 
                                            v-model.number="stock" 
                                            type="number" 
                                            min="1" 
                                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                                            :placeholder="t('stock_quantity')"
                                            required 
                                        />
                                    </div>
                                </div>

                                <!-- Image Upload Section -->
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-lg font-medium mb-2">{{ t('product_thumbnail') }}</label>
                                    
                                    <!-- Drag & Drop Area -->
                                    <div 
                                        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 relative min-h-[200px] flex items-center justify-center hover:border-orange-500 hover:bg-orange-50"
                                        :class="{ 
                                            'border-orange-500 bg-orange-50 transform scale-105': isDragOver, 
                                            'p-0 border-gray-200': imagePreview 
                                        }"
                                        @dragover.prevent="handleDragOver"
                                        @dragleave.prevent="handleDragLeave"
                                        @drop.prevent="handleDrop"
                                        @click="triggerFileInput"
                                    >
                                        <!-- Hidden file input -->
                                        <input 
                                            ref="fileInput"
                                            type="file" 
                                            accept="image/*" 
                                            @change="handleFileSelect"
                                            class="hidden"
                                        />
                                        
                                        <!-- Upload UI -->
                                        <div v-if="!imagePreview" class="flex flex-col items-center gap-4">
                                            <div class="text-5xl opacity-50">📸</div>
                                            <div class="text-center">
                                                <p class="text-lg font-semibold text-gray-700 mb-1">{{ t('click_upload_drag') }}</p>
                                                <p class="text-sm text-gray-500">{{ t('file_size_limit') }}</p>
                                            </div>
                                        </div>
                                        
                                        <!-- Image Preview -->
                                        <div v-else class="relative w-full h-[200px]">
                                            <img :src="imagePreview" alt="Product preview" class="w-full h-full object-cover rounded-xl" />
                                            <div class="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 text-white">
                                                <button 
                                                    type="button" 
                                                    @click.stop="removeImage"
                                                    class="bg-white/20 border border-white/30 rounded-full w-10 h-10 text-white text-lg cursor-pointer flex items-center justify-center mb-2 hover:bg-white/30 transition-all duration-300"
                                                >
                                                    ✕
                                                </button>
                                                <div class="text-sm font-medium">{{ t('click_change_image') }}</div>
                                            </div>
                                        </div>
                                        
                                        <!-- Upload Progress -->
                                        <div v-if="uploadProgress > 0 && uploadProgress < 100" class="absolute bottom-4 left-4 right-4">
                                            <div class="bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                                                <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
                                            </div>
                                            <div class="text-xs text-gray-600 text-center">{{ uploadProgress }}%</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Image Upload Error -->
                                    <div v-if="imageError" class="text-red-500 text-sm mt-2">
                                        {{ imageError }}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none disabled:hover:shadow-none" 
                                    :disabled="loading"
                                >
                                    <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    {{ loading ? t('uploading') : t('upload_product_btn') }}
                                </button>
                            </form>

                            <!-- Back to Products Link -->
                            <div class="text-center">
                                <p class="text-gray-600">
                                    <router-link to="/products" class="text-orange-500 hover:text-orange-600 hover:underline transition-colors duration-200 font-medium">{{ t('back_to_products') }}</router-link>
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
import { useAPI } from '@/composables/useAPI'

const { getSession, createProduct } = useAPI()
const checked = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref(null)

const userId = ref('')
const title = ref('')
const description = ref('')
const price = ref('')
const category = ref('')
const stock = ref(1)

// Image upload related
const fileInput = ref(null)
const selectedFile = ref(null)
const imagePreview = ref('')
const imageError = ref('')
const isDragOver = ref(false)
const uploadProgress = ref(0)

// Session check
onMounted(async () => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
        try {
            const response = await getSession(storedToken)
            if (!response || !response.session) {
                localStorage.removeItem('auth_token')
                window.location.href = '/login'
                return
            }
            userId.value = response.user.id
            checked.value = true
        } catch (err) {
            localStorage.removeItem('auth_token')
            window.location.href = '/login'
        }
    } else {
        window.location.href = '/login'
    }
})

// Image upload functions
const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
        processFile(file)
    }
}

const handleDragOver = (event) => {
    isDragOver.value = true
}

const handleDragLeave = (event) => {
    isDragOver.value = false
}

const handleDrop = (event) => {
    isDragOver.value = false
    const files = event.dataTransfer.files
    if (files.length > 0) {
        processFile(files[0])
    }
}

const processFile = (file) => {
    imageError.value = ''
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        imageError.value = 'Please select an image file (PNG, JPG, GIF)'
        return
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        imageError.value = 'File size must be less than 10MB'
        return
    }
    
    selectedFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
        imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
}

const removeImage = () => {
    selectedFile.value = null
    imagePreview.value = ''
    imageError.value = ''
    uploadProgress.value = 0
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

// Upload image to Cloudinary
const uploadImageToServer = async (file) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        
        // Optional: Add metadata
        formData.append('context', `user_id=${userId.value}|upload_date=${new Date().toISOString()}`)
        formData.append('folder', 'gobuy_products') // Organize images in folders
        
        // Optional: Add tags for better organization
        formData.append('tags', 'product,ecommerce,gobuy')
        
        uploadProgress.value = 20
        
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        )
        
        uploadProgress.value = 80
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error?.message || 'Failed to upload image')
        }
        
        const result = await response.json()
        uploadProgress.value = 100
        
        console.log('Image uploaded to Cloudinary:', {
            public_id: result.public_id,
            url: result.secure_url,
            size: result.bytes,
            format: result.format
        })
        
        // Return the optimized URL with transformations
        return result.secure_url
        
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        uploadProgress.value = 0
        throw new Error(`Image upload failed: ${error.message}`)
    }
}

// Handle product upload
const handleUpload = async () => {
    error.value = null
    success.value = false
    loading.value = true
    
    try {
        let imageUrl = ''
        
        // Upload image if selected
        if (selectedFile.value) {
            try {
                // Add this in your uploadImageToServer function, right at the beginning:
                console.log('=== DEBUG INFO ===')
                console.log('Cloud Name from env:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
                console.log('Upload Preset from env:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
                console.log('All VITE vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')))
                imageUrl = await uploadImageToServer(selectedFile.value)
            } catch (uploadError) {
                error.value = 'Failed to upload image. Please try again.'
                loading.value = false
                return
            }
        }
        
        const product = {
            seller_id: userId.value,
            title: title.value,
            description: description.value,
            price: price.value,
            category: category.value,
            stock_quantity: stock.value,
            image_url: imageUrl,
            is_active: true
        }
        
        const storedToken = localStorage.getItem('auth_token')
        const response = await createProduct(product, storedToken)
        
        if (response && !response.error) {
            success.value = true
            // Reset form
            title.value = ''
            description.value = ''
            price.value = ''
            category.value = ''
            stock.value = 1
            removeImage()
        } else {
            error.value = response?.error || 'Failed to upload product'
        }
        
    } catch (err) {
        console.error('Upload error:', err)
        error.value = err.message || 'Failed to upload product'
    } finally {
        loading.value = false
    }
}
</script>

<!-- Add custom animations to your global CSS or in a style block -->
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