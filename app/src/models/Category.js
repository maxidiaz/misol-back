import Vue from 'vue'
import Config from '../config'

const restUrl = Config.restUrl

const list = (cb, cbError) => {
  Vue.http.get(restUrl + '/category').then(cb)
}

const save = (category, cb, cbError) => {
  Vue.http.post(restUrl + '/category', category).then(cb)
}

const update = (category, cb, cbError) => {
  Vue.http.put(restUrl + '/category/' + category._id, category).then(cb)
}

const remove = (id, cb, cbError) => {
  Vue.http.delete(restUrl + '/category/' + id).then(cb)
}

const findByName = (name, cb, cbError) => {
  Vue.http.get(restUrl + '/category/name/' + name).then(cb)
}

export default {
  list,
  save,
  update,
  findByName,
  remove
}
