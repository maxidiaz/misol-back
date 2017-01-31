import Vue from 'vue'

const actionBarBus = new Vue()
export {actionBarBus}

const setBackAction = backAction => {
  actionBarBus.$emit('onBackButton', backAction)
}

const setCurrentUser = user => {
  actionBarBus.$emit('loggedUser', user)
}

export default {
  setBackAction,
  setCurrentUser
}
