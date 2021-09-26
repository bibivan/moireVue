import API_BASE_URL from '@/config'
import axios from 'axios'

export default {
  state () {
    return {
      productsLoading: false,
      filtersLoading: false,
      productsLoadingFailed: false,
      categoriesLoadingFailed: false,
      colorsLoadingFailed: false,
      productsData: [],
      categoriesData: [],
      colorsData: []
    }
  },
  mutations: {
    setProductsLoadingFailed (state, failed) {
      state.cartLoadingFailed = failed
    },
    setCategoriesLoadingDaFailed (state, failed) {
      state.categoriesLoadingFailed = failed
    },
    setColorsLoadingFailed (state, failed) {
      state.colorsLoadingFailed = failed
    },
    setProductsLoadingStatus (state, loading) {
      state.cartLoading = loading
    },
    setFiltersLoadingStatus (state, failed) {
      state.filtersLoading = failed
    },
    updateProductsData (state, data) {
      state.productsData = data
    },
    updateCategoriesData (state, data) {
      state.categoriesData = data
    },
    updateColorsData (state, data) {
      state.colorsData = data
    }
  },
  actions: {
    async loadProducts (context, {
      page,
      limit,
      categoryId,
      minPrice,
      maxPrice
    }) {
      context.commit('setProductsLoadingStatus', true)

      try {
        const response = await axios.get(API_BASE_URL + '/api/products', {
          params: {
            page,
            limit,
            categoryId,
            minPrice,
            maxPrice
          }
        })
        context.commit('updateProductsData', response.data.items)
      } catch {
        context.commit('setProductsLoadingFailed', true)
      }
      context.commit('setProductsLoadingStatus', false)
    },

    async loadCategories (context) {
      context.commit('setFiltersLoadingStatus', true)
      try {
        const response = await axios.get(API_BASE_URL + '/api/productCategories')
        context.commit('updateCategoriesData', response.data.items)
      } catch {
        context.commit('setCategoriesLoadingDaFailed', true)
      }
      context.commit('setFiltersLoadingStatus', true)
    },
    async loadColors (context) {
      context.commit('setFiltersLoadingStatus', true)
      try {
        const response = await axios.get(API_BASE_URL + '/api/colors')
        context.commit('updateColorsData', response.data.items)
      } catch {
        context.commit('setColorsLoadingFailed', true)
      }
      context.commit('setFiltersLoadingStatus', true)
    }
  },
  getters: {
    productsLoading (state) {
      return state.productsLoading
    },
    filtersLoading (state) {
      return state.productsLoading
    },
    productsLoadingFailed (state) {
      return state.productsLoadingFailed
    },

    categoriesLoadingFailed (state) {
      return state.productsLoadingFailed
    },
    colorsLoadingFailed (state) {
      return state.productsLoadingFailed
    },
    productsData (state) {
      return state.productsData
    }
  }
}
