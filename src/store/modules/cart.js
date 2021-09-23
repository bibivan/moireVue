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
      const url = new URL('/api/baskets', API_BASE_URL)
      url.searchParams.append('userAccessKey', context.state.userAccessKey)
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', data.user.accessKey)
          context.commit('updateUserAccessKey', data.user.accessKey)
        }
        context.commit('updateCartProductsData', data.items)
      } else {
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
