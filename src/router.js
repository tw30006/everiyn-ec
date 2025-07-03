import { createWebHistory, createRouter } from 'vue-router'
import Login from './views/dashboard/Login.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import Product from './views/dashboard/Product.vue'
import AdminOrder from './views/dashboard/Order.vue'
import Coupon from './views/dashboard/Coupon.vue'
import Article from './views/dashboard/Article.vue'
import AllProduct from './views/User/AllProduct.vue'
import Cart from './views/User/Cart.vue'
import About from './views/User/About.vue'
import Payment from './views/User/Payment.vue'
import Information from './views/User/Information.vue'

const routes = [
  {
    path: '/',
    children: [
      {
        path: 'allproduct',
        component: AllProduct,
      },
      {
        path: 'cart',
        component: Cart,
        children: [
          {
            path: 'information',
            component: Information,
          },
          {
            path: 'payment',
            component: Payment,
          },
        ],
      },
      {
        path: 'about',
        component: About,
      },
      
    ],
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
        component: AdminOrder,
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
