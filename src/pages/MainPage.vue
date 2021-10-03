<template>

  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info" v-if="countProducts === 1">
        {{countProducts}} товар
      </span>
        <span class="content__info" v-else-if="countProducts < 5">
        {{countProducts}} товара
      </span>
        <span class="content__info" v-else>
        {{countProducts}} товаров
      </span>
      </div>
    </div>
    <div class="content__catalog">
      <aside class="filter" v-show="!productsLoadingFailed">
        <ProductFilter
          :filters.sync="filters"
        />
      </aside>
      <section class="catalog">
        <BasePreloader class="catalog__list" v-if="productsLoading"/>
        <NotFoundPage class="catalog__list" v-else-if="productsLoadingFailed">
          {{ productsLoadingFailed }}
        </NotFoundPage>
        <ProductList :products="productsData.items" v-else/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotFoundPage from './NotFoundPage'
import ProductList from '@/components/mainPage/ProductList'
import ProductFilter from '@/components/mainPage/ProductFilter'
import BasePagination from '@/components/base/BasePagination'
import BasePreloader from '@/components/base/BasePreloader'

export default {
  name: 'MainPage',
  components: {
    NotFoundPage,
    BasePreloader,
    ProductList,
    ProductFilter,
    BasePagination
  },
  data () {
    return {
      page: 1,
      productsPerPage: 14,
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colors: [],
        materials: [],
        seasons: []
      }
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
        minPrice: this.filters.priceFrom,
        maxPrice: this.filters.priceTo,
        categoryId: this.filters.categoryId,
        colorIds: this.filters.colors,
        materialIds: this.filters.materials,
        seasonIds: this.filters.seasons
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
    filters () {
    },
    params () {
      this.loadProducts(this.params)
    },
    $route () {
      this.filters.categoryId = this.$route.params.categoryId
    }
  },
  created () {
    this.loadFiltersData()
    if (this.$route.params.categoryId) {
      this.filters.categoryId = this.$route.params.categoryId
    }
    this.loadProducts(this.params)
  }
}
</script>

<style scoped>
</style>
