import Vue from 'vue'
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

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueSocketIO, config.restUrl)
Vue.use(Dialog)
Vue.use(Spinner)
Vue.use(Toast)

const configFirebase = {
  apiKey: 'AAAAw6qdah0:APA91bHHXU3wgFWNswugDTf9vAE32_IqV-awbuVHnKaVWf_lA55jhwgK4l72_Q31S-EnK2b4pSMZdY92AW8oYqQNQ_Xlhl5HOhJuiwFYbUwKEdqei1AFCA6Vv89wzCGAOmIYPa9T9HIx9qnP53A1awqoToBiCe5t2A',
  authDomain: 'misol-6a00d.firebaseapp.com',
  databaseURL: 'https://misol-6a00d.firebaseio.com',
  storageBucket: 'misol-6a00d.appspot.com',
  messagingSenderId: '840381065757'
}

firebase.initializeApp(configFirebase)

var messaging = firebase.messaging()
messaging.requestPermission()
  .then(function () {
    console.log('Notification permission granted.')
    return messaging.getToken()
  })
  .then(function (token) {
    FCMHelper.subscribeToTopic(token, 'mi-sol')
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
