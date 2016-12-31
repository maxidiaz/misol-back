import Vue from 'vue'
import Config from '../config'

const restUrl = Config.restUrl

const list = (criteria, cb, cbError) => {
  let endPoint = '/order'
  if (criteria && criteria.noDone) {
    endPoint += '?noDone=true'
  }
  Vue.http.get(restUrl + endPoint).then(cb)
}

const listByDate = (params, cb, cbError) => {
  Vue.http.get(restUrl + '/order/date/' + params.date + '?status=' + params.status).then(cb)
}

const save = (order, cb, cbError) => {
  Vue.http.post(restUrl + '/order', order).then(cb)
}

const find = (id, cb, cbError) => {
  Vue.http.get(restUrl + '/order/' + id).then(cb)
}

const update = (order, cb, cbError) => {
  Vue.http.put(restUrl + '/order', order).then(cb)
}

export default {
  list,
  save,
  find,
  update,
  listByDate
}
