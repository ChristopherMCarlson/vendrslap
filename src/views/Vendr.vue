<template>
  <div class="vendr">
    <h1>Hello {{machine.name}}</h1>
    <img :src="value.imgUrl" alt="" v-for="(value, key) in machine.items" :key="key" class="product" @click="buy(value.id)" :class="">
    <div class="on-hand-cash">
      <h2>Input {{machine.cash}}</h2>
    </div>
    <div class="cash-buttons">
      <button v-for="(value, key) in machine.addCash" @click="" :key="key" @click="addCash(value.value)">{{value.value}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      addCash(val) {
        this.$store.dispatch("addCash", val)
      },
      buy(id) {
        this.$store.dispatch('buy', id)
      },
    },
    computed: {
      machine() {
        return this.$store.state.machine;
      },
      outOfStock() {
        return this.$store.state.machine.items.value.stock <= 0
      }
    }
  };
</script>

<style>
  .product {
    height: 250px;
    margin: 0 1% 0 1%;
  }
</style>