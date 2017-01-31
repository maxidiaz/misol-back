import Vue from 'vue'

const subscribeToTopic = (token, topic) => {
    Vue.http.post('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAw6qdah0:APA91bHHXU3wgFWNswugDTf9vAE32_IqV-awbuVHnKaVWf_lA55jhwgK4l72_Q31S-EnK2b4pSMZdY92AW8oYqQNQ_Xlhl5HOhJuiwFYbUwKEdqei1AFCA6Vv89wzCGAOmIYPa9T9HIx9qnP53A1awqoToBiCe5t2A'
        }
    })
}

const sendNotification = (notification, data, topic) => {
  let postData = {
    notification: notification
  }
  if (data) {
    postData.data = data
  }
  postData.to = topic ? '/topics/' + topic : '/topics/mi-sol4'

  Vue.http.post('https://fcm.googleapis.com/fcm/send', postData, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAw6qdah0:APA91bHHXU3wgFWNswugDTf9vAE32_IqV-awbuVHnKaVWf_lA55jhwgK4l72_Q31S-EnK2b4pSMZdY92AW8oYqQNQ_Xlhl5HOhJuiwFYbUwKEdqei1AFCA6Vv89wzCGAOmIYPa9T9HIx9qnP53A1awqoToBiCe5t2A'
    }
  })
}

export default {
    subscribeToTopic,
    sendNotification
}
