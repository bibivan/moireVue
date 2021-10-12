<template>
  <BasePreloader v-if="loading"/>
  <NotFoundPage v-else-if="orderLoadingFailed">
    {{ orderLoadingFailed }}
    <span v-if="orderNotExist">{{ orderNotExist }}</span>
  </NotFoundPage>
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
import NotFoundPage from './NotFoundPage'

export default {
  name: 'OrderInfoPage',
  components: {
    NotFoundPage,
    ClientInfo,
    ProductsInfoList,
    BasePreloader
  },
  data () {
    return {
      loading: false,
      orderNotExist: false
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
      let response

      this.loading = true
      if (this.orderInfo && this.orderInfo.id === +this.$route.params.id) {
        this.loading = false
        return
      }
      try {
        response = await this.loadOrderInfo(this.$route.params.id)
        return response
      } catch (e) {
        if (e.message === 'Request failed with status code 400') {
          this.orderNotExist = 'Вероятно, такого заказа не существует'
        }
      }
      this.loading = false
    }
  },
  created () {
    this.loadOrder()
  }
}
</script>
