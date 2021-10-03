<template>
  <ProductsInfoList :products="cartProductsData" :totalPrice="cartTotalPrice">
    <BaseButton title="Оформить заказ"/>
  </ProductsInfoList>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsInfoList from '@/components/orderPage/ProductsInfoList.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'OrderingProductsInfo',
  components: {
    ProductsInfoList,
    BaseButton
  },
  computed: {
    ...mapGetters(['cartProductsData', 'cartTotalPrice'])
  }
}
</script>
