import axios from 'axios'
import API_BASE_URL from '@/config'

export default {
  state () {
    return {
      cartLoading: false,
      cartLoadingFailed: false,
      notAddedToCart: false,
      notDeletedFromCart: false,
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
    setCartLoadingStatus (state, status) {
      state.cartLoading = status
    },
    setAddedToCartStatus (state, status) {
      state.notAddedToCart = status
    },
    setDeletedFromCartStatus (state, status) {
      state.notDeletedFromCart = status
    },
    resetCart (state) {
      state.cartProductsData = []
    }
  },
  actions: {
    async loadCart (context) {
      context.commit('setCartLoadingStatus', true)

      try {
        const response = await axios.get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })

        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey)
          context.commit('updateUserAccessKey', response.data.user.accessKey)
        }
        context.commit('updateCartProductsData', response.data.items)
      } catch (e) {
        context.commit('setCartLoadingFailed', 'Произошла ошибка при загрузке корзины товаров')
        throw e
      }
      context.commit('setCartLoadingStatus', false)
    },
    async addProductToCart (context, data) {
      try {
        const response = await axios.post(API_BASE_URL + '/api/baskets/products2', data, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })

        context.commit('updateCartProductsData', response.data.items)
      } catch (e) {
        context.commit('setAddedToCartStatus', 'Произошла ошибка при добавлении товара')
        throw e
      }
    },
    async deleteProductFromCart (context, basketItemId) {
      try {
        const response = await axios.delete(API_BASE_URL + '/api/baskets/products2', {
          data: { basketItemId },
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })

        context.commit('updateCartProductsData', response.data.items)
      } catch (e) {
        context.commit('setDeletedFromCartStatus', 'Произошла ошибка при удалении товара мз корзины')
        throw e
      }
    }
  },
  getters: {
    userAccessKey (state) {
      return state.userAccessKey
    },
    cartLoading (state) {
      return state.cartLoading
    },
    cartLoadingFailed (state) {
      return state.cartLoadingFailed
    },
    cartProductsData (state) {
      return state.cartProductsData
    },
    cartTotalPrice (state) {
      return state.cartProductsData.reduce((acc, item) => {
        return (item.product.price * item.quantity) + acc
      }, 0)
    },
    notAddedToCart (state) {
      return state.notAddedToCart
    },
    notDeletedFromCart (state) {
      return state.notDeletedFromCart
    }
  }
}
