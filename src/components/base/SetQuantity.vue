<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
            @click.prevent="changeQuantity(false)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentQuantity">

    <button type="button" aria-label="Добавить один товар"
            @click.prevent="changeQuantity(true)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SetQuantity',
  props: ['quantity'],
  data () {
    return {
      currentQuantity: this.quantity
    }
  },
  methods: {
    changeQuantity (up) {
      up ? this.currentQuantity++ : this.currentQuantity--
      if (this.currentQuantity <= 1) this.currentQuantity = 1
      this.$emit('update:quantity', this.currentQuantity)
      this.$emit('sendChanges')
    }
  }
}
</script>
