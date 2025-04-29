<template>
  <div class="home-page">
    <h1 class="home-title">Products</h1>
    <div v-if="errorMessage" class="error-message" role="alert">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>
    <div v-if="loading" class="loading-indicator">
      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-if="addToCartMessage" class="success-message add-to-cart-message" role="alert">
      {{ addToCartMessage }}
    </div>
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart(product)"
      />
    </div>
    <div style="padding-top: 20px;">
      <router-link to="/cart" class="go-to-cart-link">
        Go to Cart
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '../components/ProductCard.vue'
import axios from 'axios' // Removed axios

export default {
  components: {
    ProductCard,
  },
  setup() {
    const products = ref([])
    const loading = ref(true)
    const errorMessage = ref(null)
    const store = useStore()
    // const axios = inject('$axios'); // Use injected axios
    const addToCartMessage = ref(''); // New state for the message

    const cart = computed(() => store.state.cart)

    const addToCart = (product) => {
      console.log('Adding to cart:', product)
      console.log('store:', store)
      store.commit('ADD_TO_CART', product)
      addToCartMessage.value = `${product.name} has been added to your cart!`;
      // Clear the message after a few seconds
      setTimeout(() => {
        addToCartMessage.value = '';
      }, 3000); // 3 seconds
    }

    onMounted(async () => {
      try {
        const response = await axios.get('/products')
        products.value = response.data
      } catch (error) {
        errorMessage.value = 'Failed to load products.'
        console.error('Error fetching products:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      products,
      loading,
      errorMessage,
      addToCart,
      cart,
      addToCartMessage
    }
  },
}
</script>

<style>
.home-page {
  padding: 16px;
  margin: 0 auto;
  max-width: 1200px;
}

.home-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2d3748;
}

.error-message {
  background-color: #f56565;
  color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 256px;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  gap: 1rem;
}

.add-to-cart-message {
  background-color: #48bb78;
  color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  text-align: center;
}

.go-to-cart-link{
  text-decoration: underline;
}
</style>
