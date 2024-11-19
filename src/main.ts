import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/index.scss';

// 开发环境下使用 mock
if (import.meta.env.DEV) {
  import('./mock/index.ts').then(() => {
    console.log('Mock data initialized')
  })
}

const app = createApp(App);
const pinia = createPinia();

app.use(router)
   .use(pinia)
   .use(ElementPlus)
   .mount('#app');