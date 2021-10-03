import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage.vue'
import OrderInfoPage from '@/pages/OrderInfoPage.vue'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'filter', component: MainPage, path: '/filtered-by-:category/:categoryId' },
  { name: 'product', component: ProductPage, path: '/product/:id/:colorId' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'order', component: OrderPage, path: '/order' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' }
]

const router = new VueRouter({
  routes
})

export default router
