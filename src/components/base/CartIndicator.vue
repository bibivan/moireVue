<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="preloader__spinner"
          :style="styles"
          aria-label="Количество товаров"
          v-if="cartLoading">
    </span>
    <span class="header__count" aria-label="Количество товаров"
          v-if="cartLoadingFailed">
      &#10006;
    </span>
    <span class="header__count" aria-label="Количество товаров"
          v-show="cartProductsData.length > 0">
      {{cartProductsData.length}}
    </span>
  </router-link>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'CartIndicator',
  data () {
    return {
      styles: {
        right: '0%',
        border: '2px solid #E02D71',
        borderLeftColor: 'transparent',
        width: '13px',
        height: '13px'
      }
    }
  },
  computed: {
    ...mapGetters(['cartLoading', 'cartLoadingFailed', 'cartProductsData'])
  },
  methods: {
  },
  created () {
  }
}
</script>

<style>
</style>
