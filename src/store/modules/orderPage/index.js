import axios from 'axios'
import { mapMutations } from 'vuex'
import API_BASE_URL from '@/config'

export default {
  state () {
    return {
      orderInfo: {}
    }
  },
  mutations: {
    ...mapMutations(['resetCart']),
    updateOrderInfo (state, info) {
      state.orderInfo = info
    }
  },
  actions: {
    async orderProducts (context, formData, key) {
      try {
        const response = await axios.post(API_BASE_URL + '/api/orders', {
          ...formData
        }, {
          params: {
            userAccessKey: key
          }
        })
        context.commit('resetCart')
        context.commit('updateOrderInfo', response.data)
        this.$router.push({
          name: 'orderInfo',
          params: { id: response.data.id }
        })
      } catch (e) {
        console.log('ошибка')
        throw (e)
      }
    }
  },
  getters: {
    orderInfo (state) {
      return state.orderInfo
    }
  }
}
