import { createRouter, createWebHistory } from "vue-router";
import Product from "./../views/ProductView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Product',
            component: Product
        }
    ]
})

export default router