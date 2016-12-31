<template lang="html">
  <div v-if="show" class="backgroundFaded">
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pop-up-window',
  props: ['show'],
  data () {
    return {
      showWindow: false
    }
  },
  methods: {},
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
  z-index: 1000;
  background: rgba(0,0,0,0.5);
}
.window-content {
  height: 100%;
  min-height: 100%;
  width:100%;
  background-color: #FFF;
  border-radius: 10px;
  position: relative;
}
</style>
