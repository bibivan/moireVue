import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      colorsLoadingFailed: false,
      colorsData: []
    }
  },
  mutations: {
    setColorsLoadingFailed (state, failed) {
      state.colorsLoadingFailed = failed
    },
    updateColorsData (state, data) {
      state.colorsData = data
    }
  },
  actions: {
    async loadColors (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/colors')
        context.commit('updateColorsData', response.data.items)
      } catch (e) {
        context.commit('setColorsLoadingFailed', 'Не удалось загрузить список цветов')
        throw (e)
      }
    }
  },
  getters: {
    colorsLoadingFailed (state) {
      return state.colorsLoadingFailed
    },
    colorsData (state) {
      return state.colorsData
    }
  }
}
