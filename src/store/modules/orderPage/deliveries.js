import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      deliveriesLoadingFailed: false,
      deliveriesData: []
    }
  },
  mutations: {
    setDeliveriesLoadingFailed (state, failed) {
      state.deliveriesLoadingFailed = failed
    },
    updateDeliveriesData (state, data) {
      state.deliveriesData = data
    }
  },
  actions: {
    async loadDeliveries (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/deliveries')
        context.commit('updateDeliveriesData', response.data)
      } catch (e) {
        context.commit('setDeliveriesLoadingFailed', 'Не удалось получить информацию о способах доставки')
        throw (e)
      }
    }
  },
  getters: {
    deliveriesLoadingFailed (state) {
      return state.deliveriesLoadingFailed
    },
    deliveriesData (state) {
      return state.deliveriesData
    }
  }
}
