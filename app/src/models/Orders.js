import Vue from 'vue'
import Config from '../config'
import debounce from 'lodash/debounce'

const restUrl = Config.restUrl

const list = debounce((criteria, cb, cbError) => {
  let endPoint = '/order'
  if (criteria && criteria.noDone) {
    endPoint += '?noDone=true'
  }
  Vue.http.get(restUrl + endPoint).then(cb, cbError)
}, 300)

const listByDate = debounce((params, cb, cbError) => {
  Vue.http.get(restUrl + '/order/date/' + params.date + '?status=' + params.status).then(cb, cbError)
}, 300)

const save = debounce((order, cb, cbError) => {
  order.deliveredBy = {}
  Vue.http.post(restUrl + '/order', order).then(cb, cbError)
}, 300)

const find = debounce((id, cb, cbError) => {
  Vue.http.get(restUrl + '/order/' + id).then(cb, cbError)
}, 300)

const update = debounce((order, cb, cbError) => {
  Vue.http.put(restUrl + '/order', order).then(cb, cbError)
}, 300)

const remove = debounce((order, cb, cbError) => {
  Vue.http.delete(restUrl + '/order/' + order._id).then(cb, cbError)
}, 300)

export default {
  list,
  save,
  find,
  update,
  listByDate,
  remove
}
