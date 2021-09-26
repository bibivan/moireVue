<template>
  <div class="preloader" v-if="loading">
    <div class="preloader__spinner"></div>
  </div>
  <form class="filter__form form" action="#" method="get" @submit.prevent="submit" v-else>
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" value="0" v-model.number="currentPriceFrom">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" value="12345" v-model.number="currentPriceTo">
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
          v-model.number="currentCategoryId"
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
              :value="colorItem.code"
              @change="toggleValue(colorItem.id, currentColors)"
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
                   :value="material.code"
                   @change="toggleValue(material.id, currentMaterials)">
            <span class="check-list__desc">
                    {{ material.title }}
                    <span>(3)</span>
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
                   value="лето"
                   @change="toggleValue(season.id, currentSeasons)">
            <span class="check-list__desc">
                    {{ season.title }}
                    <span>(2)</span>
                  </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="button" @click.prevent="reset">
      Сбросить
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'colors', 'materials', 'seasons'],
  data () {
    return {
      loading: false,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColors: [],
      currentMaterials: [],
      currentSeasons: []
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
    ])
  },
  methods: {
    submit () {
      this.$emit('update:priceFrom', this.currentPriceFrom)
      this.$emit('update:priceTo', this.currentPriceTo)
      this.$emit('update:categoryId', this.currentCategoryId)
      this.$emit('update:colors', this.currentColors)
      this.$emit('update:materials', this.currentMaterials)
      this.$emit('update:seasons', this.currentSeasons)
    },
    reset () {
      this.$emit('update:priceFrom', 0)
      this.$emit('update:priceTo', 0)
      this.$emit('update:categoryId', 0)
      this.$emit('update:colors', [])
      this.$emit('update:materials', [])
      this.$emit('update:seasons', [])
      this.$router.push({ path: '/' })
    },
    toggleValue (value, arr) {
      if (arr.includes(value)) {
        const index = arr.indexOf(value)
        arr.splice(index, 1)
      } else {
        arr.push(value)
      }
    }
  },
  watch: {
    priceFrom (value) {
      this.currentPriceFrom = value
    },
    priceTo (value) {
      this.currentPriceTo = value
    },
    categoryId (value) {
      this.currentCategoryId = value
    },
    colors (value) {
      this.currentColors = value
    },
    materials (value) {
      this.currentMaterials = value
    },
    seasons (value) {
      this.currentSeasons = value
    }
  }
}
</script>

<style scoped>
  .loading-error {
    color: red;
  }
</style>
