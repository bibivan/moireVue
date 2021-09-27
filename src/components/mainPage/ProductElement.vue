<template>
  <div>
    <router-link class="catalog__pic" :to="{ name: 'product', params: {id: product.id, colorId: currentColorId}}">
      <img :src="currentImg"
            :alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: {id: product.id, colorId: currentColorId}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="item in product.colors" :key="item.color.code">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="item.color.code"
                 v-model="currentColor"/>
          <span class="colors__value"
                :style="{ backgroundColor: item.color.code }"> </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  data () {
    return {
      currentColor: this.product.colors[0].color.code
    }
  },
  props: ['product'],
  computed: {
    currentImg () {
      const color = this.product.colors.find(c => c.color.code === this.currentColor)
      return color && color.gallery ? color.gallery[0].file.url : 'https://i.ibb.co/XbXTCMH/no-photo.jpg'
    },
    currentColorId () {
      const color = this.product.colors.find(c => c.color.code === this.currentColor)
      return color && color.id ? color.id : ''
    }
  },
  methods: {
  },
  filters: {
    numberFormat
  }
}
</script>

<style>
  .colors__value {
    box-shadow: 0 0 3px 1px #666;
  }
</style>
