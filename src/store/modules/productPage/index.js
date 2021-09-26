import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      productLoadingFailed: false,
      productItem: null
    }
  },
  mutations: {
    setProductLoadingFailed (state, failed) {
      state.productLoadingFailed = failed
    },
    updateProductItem (state, data) {
      state.productItem = data
    }
  },
  actions: {
    async loadProductItem (context, id) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/products/' + id)
        context.commit('updateProductItem', response.data)
      } catch {
        context.commit('setProductLoadingFailed', 'Не удалось загрузить информацию о товаре')
      }
    }
  },
  getters: {
    productLoadingFailed (state) {
      return state.productLoadingFailed
    },
    productItem (state) {
      return state.productItem
    }
  }
}
