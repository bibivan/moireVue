<template>
  <div id="app">
    <header class="header container">
      <div class="header__wrapper">
        <span class="header__info">Каталог</span>

        <router-link class="header__logo" :to="{ name: 'main' }">
          <img src="./assets/img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
        </router-link>

        <a class="header__tel" href="tel:8 800 600 90 09">
          8 800 600 90 09
        </a>

        <CartIndicator/>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import CartIndicator from '@/components/base/CartIndicator'

export default {
  components: { CartIndicator },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created () {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }
    this.loadCart()
  }
}
</script>

<style lang="scss">
</style>
