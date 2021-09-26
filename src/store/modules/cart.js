import axios from 'axios'
import API_BASE_URL from '@/config'

export default {
  state () {
    return {
      cartLoading: false,
      cartLoadingFailed: false,
      userAccessKey: null,
      cartProductsData: []
    }
  },
  mutations: {
    updateCartProductsData (state, items) {
      state.cartProductsData = items
    },
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    setCartLoadingFailed (state, failed) {
      state.cartLoadingFailed = failed
    },
    setCartLoadingStatus (state, loading) {
      state.cartLoading = loading
    }
  },
  actions: {
    async loadCart (context) {
      context.commit('setCartLoadingStatus', true)
      const response = await axios.get(API_BASE_URL + '/api/baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })

      try {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey)
          context.commit('updateUserAccessKey', response.data.user.accessKey)
        }
        context.commit('updateCartProductsData', response.data.items)
      } catch {
        context.commit('setCartLoadingFailed', true)
      }
      context.commit('setCartLoadingStatus', false)
    }
  },
  getters: {
    cartLoading (state) {
      return state.cartLoading
    },
    cartLoadingFailed (state) {
      return state.cartLoadingFailed
    },
    cartProductsData (state) {
      return state.cartProductsData
    }
  }
}
