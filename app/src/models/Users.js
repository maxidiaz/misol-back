import Vue from 'vue'
import Config from '../config'
import debounce from 'lodash/debounce'

const restUrl = Config.restUrl

const uploadFile = debounce((data, cb, cbError) => {
  Vue.http.post(restUrl + '/imageUpload', data).then(cb, cbError)
}, 300)

export default {
  uploadFile,
}
