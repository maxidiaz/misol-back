import Vue from 'vue'
import Config from '../config'
import debounce from 'lodash/debounce'

const restUrl = Config.restUrl

const list = debounce((cb, cbError) => {
  Vue.http.get(restUrl + '/category').then(cb)
}, 300)

const save = debounce((category, cb, cbError) => {
  Vue.http.post(restUrl + '/category', category).then(cb)
}, 300)

const update = debounce((category, cb, cbError) => {
  Vue.http.put(restUrl + '/category/' + category._id, category).then(cb)
}, 300)

const remove = debounce((id, cb, cbError) => {
  Vue.http.delete(restUrl + '/category/' + id).then(cb)
}, 300)

const findByName = debounce((name, cb, cbError) => {
  Vue.http.get(restUrl + '/category/name/' + name).then(cb)
}, 300)

export default {
  list,
  save,
  update,
  findByName,
  remove
}
