<template>
  <div class="checkout-page">
    <h1 class="checkout-title">Checkout</h1>
    <div v-if="errorMessage" class="error-message" role="alert">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>
    <div v-if="orderSuccess" class="success-message" role="alert">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Your order has been placed successfully.</span>
    </div>
    <div v-if="cart.length === 0" class="empty-cart-message" role="alert">
      <strong class="font-bold">Empty Cart!</strong>
      <span class="block sm:inline">Your cart is empty.  Please add products to your cart before checking out.</span>
      <router-link to="/" class="continue-shopping-link">
        Continue Shopping
      </router-link>
    </div>
    <div v-else>
      <form @submit.prevent="placeOrder" class="checkout-form">
        <div class="form-group">
          <label for="name" class="form-label">Name:</label>
          <input v-model="name" required type="text" id="name" class="form-input">
        </div>
        <div class="form-group">
          <label for="address" class="form-label">Shipping Address:</label>
          <textarea v-model="shippingAddress" required id="address" class="form-textarea"></textarea>
        </div>
        <p class="order-total">Total: ${{ grandTotal }}</p>
        <button type="submit" :disabled="isSubmitting" class="place-order-button" :class="{ 'is-submitting': isSubmitting }">
          <span v-if="isSubmitting">Processing...</span>
          <span v-else>Place Order</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import axios from 'axios' // Removed axios//     

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = ref('')
    const shippingAddress = ref('')
    const isSubmitting = ref(false);
    const errorMessage = ref(null);
    const orderSuccess = ref(false);
    //  const axios = inject('$axios');

    const cart = computed(() => store.state.cart)
    const user = computed(() => store.state.user);

    const grandTotal = computed(() => {
      return cart.value.reduce((total, item) => Number(total) + Number(item.total), 0)
    })

    onMounted(() => {
    console.log('Mounted CheckoutPage', store)
      if (!store.state.user.id) {
        store.dispatch('fetchUser', 1);
      }
    });

    const placeOrder = async () => {
      if (cart.value.length === 0) return;

      isSubmitting.value = true
      errorMessage.value = null;
      orderSuccess.value = false;

      const orderData = {
        user_id: user.value.id,
        items: cart.value.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        shipping_address: shippingAddress.value,
      }

      try {
        const response = await axios.post('/orders', orderData)
        console.log('Order response:', response.data)
        // store.commit('SET_ORDER_ID', response.data.order_id);
        // store.commit('CLEAR_CART');
        // await store.dispatch('fetchUserBalance');
        orderSuccess.value = true;
        router.push(`/order-confirmation/${response.data.order_id}`);

      } catch (error) {
        errorMessage.value = error.response?.data?.error || 'Failed to place order. Please try again.';
        console.error('Error placing order:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      name,
      shippingAddress,
      cart,
      grandTotal,
      placeOrder,
      isSubmitting,
      errorMessage,
      orderSuccess,
      user
    }
  },
}
</script>

<style>
.checkout-page {
  padding: 16px;
  margin: 0 auto;
  max-width: 600px;
}

.checkout-title {
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

.success-message {
  background-color: #48bb78;
  color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.empty-cart-message {
  background-color: #fefc8a;
  color: #1a202c;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.continue-shopping-link {
  color: #4299e1;
  text-decoration: underline;
  margin-top: 0.5rem;
  display: inline-block;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: bold;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  color: #2d3748;
}

.form-textarea {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  color: #2d3748;
  min-height: 100px;
}

.order-total {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2d3748;
  margin-top: 1rem;
}

.place-order-button {
  background-color: #16a34a;
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-align: center;
}

.place-order-button:hover {
  background-color: #15803d;
}

.place-order-button.is-submitting {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
