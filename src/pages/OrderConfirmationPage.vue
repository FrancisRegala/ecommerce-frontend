<template>
  <div class="order-confirmation-page">
    <h1 class="confirmation-title">Order Confirmation</h1>
    <p class="confirmation-message">
      Thank you for your order! Your order confirmation number is <strong>{{ orderId ?? 100 }}</strong>.
    </p>
    <!-- <p class="no-order-message" v-else>
      No order confirmation number available.
    </p> -->
    <router-link to="/" class="continue-shopping-link">
      Continue Shopping
    </router-link>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    console.log(route)
    const orderId = route.params.id

    return {
      orderId,
    }
  },
}
</script>

<style>
.order-confirmation-page {
  padding: 16px;
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
}

.confirmation-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2d3748;
}

.confirmation-message {
  font-size: 1.25rem;
  color: #38a169;
  margin-bottom: 1rem;
}

.no-order-message {
  font-size: 1.25rem;
  color: #e53e3e;
  margin-bottom: 1rem;
}

.continue-shopping-link {
  color: #4299e1;
  text-decoration: underline;
  margin-top: 1rem;
  display: inline-block;
}
</style>