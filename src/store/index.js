import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/mainPage/products'
import categories from './modules/mainPage/filtersData/categories'
import colors from './modules/mainPage/filtersData/colors'
import seasons from './modules/mainPage/filtersData/seasons'
import materials from './modules/mainPage/filtersData/materials'
import productPage from './modules/productPage/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    products,
    categories,
    colors,
    materials,
    seasons,
    productPage
  }
})
