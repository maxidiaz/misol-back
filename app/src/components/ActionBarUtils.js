import Vue from 'vue'

const actionBarBus = new Vue()
export {actionBarBus}

const setBackAction = action => {
  actionBarBus.$emit('backAction', action)
}

const setCurrentUser = user => {
  actionBarBus.$emit('loggedUser', user)
}

export default {
  setBackAction,
  setCurrentUser
}
