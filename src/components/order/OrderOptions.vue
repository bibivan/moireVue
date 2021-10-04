<template>
  <div class="wrapper">
    <h3 class="cart__title">{{title}}</h3>
    <ul class="cart__options options" v-if="!failed">
      <li class="options__item" v-for="item in data" :key="item.title">
        <label class="options__label">
          <input class="options__radio sr-only" type="radio"
                 name="delivery" :value="item.id" v-model="currentValue">
          <span class="options__value">
            {{ item.title }} <b v-if="item.price">{{ item.price === 0 ? 'бесплатно' : item.price }}</b>
          </span>
          <span class="form__error" v-if="error">{{ error }}</span>
        </label>
      </li>
    </ul>
    <div class="error" v-else-if="failed">
      {{ failed }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartOptions',
  props: ['title', 'data', 'error', 'failed', 'value'],
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.wrapper {
  margin-bottom: 40px;
}
</style>
