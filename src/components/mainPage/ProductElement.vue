<template>
  <div>
    <router-link class="catalog__pic" :to="{ name: 'product', params: {id: product.id}}">
      <img :src="currentImg"
            :alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
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
                :style="{ backgroundColor: item.color.code, boxShadow: shadow }"> </span>
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
      currentColor: this.product.colors[0].color.code,
      currentImg: this.product.colors[0].gallery[0].file.url,
      shadow: '0 0 3px 1px #666'
    }
  },
  props: ['product'],
  computed: {
    // currentImg () {
    //     if (this.product.colors[0].gallery !== null) {
    //       return this.product.colors[0].gallery[0].file.url
    //     } else {
    //       return null
    //     }
    //   }
    // }
  },
  watch: {
    currentColor (value) {
      this.product.colors.filter(item => {
        if (item.color.code === value) {
          this.currentImg = item.gallery[0].file.url
        }
      })
    }
  },
  methods: {
  },
  filters: {
    numberFormat
  }
}
</script>
