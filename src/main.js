import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'bootstrap'; // Import Bootstrap JavaScript (this will include popper.js)
// import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router'
import store from './store'
import axios from './plugins/axios'; // Import the axios configuration

const app = createApp(App)

app.use(router)
app.use(store)
app.config.globalProperties.$axios = axios; // Make axios available globally in components
app.mount('#app')
