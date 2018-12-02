(function(){

  var config = {
    apiKey: "AIzaSyBoq_mjfcgMwF6T01Mp5CB1XpD4ZMWNYyo",
    authDomain: "ingredient-checker.firebaseapp.com",
    databaseURL: "https://ingredient-checker.firebaseio.com",
    projectId: "ingredient-checker",
    storageBucket: "",
    messagingSenderId: "932372805917"
  };
  firebase.initializeApp(config);

  //logIn
  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('pswd');
  const logInButton = document.getElementById('loginButton');
  const signUpButton = document.getElementById('signUpButton');
  const logOutButton = document.getElementById('logOutButton');
  const logInContainer = document.getElementById("login-container");
  const logOutContainer = document.getElementById("logout-container");

  logInButton.addEventListener('click', e => {
    const email = txtEmail.value;
    const pswd = txtPassword.value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pswd);
    promise.catch(e => alert(e.message));
  });

  signUpButton.addEventListener('click', e => {
    const email = txtEmail.value;
    const pswd = txtPassword.value;
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pswd);
    promise.catch(e => alert(e.message));
  });
  logOutButton.addEventListener('click', e => {
    const promise = firebase.auth().signOut();
    promise.catch(e => alert(e.message));
  });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    logInContainer.style.display= "none"
    logOutContainer.style.display= ""
    // ...
  } else {
    // User is signed out.
    logInContainer.style.display= ""
    logOutContainer.style.display= "none"
    // ...
  }
});

})();
