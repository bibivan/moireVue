import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      productsLoading: false,
      productsLoadingFailed: false,
      allProductsCount: 0,
      productsData: []
    }
  },
  mutations: {
    setProductsLoadingFailed (state, failed) {
      state.productsLoading = failed
    },
    setProductsLoadingStatus (state, loading) {
      state.productsLoading = loading
    },
    updateProductsData (state, data) {
      state.productsData = data
    }
  },
  actions: {
    async loadProducts (context, params) {
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(async () => {
        context.commit('setProductsLoadingStatus', true)
        try {
          const response = await axios.get(API_BASE_URL + '/api/products', {
            params
          })
          context.commit('updateProductsData', response.data)
        } catch {
          context.commit('setProductsLoadingFailed', 'Произошла ошибка при загрузке товаров')
        }
        context.commit('setProductsLoadingStatus', false)
      }, 0)
    }
  },
  getters: {
    productsLoading (state) {
      return state.productsLoading
    },
    productsLoadingFailed (state) {
      return state.productsLoadingFailed
    },
    productsData (state) {
      return state.productsData
    }
  }
}
