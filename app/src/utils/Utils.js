import config from '../config'
import Vue from 'vue'

const toCamelCase = (value) => {
  const ucc = toUpperCamelCase(value)
  return ucc[0].toLowerCase() + ucc.substring(1)
}

const upperCaseFirstLetter = (value) => {
  return value.split('-')
    .map(word => word.toLowerCase())
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ')
}

const toUpperCamelCase = (value) => {
  console.log(value.split('-'))
  return value.split('-')
    .map(word => word.toLowerCase())
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join('')
}

const toKebabCase = (value) => {
  return value.split('')
    .reduce((prev, curr, idx) => {
      if (curr === ' ') {
        return prev + '-'
      }
      if (curr === curr.toUpperCase()) {
        prev[idx]
        if (idx === 0 || prev[idx - 1] === '-') {
          return prev + curr.toLowerCase()
        }
        return prev + '-' + curr.toLowerCase()
      }
      return prev + curr
    }, '')
}

const dataUriToBlob = dataURI => {
  var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

const urlShortener = (url, cb) => {
  Vue.http.get('https://api-ssl.bitly.com/v3/shorten?access_token=' + config.bitlyToken + '&longUrl=' + url).then(response => {
    Vue.http.get(response.data.data.url).then(res => {console.log(res)})
    cb(response.data.data.url)
  })
}

export default {
  toCamelCase,
  toUpperCamelCase,
  toKebabCase,
  upperCaseFirstLetter,
  dataUriToBlob,
  urlShortener
}
