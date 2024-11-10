// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Page1 from '../views/Page1.vue';
import Page2 from '../views/Page2.vue';
// import Page3 from '../components/Page3.vue';

const routes = [
    {
        path: '/',
        redirect: '/page1'  // 默认重定向到页面1
    },
    {
        path: '/page1',
        component: Page1
    },
    {
        path: '/page2',
        component: Page2
    },
    // {
    //     path: '/page3',
    //     component: Page3
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
