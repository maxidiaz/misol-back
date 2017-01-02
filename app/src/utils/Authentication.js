const signUp = ({email, password, displayName, photoURL}) => {
  console.log(email)
  console.log(password)
  console.log(displayName)
  console.log(photoURL)
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user)
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    })
}

export default {
  signUp
}
