<template>
  <main class="content container" v-if="productsLoading"> Это преолодер </main>
  <main class="content container" v-else-if="productsLoadingFailed"> Это ошибка </main>
  <main class="content container" v-else>
    <List :products="productsData"/>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import List from '@/components/mainPage/ProductList'

export default {
  name: 'MainPage',
  components: {
    List
  },
  computed: {
    ...mapGetters(['productsLoading', 'productsLoadingFailed', 'productsData'])
  },
  methods: {
    ...mapActions(['loadProducts'])
  },
  created () {
    this.loadProducts()
  }
}
</script>

<style scoped>

</style>
