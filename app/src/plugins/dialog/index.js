import $ from 'jquery'

const Dialog = {
  install (Vue, options) {
    const $modal = $('<div id="dialog-modal"></div>')
    const modalCSS = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1050,
      overflow: 'hidden',
      outline: 0,
      display: 'block',
      background: 'rgba(0,0,0,0.5)'
    }
    $modal.css(modalCSS)

    const modalContentCSS = {
      position: 'fixed',
      left: 0,
      right: 0,
      zIndex: 1060,
      padding: '20px 16px',
      margin: '0px 16px',
      top: '10%',
      borderRadius: '6px',
      background: '#FFF'
    }
    const $modalContent = $('<div>')
    $modalContent.css(modalContentCSS)

    const $title = $('<h3>')
    const $message = $('<p>')
    $modalContent.append($title)
    $modalContent.append($message)

    const $acceptButton = $('<div class="btn btn-primary pull-right">Aceptar<div>')
    $modalContent.append($acceptButton)
    $modal.append($modalContent)

    const $cancelButton = $('<div class="btn btn-link pull-right">Cancelar<div>')

    const removeDialog = function () {
      $cancelButton.remove()
      $modal.remove()
    }

    Vue.prototype.$displayDialog = function (title, message, onAcceptCallback, onCancelCallback) {
      const acceptCallback = onAcceptCallback || function(){}
      const cancelCallback = typeof onCancelCallback == 'function' ? onCancelCallback : function(){}
      $title.html(title)
      $message.html(message)
      $acceptButton.on('click', () => {
        removeDialog()
        acceptCallback()
      })

      if (onCancelCallback) {
        $cancelButton.on('click', () => {
          removeDialog()
          cancelCallback()
        })
        $modalContent.append($cancelButton)
      }
      $(document.body).append($modal)
    }

    Vue.prototype.$removeDialog = function () {
      removeDialog()
    }
  }
}

export default Dialog
