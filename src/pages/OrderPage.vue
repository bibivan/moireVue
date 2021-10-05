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
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'order' }">
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО"
                          :error="formError.name"
                          v-model="formData.name"
                          placeholder="Введите ваше полное имя"/>

            <BaseFormText title="Адрес доставки"
                          :error="formError.address"
                          v-model="formData.address"
                          placeholder="Введите ваш адрес"/>

            <BaseFormText title="Телефон"
                          :error="formError.phone"
                          v-model="formData.phone"
                          type="tel"
                          placeholder="Введите ваш телефон"/>

            <BaseFormText title="Email"
                          :error="formError.email"
                          v-model="formData.email"
                          type="email"
                          placeholder="Введите ваш Email"/>

            <BaseFormTextarea title="Комментарий к заказу"
                              :error="formError.comment"
                              v-model="formData.comment"
                              placeholder="Ваши пожелания">
            </BaseFormTextarea>

          </div>

          <div class="cart__options">
            <OrderOptions title="Доставка"
                         :error="formError.deliveryTypeId"
                         v-model="formData.deliveryTypeId"
                         :data="deliveriesData"
                         :failed="deliveriesLoadingFailed"/>

            <OrderOptions title="Оплата"
                         :error="formError.paymentTypeId"
                         v-model="formData.paymentTypeId"
                         :data="paymentsData"
                         :failed="paymentsLoadingFailed"/>
          </div>
        </div>

        <ProductsInfoList :products="cartProductsData" :totalPrice="cartTotalPrice"
                          :delivery="deliveryInfo">
          <BaseButton title="Оформить заказ"/>
        </ProductsInfoList>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseFormText from '@/components/base/BaseFormText.vue'
import BaseFormTextarea from '@/components/base/BaseFormTextarea.vue'
import OrderOptions from '../components/order/OrderOptions'
import BaseButton from '@/components/base/BaseButton.vue'
import ProductsInfoList from '@/components/order/ProductsInfoList.vue'

export default {
  name: 'OrderPage',
  components: {
    BaseFormText,
    BaseFormTextarea,
    BaseButton,
    OrderOptions,
    ProductsInfoList
  },
  data () {
    return {
      formData: {},
      formError: {},
      formErrorMessage: ''
    }
  },
  computed: {
    ...mapGetters([
      'deliveriesLoadingFailed',
      'deliveriesData',
      'paymentsLoadingFailed',
      'paymentsData',
      'cartProductsData',
      'cartTotalPrice'
    ]),
    deliveryInfo () {
      let info
      if (this.formData.deliveryTypeId && this.deliveriesData) {
        info = {
          ...this.deliveriesData[this.formData.deliveryTypeId - 1]
        }
      } else {
        info = 'Не выбрано'
      }
      return info
    }
  },
  methods: {
    ...mapActions(['orderProducts', 'loadDeliveries', 'loadPayments']),
    async order () {
      this.formError = {}
      this.formErrorMessage = ''
      try {
        const response = await this.orderProducts(this.formData)
        this.$router.push({
          name: 'orderInfo',
          params: { id: response.data.id }
        })
      } catch (error) {
        this.formError = error.response.data.error.request || {}
        this.formErrorMessage = error.response.data.error.message
      }
    }
  },
  created () {
    this.loadDeliveries()
    this.loadPayments()
  }
}
</script>
