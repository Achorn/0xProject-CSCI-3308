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
  var ingredientDisplay = firebase.database().ref().child("users");
  var userID = ""

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

  document.getElementById("ingredient-body").addEventListener("click", function(e){
    if(e.target && e.target.nodeName == "BUTTON"){
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/Ingredients/' + e.target.id).remove();
    }
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
      logInContainer.style.display= "none";
      logOutContainer.style.display= "";
      addIngredientContainer.style.display= "";
      userID = firebase.auth().currentUser.uid;
      ingredientDisplay.child(userID + "/Ingredients").on("child_added", snap => {
        console.log(snap.val());
        // div = document.createElement('Div');
        // div.innerHTML = snap.val();
        // div.style = "color: #444444"
        // document.getElementById("ingredient-body").appendChild(div);
        var ingredient = snap.val();
        $("#ingredient-body").append("<tr><td>"+ ingredient + "</td><td><button id='" + snap.key + "'>X</button></td></tr>");
        // document.getElementById("ingredient-body")
        //         .append("<tr><td>"+ ingredient + "<td/><td><button>remove</button></td></tr>");
      });
      ingredientDisplay.child(userID + "/Ingredients").on("child_removed", snap => {
        console.log(snap.key);
        $("#" + snap.key).closest('tr').remove();
      });

      // ...
    } else {
      // User is signed out.
      logInContainer.style.display= "";
      logOutContainer.style.display= "none";
      addIngredientContainer.style.display= "none";
      userID = "";
      document.getElementById("ingredient-body").innerHTML = ""
      // ...
    }
  });

})();

(function() {
  const config = {
    //YOUR CONFIGS
  };
}());

