<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="img" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ backgroundColor: color.code }"></i>
        {{ color.title }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <setQuantity :quantity.sync="item.quantity"/>

    <b class="product__price">
      {{ (item.product.price * item.quantity) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import SetQuantity from '@/components/base/SetQuantity'
import { spareImg } from '@/config'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'CartItem',
  props: ['item'],
  components: { SetQuantity },
  filters: {
    numberFormat
  },
  computed: {
    color () {
      return this.item.color.color
    },
    img () {
      return this.item.color.gallery ? this.item.color.gallery[0].file.url : spareImg
    }
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteProductFromCart' })
  }
}
</script>
