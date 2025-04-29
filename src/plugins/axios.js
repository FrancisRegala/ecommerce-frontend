import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api'; //  Set the base URL for your Laravel API

// Add any other custom configuration here (e.g., interceptors)

export default axios;