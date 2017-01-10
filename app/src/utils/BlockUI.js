import $ from 'jquery'

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
    opacity: 0,
    background: 'rgba(0,0,0,0.8)',
    transition: 'opacity 5s ease'
}
$modal.css(modalCSS)

const $text = $('<h3>Cargando...</h3>')
$text.css({
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    height: 30
})

$modal.append($text)
const removeDialog = function() {
    $modal.remove()
}

const blockUI = function(noActionBar) {
    $text.remove()
    if (noActionBar) {
      $modal.css('top', 50)
    }
    $(document.body).append($modal)
    $modal.css('opacity', 1)
}

const unblockUI = function() {
    removeDialog()
}

const toggleBlockUI = function(block, noActionBar) {
    block ? blockUI(noActionBar) : unblockUI()
}

const showSpinner = function() {
    $(document.body).append($modal)
    $modal.css('opacity', 1)
}

const hideSpinner = function() {
    removeDialog()
}

export default {
  showSpinner,
  hideSpinner,
  blockUI,
  unblockUI,
  toggleBlockUI
}
