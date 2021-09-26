<template>

  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }}
        </span>
      </div>
    </div>
    <div class="content__catalog">
      <aside class="filter">
        <ProductFilter
          :price-from.sync="filterPriceFrom"
          :priceTo.sync="filterPriceTo"
          :category-id.sync="filterCategoryId"
          :colors.sync="filterColors"
          :materials.sync="filterMaterials"
          :seasons.sync="filterSeasons"
        />
      </aside>
      <section class="catalog">
        <div class="catalog__list preloader" v-if="productsLoading">
            <div class="preloader__spinner"></div>
        </div>
        <div class="catalog__list" v-else-if="productsLoadingFailed">
          {{ productsLoadingFailed }}
        </div>
        <ProductList :products="productsData.items" v-else/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductList from '@/components/mainPage/ProductList'
import ProductFilter from '@/components/mainPage/ProductFilter'
import BasePagination from '@/components/base/BasePagination'

export default {
  name: 'MainPage',
  components: {
    ProductList,
    ProductFilter,
    BasePagination
  },
  data () {
    return {
      page: 1,
      productsPerPage: 14,
      filterPriceFrom: '',
      filterPriceTo: '',
      filterCategoryId: '',
      filterColors: [],
      filterMaterials: [],
      filterSeasons: []
    }
  },
  computed: {
    ...mapGetters([
      'productsLoading',
      'productsLoadingFailed',
      'productsData'
    ]),
    countProducts () {
      return this.productsData.pagination ? this.productsData.pagination.total : 0
    },
    params () {
      return {
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo,
        categoryId: this.filterCategoryId,
        colorIds: this.filterColors,
        materialIds: this.filterMaterials,
        seasonIds: this.filterSeasons
      }
    }
  },
  methods: {
    ...mapActions([
      'loadProducts',
      'loadCategories',
      'loadColors',
      'loadSeasons',
      'loadMaterials'
    ]),
    async loadFiltersData () {
      await this.loadCategories()
      await this.loadColors()
      await this.loadMaterials()
      await this.loadSeasons()
    }

  },
  watch: {
    page () {
      this.loadProducts(this.params)
    },
    productsPerPage () {
      this.loadProducts(this.params)
    },
    filterPriceFrom () {
      this.loadProducts(this.params)
    },
    filterPriceTo () {
      this.loadProducts(this.params)
    },
    filterCategoryId () {
      this.loadProducts(this.params)
    },
    filterColors () {
      this.loadProducts(this.params)
    },
    filterMaterials () {
      this.loadProducts(this.params)
    },
    filterSeasons () {
      this.loadProducts(this.params)
    },
    $route () {
      this.filterCategoryId = this.$route.params.categoryId
    }
  },
  created () {
    this.loadFiltersData()
    if (this.$route.params.categoryId) {
      this.filterCategoryId = this.$route.params.categoryId
    }
    this.loadProducts(this.params)
  }
}
</script>

<style scoped>
</style>
