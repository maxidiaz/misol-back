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
    background: 'rgba(0,0,0,0.8)'
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

const showSpinner = function() {
    $(document.body).append($modal)
}

const hideSpinner = function() {
    removeDialog()
}

export default {
  showSpinner,
  hideSpinner
}
