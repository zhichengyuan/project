import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
console.log(process.env.VUE_APP_BASE_API)

const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')
