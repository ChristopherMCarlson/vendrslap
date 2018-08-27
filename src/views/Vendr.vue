<template>
  <div class="vendr">
    <h1>Hello {{machine.name}}</h1>
    <div class="display">
      <div v-for="(value, key) in machine.items"><img :src="value.imgUrl" alt="" class="product" @click="buy(value.id)">
        <h3>{{value.name}}</h3>
        <h4>Price: {{value.price}}</h4>
        <h4>Stock: {{value.stock}}</h4>
      </div>
    </div>
    <div class="on-hand-cash">
      <h2>Input {{machine.cash}}</h2>
    </div>
    <div class="cash-buttons">
      <button v-for="(value, key) in machine.addCash" :key="key" @click="addCash(value.value)">{{value.value}}</button>
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

  .display {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>