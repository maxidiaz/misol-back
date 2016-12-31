import $ from 'jquery'
import config from '../../config'

const Toast = {
  install (Vue, options) {
    let toast;

    Vue.showToast = Vue.prototype.$showToast = function (message, duration) {
      if (config && config.showToast) {
        toast = createToast(message, duration)
        toast.show()
      }
    }

    Vue.hideToast = Vue.prototype.$hideToast = function () {
      toast.remove()
    }
  }
}

const createToast = (message, duration) => {
  const $toast = $('<div></div>')
  const toastCSS = {
    position: 'fixed',
    maxWidth : '75%',
    left: 0,
    right: 0,
    bottom: 15,
    zIndex: 1050,
    overflow: 'hidden',
    outline: 0,
    display: 'none',
    background: 'rgba(0,0,0,0.9)',
    borderRadius: 7,
    padding: '20px 0',
    margin: '0 auto'
  }
  $toast.css(toastCSS)

  const $text = $('<p>')
  $text.css({
    color: '#FFF',
    textAlign: 'center',
    margin: '0'
  })

  const durationTime = duration || 3500

  return {
    show () {
      $text.html('')
      $text.append(message)
      $toast.append($text)
      $(document.body).append($toast)
      $toast.fadeTo('slow', 1)
      window.setTimeout(this.remove, durationTime)
    },
    remove () {
      $toast.fadeTo('slow', 0, function() {
        $toast.remove()
      })
    }
  }
}


export default Toast
