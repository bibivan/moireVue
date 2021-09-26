import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      seasonsLoadingFailed: false,
      seasonsData: []
    }
  },
  mutations: {
    setSeasonsLoadingFailed (state, failed) {
      state.seasonsLoadingFailed = failed
    },
    updateSeasonsData (state, data) {
      state.seasonsData = data
    }
  },
  actions: {
    async loadSeasons (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/seasons')
        context.commit('updateSeasonsData', response.data.items)
      } catch {
        context.commit('setSeasonsLoadingFailed', 'Не удалось загрузить список коллекций')
      }
    }
  },
  getters: {
    seasonsLoadingFailed (state) {
      return state.seasonsLoadingFailed
    },
    seasonsData (state) {
      return state.seasonsData
    }
  }
}
