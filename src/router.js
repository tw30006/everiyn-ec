import { createWebHistory, createRouter } from 'vue-router'
import Login from './views/dashboard/Login.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import Product from './views/dashboard/Product.vue'
import Order from './views/dashboard/Order.vue'
import Coupon from './views/dashboard/Coupon.vue'
import Article from './views/dashboard/article.vue'

const routes = [
  {
    path: '/',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'product',
        component: Product,
      },
      {
        path: 'order',
        component: Order,
      },
      {
        path: 'coupon',
        component: Coupon,
      },
      {
        path: 'article',
        component: Article,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
