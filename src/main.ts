import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/index.scss';
import L from 'leaflet';  // 引入 Leaflet
import 'leaflet/dist/leaflet.css'; // 导入 Leaflet 样式
import 'cesium/Widgets/widgets.css';

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