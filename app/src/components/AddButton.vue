<template>
  <transition name="fadebtn">
    <div v-show="showAddButton" v-on:click="dispatchClickEvent" v-on:touchstart="touchStart" v-on:touchend="touchEnd" v-on:mousedown="touchStart" v-on:mouseup="touchEnd" class="add-button" :class="{touchstart: isTouching}">
      <span>+</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'add-button',
  data () {
    return {
      isTouching: false,
      showAddButton: false
    }
  },
  mounted () {
    let self = this
    window.setTimeout(function () {
      self.showAddButton = true
    }, 250)
  },
  methods: {
    dispatchClickEvent () {
      this.$emit('click')
    },
    touchStart () {
      this.isTouching = true
    },
    touchEnd () {
      this.isTouching = false
    }
  }
}
</script>



<style>
.add-button {
  width: 60px;
  height: 60px;
  background: #04B;
  border-radius: 50%;
  box-shadow: 3px 4px 5px #777;
  z-index: 100;
}

.touchstart {
  background: #03A;
  box-shadow: 2px 3px 5px #777;
}

.add-button span {
  user-select: none;
  font-size: 60px;
  color: #FFF;
  line-height: 60px;
  font-family: serif;
}
.fadebtn-enter-active, .fadebtn-leave-active {
  transition: opacity .6s
}
.fadebtn-enter, .fadebtn-leave-active {
  opacity: 0
}
</style>
