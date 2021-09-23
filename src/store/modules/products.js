import API_BASE_URL from '@/config'

export default {
  state () {
    return {
      productsLoading: false,
      productsLoadingFailed: false,
      productsData: []
    }
  },
  mutations: {
    setProductsLoadingFailed (state, failed) {
      state.cartLoadingFailed = failed
    },
    setProductsLoadingStatus (state, loading) {
      state.cartLoading = loading
    },
    updateProductsData (state, data) {
      state.productsData = data
    }
  },
  actions: {
    async loadProducts (context) {
      context.commit('setProductsLoadingStatus', true)
      const url = new URL('/api/products?limit=12', API_BASE_URL)
      // const params = new URLSearchParams(url.search)
      // params.set('limit', '3')
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        context.commit('updateProductsData', data.items)
      } else {
        context.commit('setProductsLoadingFailed', true)
      }
      context.commit('setProductsLoadingStatus', false)
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
