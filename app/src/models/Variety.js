import Vue from 'vue'
import Config from '../config'
import debounce from 'lodash/debounce'

const restUrl = Config.restUrl

const list = debounce((cb, cbError) => {
  Vue.http.get(restUrl + '/variety').then(cb, cbError)
}, 300)

const listBy = debounce((filter, cb, cbError) => {
  Vue.http.get(restUrl + '/variety?filterBy=' + filter).then(cb, cbError)
}, 300)

const save = debounce((variety, cb, cbError) => {
  Vue.http.post(restUrl + '/variety', variety).then(cb, cbError)
}, 300)

const remove = debounce((id, cb, cbError) => {
  Vue.http.delete(restUrl + '/variety/' + id).then(cb, cbError)
}, 300)

export default {
  list,
  listBy,
  save,
  remove
}
