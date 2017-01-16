import ActionBarUtils from '../components/ActionBarUtils'

const uploadAvatar = (file, cb, cbError) => {
  const storageRef = firebase.storage().ref()

  const metadata = {
    contentType: 'image/png'
  }

// Upload file and metadata to the object 'images/mountains.jpg'
  const uploadTask = storageRef.child(Date.now() + '.png').put(file, metadata)

// Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused')
          break
          case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running')
          break
        }
      }, function(error) {
        cbError(error.code)
        switch (error.code) {
          case 'storage/unauthorized':
          // User doesn't have permission to access the object
            break
          case 'storage/canceled':
          // User canceled the upload
            break
          case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
            break
          }
        },
    () => {
      // Upload completed successfully, now we can get the download URL
      const downloadURL = uploadTask.snapshot.downloadURL
      cb(downloadURL)
    })
}

const signUp = ({email, password, displayName, photoURL}, onSuccess, onFail) => {
  console.log('lalalalalla')
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user)
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      }).then(function() {
        onSuccess(firebase.auth().currentUser)
      }, function(error) {
        console.log(error)
        onFail()
      })
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.log(error)
      onFail()
    })
}

const logIn = ({email, password}, onSuccess, onFail) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    onSuccess(user)
    ActionBarUtils.setCurrentUser(user)
  }).catch(function(error) {
    onFail(error)
  })
}

const logOut = (onSucess, onFail) => {
  firebase.auth().signOut().then(() => {
    onSucess()
  }, function(error) {
    onFail()
  })
}

const isUserLoggedIn = (onSucess, onFail) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User logged in : ', user)
      ActionBarUtils.setCurrentUser(user)
      onSucess(user)
    } else {
      console.log('User is not logged in')
      onFail()
    }
  })
}

const getCurrentUser = () => {
  return firebase.auth().currentUser
}

export default {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  isUserLoggedIn,
  uploadAvatar
}
