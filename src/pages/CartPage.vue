<template>
  <div class="cart-page">
    <h1 class="cart-title">Your Cart</h1>
    <div v-if="cart.length === 0" class="empty-cart-message" role="alert">
      <strong class="font-bold">Your cart is empty.</strong>
      <router-link to="/" class="continue-shopping-link">
        Continue Shopping
      </router-link>
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.product.id" class="cart-item">
        <div class="item-details">
          <h3 class="product-name">{{ item.product.name }}</h3>
          <p class="product-price">Price: ${{ item.product.price }}</p>
          <p class="quantity">Quantity: {{ item.quantity }}</p>
          <p class="item-total">Total: ${{ item.total }}</p>
        </div>
        <button @click="removeFromCart(item.product.id)" class="remove-button">
          Remove
        </button>
      </div>
      <div class="cart-summary">
        <p class="grand-total">Grand Total: ${{ grandTotal }}</p>
        <router-link to="/checkout" class="checkout-button">
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    console.log('store:', store)

    const cart = computed(() => store.state.cart)

    const grandTotal = computed(() => {
      return cart.value.reduce((total, item) => Number(total) + Number(item.total), 0)
    })

    const removeFromCart = (productId) => {
      store.commit('REMOVE_FROM_CART', productId)
    }

    return {
      cart,
      grandTotal,
      removeFromCart,
    }
  },
}
</script>

<style>
.cart-page {
  padding: 16px;
  margin: 0 auto;
  max-width: 800px;
}

.cart-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2d3748;
}

.empty-cart-message {
  background-color: #fefc8a;
  color: #1a202c;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  text-align: center;
}

.continue-shopping-link {
  color: #4299e1;
  text-decoration: underline;
  margin-top: 0.5rem;
  display: inline-block;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-details {
  flex: 1;
}

.product-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.product-price,
.quantity,
.item-total {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.remove-button {
  background-color: #e53e3e;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.remove-button:hover {
  background-color: #c53030;
}

.cart-summary {
  margin-top: 2rem;
  text-align: right;
}

.grand-total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
}

.checkout-button {
  background-color: #16a34a;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: inline-block;
}

.checkout-button:hover {
  background-color: #15803d;
}
</style>
