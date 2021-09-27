import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'filter', component: MainPage, path: '/:category/:categoryId' },
  { name: 'product', component: ProductPage, path: '/product/:id/:colorId' },
  { name: 'notFound', component: NotFoundPage, path: '*' }
]

const router = new VueRouter({
  routes
})

export default router
