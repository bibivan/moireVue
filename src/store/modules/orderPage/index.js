import axios from 'axios'
import API_BASE_URL from '@/config'

export default {
  state () {
    return {
      orderInfo: {},
      orderLoadingFailed: false
    }
  },
  mutations: {
    updateOrderInfo (state, info) {
      state.orderInfo = info
    },
    orderLoadingFailingStatus (state, status) {
      state.orderLoadingFailed = status
    }
  },
  actions: {
    async orderProducts (context, formData) {
      let response
      try {
        response = await axios.post(API_BASE_URL + '/api/orders', {
          ...formData
        }, {
          params: {
            userAccessKey: context.rootGetters.userAccessKey
          }
        })
        context.commit('resetCart')
        context.commit('updateOrderInfo', response.data)
      } catch (e) {
        console.log('error')
        throw e
      }
      return response
    },
    async loadOrderInfo (context, orderId) {
      let response
      // setTimeout(async () => {}, 700)
      try {
        response = await axios.get(API_BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.rootGetters.userAccessKey
          }
        })
        context.commit('updateOrderInfo', response.data)
      } catch (e) {
        context.commit('orderLoadingFailingStatus', 'Произошла ошибка при загрузки данных о заказе.')
        throw e
      }
      return response
    }
  },
  getters: {
    orderInfo (state) {
      return state.orderInfo
    },
    orderLoadingFailed (state) {
      return state.orderLoadingFailed
    }
  }
}
