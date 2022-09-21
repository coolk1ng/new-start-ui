import Vue from 'vue'
import VueRouter from 'vue-router'
import refundTax from "@/components/RefundTax";
import Home from "@/components/Home";
import warehouse from "@/components/Warehouse";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: warehouse,
        children: [
            {
                path: '/warehouse',
                name: 'Warehouse',
                component: warehouse,
            },
            {
                path: '/refundTax',
                name: 'RefundTax',
                component: refundTax,
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router

