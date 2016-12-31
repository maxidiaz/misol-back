import Vue from 'vue'
import $ from 'jquery'

const autogrow = Vue.directive('autogrow', {
  bind: function (el, binding, vnode) {
    const $el = $(el)
    $el.on('input', function () {
      this.style.height = 'auto'
      this.style.height = (this.scrollHeight) + 'px'
    })
  },
  inserted: function (el) {
    const $el = $(el)
    $el.css('height', el.scrollHeight + 'px')
    $el.css('overflow-y', 'hidden')
  }
})

export default autogrow
