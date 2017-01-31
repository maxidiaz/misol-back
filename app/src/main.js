const Vue = require('vue')
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './routes'
import VueSocketIO from 'vue-socket.io'
import Dialog from './plugins/dialog'
import Spinner from './plugins/spinner'
import Toast from './plugins/toast'
import config from './config'
import FCMHelper from './utils/FCMHelper'
import ActionBarUtils from './components/ActionBarUtils'
import BlockUI from './utils/BlockUI'
import Authentication from './utils/Authentication'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueSocketIO, config.baseUrl)
Vue.use(Dialog)
Vue.use(Spinner)
Vue.use(Toast)

const configFirebase = {
  apiKey: "AIzaSyD19z0gXXeUjht28_9HkJLGLRDfpq8kkqs",
  authDomain: "misol-6a00d.firebaseapp.com",
  databaseURL: "https://misol-6a00d.firebaseio.com",
  storageBucket: "misol-6a00d.appspot.com",
  messagingSenderId: "840381065757"
}

firebase.initializeApp(configFirebase)

var messaging = firebase.messaging()
messaging.requestPermission()
  .then(function () {
    console.log('Notification permission granted.')
    return messaging.getToken()
  })
  .then(function (token) {
    FCMHelper.subscribeToTopic(token, 'mi-sol4')
  })
  .catch(function (err) {
    console.log('Unable to get permission to notify.', err)
  })

  messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
  });

const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path != '/login' && to.path != '/signup') {
    Authentication.isUserLoggedIn(user => {
      BlockUI.hideSpinner()
      next()
      window.scrollTo(0,0)
    }, () => {
      BlockUI.hideSpinner()
      next({
        path: '/login'
      })
      window.scrollTo(0,0)
    })
  }
    next()
    window.scrollTo(0,0)

})

// inject a handler for `myOption` custom option
Vue.mixin({
  mounted: function () {
    var onBackAction = this.$options.onBackAction
    if (onBackAction) {
      ActionBarUtils.setBackAction(onBackAction.bind(this))
    }
  }
})

/* eslint-disable no-new */
new Vue({
  render: (h) => {
    return h('app')
  },
  components: {
    App
  },
  created () {
    this.$socket.emit('connection')
  },
  router: router
}).$mount('#app')
