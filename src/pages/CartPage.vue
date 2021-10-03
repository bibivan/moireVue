<template>
  <BasePreloader v-if="loading"/>
  <main class="content container" v-else-if="notDeleted">
    Произошла ошибка при удалении товара. Перезагрузите страницу и попробуйте еще раз
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
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
      <span class="content__info" v-if="products.length === 1">
        {{ products.length }} товар
      </span>
      <span class="content__info" v-else-if="products.length < 5">
        {{ products.length }} товара
      </span>
      <span class="content__info" v-else>
        {{ products.length }} товаров
      </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.id" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link :to="{ name: 'order'}">
            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartItem from '@/components/cartPage/CartItem'
import numberFormat from '@/helpers/numberFormat'
import BasePreloader from '../components/base/BasePreloader'

export default {
  name: 'CartPage',
  components: {
    BasePreloader,
    CartItem
  },
  data () {
    return {
      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters({
      products: 'cartProductsData',
      totalPrice: 'cartTotalPrice',
      notDeleted: 'notDeletedFromCart',
      loading: 'cartLoading',
      loadingFailed: 'cartLoadingFailed'
    })
  },
  methods: {
    ...mapActions(['loadCart'])

  }
}
</script>
