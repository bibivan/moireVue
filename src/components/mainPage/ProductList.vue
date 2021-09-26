<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="productItem in products" :key="productItem.title">
      <ProductElement :product="productItem"/>
    </li>
  </ul>
</template>

<script>
import ProductElement from './ProductElement'

export default {
  name: 'List',
  components: {
    ProductElement
  },
  props: ['products']
}
</script>

<style scoped>

</style>
