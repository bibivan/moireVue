import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      paymentsLoadingFailed: false,
      paymentsData: []
    }
  },
  mutations: {
    setPaymentsLoadingFailed (state, failed) {
      state.paymentsLoadingFailed = failed
    },
    updatePaymentsData (state, data) {
      state.paymentsData = data
    }
  },
  actions: {
    async loadPayments (context, id = 1) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/payments', {
          params: {
            deliveryTypeId: id
          }
        })
        context.commit('updatePaymentsData', response.data)
      } catch (e) {
        context.commit('setPaymentsLoadingFailed', 'Не удалось информацию о способах доставки')
        throw (e)
      }
    }
  },
  getters: {
    paymentsLoadingFailed (state) {
      return state.paymentsLoadingFailed
    },
    paymentsData (state) {
      return state.paymentsData
    }
  }
}
