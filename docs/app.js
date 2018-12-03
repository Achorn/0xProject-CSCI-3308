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

  // Get a reference to the database service
  var database = firebase.database();

  //logIn
  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('pswd');
  const txtIngredient = document.getElementById('ingredient');
  const logInButton = document.getElementById('loginButton');
  const signUpButton = document.getElementById('signUpButton');
  const logOutButton = document.getElementById('logOutButton');
  const logInContainer = document.getElementById("login-container");
  const logOutContainer = document.getElementById("logout-container");
  const addIngredientContainer = document.getElementById("add-ingredient-container");
  const addIngredientButton = document.getElementById('addIngredientButton');

  logInButton.addEventListener('click', e => {
    const email = txtEmail.value;
    const pswd = txtPassword.value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pswd);
    promise.catch(e => alert(e.message));
  });

  addIngredientButton.addEventListener('click', e => {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/Ingredients").push(txtIngredient.value);
  });

  signUpButton.addEventListener('click', e => {
    const email = txtEmail.value;
    const pswd = txtPassword.value;
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pswd);
    promise.then(() => {
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      firebase.database().ref('users/' + uid).set({
        Ingredients: ["empty"]
      });
    }, e => alert(e.message));
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
    addIngredientContainer.style.display= ""
    // ...
  } else {
    // User is signed out.
    logInContainer.style.display= ""
    logOutContainer.style.display= "none"
    addIngredientContainer.style.display= "none"
    // ...
  }
});

})();
