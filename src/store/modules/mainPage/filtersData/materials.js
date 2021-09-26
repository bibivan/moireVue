import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      materialsLoadingFailed: false,
      materialsData: []
    }
  },
  mutations: {
    setMaterialsLoadingFailed (state, failed) {
      state.materialsLoadingFailed = failed
    },
    updateMaterialsData (state, data) {
      state.materialsData = data
    }
  },
  actions: {
    async loadMaterials (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/materials')
        context.commit('updateMaterialsData', response.data.items)
      } catch {
        context.commit('setMaterialsLoadingFailed', 'Не удалось загрузить список материалов')
      }
    }
  },
  getters: {
    materialsLoadingFailed (state) {
      return state.materialsLoadingFailed
    },
    materialsData (state) {
      return state.materialsData
    }
  }
}
