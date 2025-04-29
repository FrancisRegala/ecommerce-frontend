import { createStore } from 'vuex'
import axios from 'axios';

const store = createStore({
  state() {
    return {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'user1@gmail.com',
        balance: 1000, // Example balance
      },
      cart: [],
      orderId: null,
      errorMessage: null,
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_CART(state, cart) {
      state.cart = cart
    },
     SET_ORDER_ID(state, orderId) {
      state.orderId = orderId
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    },
    ADD_TO_CART(state, product) {
      console.log("Adding to cart:", state, product)
      const existingItem = state.cart.find(item => item.product.id === product.id)
      console.log("Existing item in cart:", existingItem)
      if (existingItem) {
        existingItem.quantity++
        existingItem.total = existingItem.quantity * existingItem.product.price
      } else {
        state.cart.push({
          product,
          quantity: 1,
          total: product.price,
        })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.product.id !== productId)
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    UPDATE_USER_BALANCE(state, newBalance) {
      state.user.balance = newBalance;
    }
  },
  actions: {
    // Example action for fetching user data
    async fetchUser({ commit }, userId) {
      try {
        // Make API call to fetch user data, including balance
        const response = await axios.get(`/api/users/${userId}`);
        commit('SET_USER', response.data);
      } catch (error) {
        commit('SET_ERROR_MESSAGE', 'Failed to fetch user data.');
        console.error('Error fetching user data:', error);
      }
    },
     async fetchUserBalance({ commit, state }) {
          try {
            const response = await axios.get(`/api/users/${state.user.id}/balance`);
            commit('UPDATE_USER_BALANCE', response.data.balance);
          } catch (error) {
             commit('SET_ERROR_MESSAGE', 'Failed to fetch user balance.');
            console.error("Error fetching user balance", error);
          }
      },
    async placeOrder({ commit }, orderData) {
      try {
        // Make API call to place the order
        const response = await axios.post('/api/orders', orderData);
        commit('SET_ORDER_ID', response.data.order_id);
        commit('CLEAR_CART'); // Clear the cart after successful order
        //  await dispatch('fetchUserBalance'); //Refetch user balance.
        return response.data; // Return the response data
      } catch (error) {
        commit('SET_ERROR_MESSAGE', 'Failed to place order.');
        console.error('Error placing order:', error);
        throw error; // Re-throw the error to be caught in the component
      }
    },
  },
})

export default store
