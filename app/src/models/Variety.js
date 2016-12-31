import Vue from 'vue'
import Config from '../config'

const restUrl = Config.restUrl

const list = (cb, cbError) => {
  Vue.http.get(restUrl + '/variety').then(cb)
}

const listBy = (filter, cb, cbError) => {
  Vue.http.get(restUrl + '/variety?filterBy=' + filter).then(cb)
}

const save = (variety, cb, cbError) => {
  Vue.http.post(restUrl + '/variety', variety).then(cb)
}

const remove = (id, cb, cbError) => {
  Vue.http.delete(restUrl + '/variety/' + id).then(cb)
}

export default {
  list,
  listBy,
  save,
  remove
}
