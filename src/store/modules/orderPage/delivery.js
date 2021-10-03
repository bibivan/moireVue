import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      deliveryLoadingFailed: false,
      deliveryData: []
    }
  },
  mutations: {
    setDeliveryLoadingFailed (state, failed) {
      state.deliveryLoadingFailed = failed
    },
    updateDeliveryData (state, data) {
      state.deliveryData = data
    }
  },
  actions: {
    async loadDelivery (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/deliveries')
        context.commit('updateDeliveryData', response.data.items)
      } catch (e) {
        context.commit('setDeliveryLoadingFailed', 'Не удалось информацию о способах доставки')
        throw (e)
      }
    }
  },
  getters: {
    deliveryLoadingFailed (state) {
      return state.deliveryLoadingFailed
    },
    deliveryData (state) {
      return state.deliveryData
    }
  }
}
