<template>
    <div class="product-card">
      <h2 class="product-name">{{ product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">${{ product.price }}</p>
      <button @click="$emit('add-to-cart', product)" class="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    emits: ['add-to-cart'],
  }
  </script>
  
  <style>
  .product-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .product-name {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .product-description {
    color: #6b7280;
    margin-bottom: 8px;
  }
  
  .product-price {
    font-size: 1.125rem;
    font-weight: bold;
    color: #3b82f6;
    margin-bottom: 16px;
  }
  
  .add-to-cart-button {
    background-color: #16a34a;
    color: #ffffff;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .add-to-cart-button:hover {
    background-color: #15803d;
  }
  </style>