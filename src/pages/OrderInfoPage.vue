<template>
  <main class="content container" v-if="loading">
    <div class="preloader">
      <div class="preloader__spinner"></div>
    </div>
  </main>
  <main class="content container" v-else-if="loadingFailed">
    <p>Произошла ошибка при загрузке</p>
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

<!--        <ClientInfo :orderInfo="orderInfo"/>-->

<!--        <OrderedProductsInfo :orderInfo="orderInfo"/>-->
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
// import OrderedProductsInfo from '@/components/oderInfoPage/OrderedProductsInfo.vue'
// import ClientInfo from '@/components/oderInfoPage/ClientInfo.vue'

export default {
  name: 'OrderInfoPage',
  components: {
    // ClientInfo,
    // OrderedProductsInfo
  },
  data () {
    return {
      loading: false,
      loadingFailed: false
    }
  },
  computed: {
    ...mapGetters({
      orderInfo: 'orderDetailProducts'
    })
  },
  created () {
    this.loading = true
    this.loadingFailed = false
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === +this.$route.params.id) {
      this.loading = false
      return
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id).catch(() => {
      this.loadingFailed = true
    }).then(() => {
      this.loading = false
    })
  }
}
</script>
