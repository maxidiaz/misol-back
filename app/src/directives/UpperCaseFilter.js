import Utils from '../utils/Utils'
import Vue from 'vue'

const filter = Vue.filter('upperCaseFirst', function (value) {
  return Utils.upperCaseFirstLetter(value.split('-').join(' '))
})

export default filter
