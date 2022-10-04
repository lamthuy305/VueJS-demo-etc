import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'
import Error from '../components/Error.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/products',
        component: Products
    },
    {
        path: '/error404',
        component: Error
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router