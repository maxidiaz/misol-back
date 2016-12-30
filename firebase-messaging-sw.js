importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const configFirebase = {
  apiKey: 'AAAAw6qdah0:APA91bHHXU3wgFWNswugDTf9vAE32_IqV-awbuVHnKaVWf_lA55jhwgK4l72_Q31S-EnK2b4pSMZdY92AW8oYqQNQ_Xlhl5HOhJuiwFYbUwKEdqei1AFCA6Vv89wzCGAOmIYPa9T9HIx9qnP53A1awqoToBiCe5t2A',
  authDomain: 'misol-6a00d.firebaseapp.com',
  databaseURL: 'https://misol-6a00d.firebaseio.com',
  storageBucket: 'misol-6a00d.appspot.com',
  messagingSenderId: '840381065757'
}

firebase.initializeApp(configFirebase)

var messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  var title = 'Hola'
  var options = {
    body: payload.data.status
  }
  return self.registration.showNotification(title, options)
})
