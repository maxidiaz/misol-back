import Vue from 'vue'
import Config from '../config'
import debounce from 'lodash/debounce'

const restUrl = Config.restUrl

const list = debounce((req, cb, cbError) => {
  Vue.http.get(restUrl + '/recent' + '?page=' + req.page).then(cb, cbError)
}, 300)

export default {
  list
}
