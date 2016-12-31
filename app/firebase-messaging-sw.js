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
  var title = payload.notification.title
  return self.registration.showNotification(title, payload.notification)
})

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow(event.notification.data.actionUrl);
  }));
});
