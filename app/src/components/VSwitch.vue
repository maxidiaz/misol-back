<template lang="html">
  <div class="switch-container" v-on:click="onSwitchClick()">
    <div class="switch-bar">
      <div class="switch-bar-bg" :class="{'active-bar': value}"></div>
    </div>
    <div class="switch-circle" :class="{'active-switch': value}"></div>
  </div>
</template>

<script>
export default {
  name:'v-switch',
  props: ['value'],
  mounted () {},
  methods: {
    onSwitchClick () {
      this.$emit('input', !this.value)
    }
  },
  components: {}
}
</script>

<style lang="css">
.switch-container {
  width: 55px;
  height: 26px;
  position: relative;
}
.switch-bar {
  width: 50px;
  height: 18px;
  background-color: #CCC;
  border: 1px solid #DDD;
  border-radius: 9px;
  position: absolute;
  top:0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}
.switch-bar-bg {
  transition: all .3s ease-in-out;
  width:0;
  height: 100%;
  background-color: #337ab7;
}
.switch-circle {
  transition: all .3s ease-in-out;
  position: absolute;
  left: -2px;
  width: 26px;
  height: 26px;
  background-color: #FFF;
  box-shadow: 0.5px 0.5px 2px #CCC, 0.5px -0.5px 2px #CCC, -0.5px 0.5px 2px #CCC, -0.5px -0.5px 2px #CCC;
  border-radius: 50%;
}

.active-switch {
  left: 26px;
}

.active-bar {
  width: 100%;
}
</style>
