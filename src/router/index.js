import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from './pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import OrderConfirmationPage from '@/pages/OrderConfirmationPage.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/order-confirmation/:id', component: OrderConfirmationPage }, // Route with parameter
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
