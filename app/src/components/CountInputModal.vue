<template lang="html">
  <div class="backgroundFaded">
    <div class="window-content">
      <template v-for="quantity in quantities">
        <div class="card" v-on:click="selectQuantity(quantity)">
          <span class="quantity"><a>{{quantity >= 12 ? quantity / 12 + ' docenas' : quantity + ' unidades' }}</a></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'count-input-modal',
  props: ['currentVariety'],
  data () {
    return {
      quantities: config.sandwichQuantity
    }
  },
  methods: {
    selectQuantity (quantity) {
      this.currentVariety.count = quantity
      this.$emit('quantitySelected', this.currentVariety)
    }
  },
  components: {}
}
</script>

<style lang="css" scoped>
.backgroundFaded {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 20px;
  background: rgba(0,0,0,0.5);
  z-index: 9999
}
.window-content {
  padding: 16px;
  background-color: #FFF;
  max-height: 100%;
  z-index: 999999999;
  overflow-y: scroll;
  border-radius: 5px;
}
.quantity {
  font-size: 18px;
}
</style>
