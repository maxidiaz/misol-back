<template lang="html">
  <div v-if="show" class="backgroundFaded">
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'pop-up-window',
  props: ['show'],
  data () {
    return {
      showWindow: false
    }
  },
  watch: {
    show (val) {
      $(document.body).toggleClass('modal-open', val)
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="css" scoped>
.backgroundFaded {
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 20px;
  z-index: 10000;
  height: 100vh;
  overflow: hidden;
  background: rgba(0,0,0,0.5);
}
.window-content {
  height: 90vh;
  overflow: hidden;
  min-height: 100%;
  width:100%;
  background-color: #FFF;
  border-radius: 10px;
  position: relative;
  z-index: 10010;
}
</style>
