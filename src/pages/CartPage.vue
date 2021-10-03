<template>
  <main class="content container">
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
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartItem from '@/components/cartPage/CartItem'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'CartPage',
  components: { CartItem },
  data () {
    return {
      cartProductsCount: 0,
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
      notDeleted: 'notDeletedFromCart'
    })
  },
  methods: {
    ...mapActions(['loadCart']),
    showLoading () {
      this.productsLoading = true
      this.loadCart().then(() => {
        this.productsLoading = false
      })
    }
  },
  created () {
    this.showLoading()
  }
}
</script>
