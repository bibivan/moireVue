<template>
  <div class="cart__field">
    <p class="cart__message">
      Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями
      заказа.
      Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
    </p>

    <ul class="dictionary">
      <li class="dictionary__item">
        <span class="dictionary__key">Получатель</span>
        <span class="dictionary__value">{{ orderInfo.name }}</span>
      </li>
      <li class="dictionary__item">
        <span class="dictionary__key">Адрес</span>
        <span class="dictionary__value">{{ orderInfo.address }}</span>
      </li>
      <li class="dictionary__item">
        <span class="dictionary__key">Телефон</span>
        <span class="dictionary__value">{{ orderInfo.phone }}</span>
      </li>
      <li class="dictionary__item">
        <span class="dictionary__key">Email</span>
        <span class="dictionary__value">{{ orderInfo.email }}</span>
      </li>
      <li class="dictionary__item">
        <span class="dictionary__key">Способ</span>
        <span class="dictionary__value">картой при получении</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ClientInfo',
  props: ['orderInfo'],
};
</script>
