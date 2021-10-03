<template>
  <button class="cart__button button button--primery">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    title: {
      default: 'Отправить'
    },
    type: {
      default: 'submit'
    }
  }
}
</script>
