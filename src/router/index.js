// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LogIn from '@/views/LogIn.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import AuthCallback from '@/components/AuthCallback.vue'
import AllProducts from '@/views/AllProducts.vue'
import Sell from '@/views/Sell.vue'
import Cart from '@/views/Order.vue'
import Checkout from '@/views/Checkout.vue'
import MyProducts from '@/views/MyProducts.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LogIn},
  { path: '/register', name: 'Register', component: Register},
  { path: '/profile', name: 'Profile', component: Profile},
  { path: '/products', name: 'Products', component: AllProducts},
  { path: '/sell', name: 'Sell', component: Sell},
  { path: '/cart', name: 'Cart', component: Cart},
  { path: '/checkout', name: 'Checkout', component: Checkout},
  { path: '/myproducts', name: 'MyProducts', component: MyProducts},
  { path: '/settings', name: 'Settings', component: Settings},
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
    props: true
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})