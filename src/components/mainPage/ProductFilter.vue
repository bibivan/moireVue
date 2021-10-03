<template>
  <div class="preloader" v-if="loading">
    <div class="preloader__spinner"></div>
  </div>
  <form class="filter__form form" action="#" method="get" @submit.prevent="submit" v-else>
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" value="0" v-model.number="currentFilters.priceFrom">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" value="12345" v-model.number="currentFilters.priceTo">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <div class="loading-error" v-if="categoriesLoadingFailed">
        {{ categoriesLoadingFailed }}
      </div>
      <label class="form__label form__label--select" v-else>
        <select
          class="form__select"
          type="text"
          name="category"
          v-model.number="currentFilters.categoryId"
        >
          <option value="0">Все категории</option>
          <option :value="category.id" v-for="category in categoriesData" :key="category.id">
            {{ category.title }}
          </option>
        </select>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ul class="colors colors--black">
        <li class="colors__item" v-for="colorItem in colorsData" :key="colorItem.id">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="checkbox"
              name="color"
              :value="colorItem.id"
              v-model="currentFilters.colors"
            />
            <span class="colors__value" :style="{ backgroundColor: colorItem.code }"> </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Материал</legend>
      <div class="loading-error" v-if="materialsLoadingFailed">
        {{ materialsLoadingFailed }}
      </div>
      <ul class="check-list" v-else>
        <li class="check-list__item" v-for="material in materialsData" :key="material.id">
          <label class="check-list__label">
            <input class="check-list__check sr-only"
                   type="checkbox"
                   name="material"
                   :value="material.id"
                   v-model="currentFilters.materials">
            <span class="check-list__desc">
                    {{ material.title }}
                    <span>({{ material.productsCount }})</span>
                  </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Коллекция</legend>
      <div class="loading-error" v-if="seasonsLoadingFailed">
        {{ seasonsLoadingFailed }}
      </div>
      <ul class="check-list" v-else>
        <li class="check-list__item" v-for="season in seasonsData" :key="season.id">
          <label class="check-list__label">
            <input class="check-list__check sr-only"
                   type="checkbox"
                   name="collection"
                   :value="season.id"
                   v-model="currentFilters.seasons">
            <span class="check-list__desc">
                    {{ season.title }}
                    <span>({{ season.productsCount }})</span>
                  </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button
      v-show="checkCurrentFilters"
      class="filter__reset button button--second"
      type="button"
      @click.prevent="reset"
    >
      Сбросить
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'ProductFilter',
  props: ['filters'],
  data () {
    return {
      loading: false,
      currentFilters: {
        priceFrom: this.filters.priceFrom || 0,
        priceTo: this.filters.priceTo || 0,
        categoryId: this.filters.categoryId,
        colors: this.filters.colors || [],
        materials: this.filters.materials || [],
        seasons: this.filters.seasons || []
      }
    }
  },
  computed: {
    ...mapGetters([
      'categoriesLoadingFailed',
      'colorsLoadingFailed',
      'materialsLoadingFailed',
      'seasonsLoadingFailed',
      'categoriesData',
      'colorsData',
      'materialsData',
      'seasonsData'
    ]),
    emptyFilterProps () {
      return {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colors: [],
        materials: [],
        seasons: []
      }
    },
    checkCurrentFilters () {
      return !_.isEqual(this.emptyFilterProps, this.currentFilters)
    }
  },
  methods: {
    submit () {
      this.$emit('update:filters', { ...this.currentFilters })
    },
    reset () {
      this.$emit('update:filters', { ...this.emptyFilterProps })
      if (window.location.hash.length > 2) {
        this.$router.replace({ path: '/' })
      }
    }
  },
  watch: {
    filters (value) {
      this.currentFilters = value
    },
    '$route.params' () {
      if (!this.$route.params.categoryId) {
        this.reset()
      }
    }
  }
}
</script>

<style scoped>
.loading-error {
  color: red;
}
</style>
