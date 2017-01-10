import ActionBarUtils from '../components/ActionBarUtils'

const signUp = ({email, password, displayName, photoURL}, onSuccess, onFail) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user)
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      }).then(function() {
        onSuccess(firebase.auth().currentUser)
      }, function(error) {
        onFail()
      })
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
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
  isUserLoggedIn
}
