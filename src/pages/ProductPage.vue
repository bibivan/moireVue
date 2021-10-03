<template>
  <BasePreloader class="content container" v-if="pageLoading"/>
  <NotFoundPage v-else-if="productLoadingFailed">
    {{ productLoadingFailed }}
  </NotFoundPage>
  <main class="content container" v-else-if="notAddedToCart">
    {{ notAddedToCart }}.
    Перезагрузите страницу и попробуйте еще раз
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
          <router-link
            class="breadcrumbs__link"
            :to="{ name: 'filter', params: {category: productItem.category.slug, categoryId: productItem.category.id} }"
          >
            {{ productItem.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"
                       :to="{ params: {category: productItem.category.slug, categoryId: productItem.category.id} }">
            {{ productItem.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="currentImg"
               :alt="productItem.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item"
              v-for="(pic, index) in currentColorItem.gallery"
              :key="pic.file.name">
            <router-link
              class="pics__link"
              :class="{ 'pics__link--current': currentImg === pic.file.url }"
              :to="{ params: {category: productItem.category.slug, categoryId: productItem.category.id} }">
              <img
                width="98"
                height="98"
                :src="pic.file.url"
                :alt="currentColorItem.color.title"
                @change="changeGalleryItem(index)"
              >
            </router-link>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productItem.id }}</span>
        <h2 class="item__title">
          {{ productItem.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addingToCart">
            <div class="item__row item__row--center">
              <SetQuantity :quantity.sync="productQuantity"/>

              <b class="item__price">
                {{ productItem.price | numberFormat }}
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="item in productItem.colors" :key="item.color.code">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        :value="item.id"
                        v-model="currentColorId"
                      >
                      <span class="colors__value" :style="{ backgroundColor: item.color.code }">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>
              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model.number="currentSize">
                    <option :value="size.id"
                            v-for="size in productItem.sizes"
                            :key="size.title">
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              <BasePreloader v-show="productAddSending"/>
              <span :class="{ hidden: productAddSending }">
                В корзину
              </span>
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item" v-for="(title, index) in tabTitles" :key="title">
            <a
              class="tabs__link"
              :class="{ 'tabs__link--current': index === currentTab }"
              @click.prevent="changeTab(index)"
              href="#">
              {{ title }}
            </a>
          </li>
        </ul>

        <div class="item__content">
          {{ currentTab === 0 ? productDescription : deliveryInfo}}
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NotFoundPage from './NotFoundPage'
import BasePreloader from '@/components/base/BasePreloader'
import SetQuantity from '@/components/base/SetQuantity'
import { spareImg } from '@/config'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'ProductPage',
  components: {
    SetQuantity,
    NotFoundPage,
    BasePreloader
  },
  data () {
    return {
      pageLoading: false,
      productAddSending: false,
      productAdded: false,
      galleryItem: 0,
      productQuantity: 1,
      currentColorId: +this.$route.params.colorId,
      currentTab: 0,
      tabTitles: ['Информация о товаре', 'Доставка и возврат'],
      deliveryInfo: 'В скором времени сюда добавят информацию о доставке и возврате товара'
    }
  },
  computed: {
    ...mapGetters([
      'productLoadingFailed',
      'productItem',
      'notAddedToCart'
    ]),
    currentColorItem () {
      const color = this.productItem.colors.find(c => c.id === this.currentColorId)
      return color && color.gallery ? color : []
    },
    currentImg () {
      return this.currentColorItem ? this.currentColorItem.gallery[this.galleryItem].file.url : spareImg
    },
    currentSize () {
      return this.productItem ? this.productItem.sizes[0].id : ''
    },
    productDescription () {
      return this.productItem.content ? this.productItem.content : 'В скором времени сюда добавят описание товара'
    },
    productParams () {
      return {
        productId: this.productItem.id,
        colorId: this.currentColorItem.color.id,
        sizeId: this.currentSize,
        quantity: this.productQuantity
      }
    }
  },
  methods: {
    ...mapActions(['loadProductItem', 'addProductToCart']),
    changeGalleryItem (value) {
      this.galleryItem = value
    },
    changeTab (value) {
      this.currentTab = value
    },
    async addingToCart () {
      this.productAddSending = true
      await this.addProductToCart(this.productParams).then(() => {
        this.productAddSending = false
      })
    }
  },
  watch: {
    '$route.params.id': {
      handler () {
        this.pageLoading = true
        this.loadProductItem(+this.$route.params.id).then(() => {
          this.pageLoading = false
        })
      },
      immediate: true
    },
    currentColorId (value) {
      this.$router.replace({ params: { colorId: value } })
    }
  },
  filters: {
    numberFormat
  }
}
</script>

<style>

</style>
