import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      categoriesLoadingFailed: false,
      categoriesData: []
    }
  },
  mutations: {
    setCategoriesLoadingFailed (state, failed) {
      state.categoriesLoadingFailed = failed
    },
    updateCategoriesData (state, data) {
      state.categoriesData = data
    }
  },
  actions: {
    async loadCategories (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/productCategories')
        context.commit('updateCategoriesData', response.data.items)
      } catch {
        context.commit('setCategoriesLoadingFailed', 'Не удалось загрузить список категорий товаров')
      }
    }
  },
  getters: {
    categoriesLoadingFailed (state) {
      return state.categoriesLoadingFailed
    },
    categoriesData (state) {
      return state.categoriesData
    }
  }
}
