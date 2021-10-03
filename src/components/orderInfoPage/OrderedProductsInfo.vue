<template>
  <ProductsInfoList :products="orderInfo.basket.items" :totalPrice="orderInfo.totalPrice"/>
</template>

<script>
import ProductsInfoList from '@/components/ProductsInfoList.vue'

export default {
  name: 'OrderedProductsInfo',
  components: { ProductsInfoList },
  props: ['orderInfo']
}
</script>
