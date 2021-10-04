<template>
  <BasePreloader v-if="loading"/>
  <main class="content container" v-else-if="orderLoadingFailed">
    <p>{{ orderLoadingFailed }}</p>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'order' }">
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">

        <ClientInfo :orderInfo="orderInfo"/>

        <ProductsInfoList :products="orderInfo.basket.items" :totalPrice="orderInfo.totalPrice"
                          :delivery="deliveryInfo">
        </ProductsInfoList>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClientInfo from '../components/order/ClientInfo.vue'
import ProductsInfoList from '@/components/order/ProductsInfoList.vue'
import BasePreloader from '../components/base/BasePreloader'

export default {
  name: 'OrderInfoPage',
  components: {
    ClientInfo,
    ProductsInfoList,
    BasePreloader
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['orderInfo', 'orderLoadingFailed']),
    deliveryInfo () {
      return this.orderInfo.deliveryType ? this.orderInfo.deliveryType : 'Не обнаружен'
    }
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
    async loadOrder () {
      this.loading = true
      if (this.orderInfo && this.orderInfo.id === +this.$route.params.id) {
        this.loading = false
        return
      }
      await this.loadOrderInfo(this.$route.params.id)
      this.loading = false
    }
  },
  created () {
    this.loadOrder()
  }
}
</script>
