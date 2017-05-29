var provider = new firebase.auth.GoogleAuthProvider();
var uid;
initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Signed in");
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      uid = user.uid;
      if(firebase.database().ref(userId) == null) {
        writeUserData(userId, displayName, email);
      }
      location.reload();
      user.getToken().then(function(accessToken) {
        console.log("user signed in");
      });
    } else {
      console.log("Signed out");
      firebase.auth().signInWithRedirect(provider);	
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});

