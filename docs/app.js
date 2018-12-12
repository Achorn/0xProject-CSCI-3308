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
  var recipeDisplay = firebase.database().ref().child("recipes");
  var userID = ""
  var includedRecipes = [];

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

  function displayrecipes(snap){
    console.log('recipe function called');
    $("#recipe-body").empty();
    recipeDisplay.on("child_added", snap=>{
      console.log("in recipeDisplay child added")
      includedRecipes = [];
      var website = (snap.val()[0]);
      var userIngredientsArray = [];
      var userIngredient = "";
      ingredientDisplay.child(userID + "/Ingredients").on("child_added", snap => {
        var userIngredient = snap.val();
        userIngredientsArray.push(userIngredient);
      });
      //for each recipe in database, add to array then filter out each recipe
      //that doesnt belong one at a time
      var recipeArray = (snap.val());
      includedRecipes.push([snap.key,website]);
      recipeArray.shift(); //remove website

      //loop for every ingredient a user inputs
      for(var i=0; i < userIngredientsArray.length; i++){
        userIngredient = userIngredientsArray[i];
        //console.log(userIngredient);
        var found = false;

        //loop for searching users ingredient with recipe ingredients
        recipeArray.forEach(function(recIngredient, recIndex){
          //console.log(RecIngrrdient);
          var check = recIngredient.search(userIngredient);
          if (check != -1) {
            // console.log("user ingredient", userIngredient);
            // console.log("recipe ingredient", recIngredient);
            found = true;
          }
        });
        //if ingredient was not found
        if(found === false){
          includedRecipes.pop();
          break;
        }
      }
      if(found === true){
        var recLink = includedRecipes[includedRecipes.length - 1][0].link(includedRecipes[includedRecipes.length - 1][1]);

      $("#recipe-body").append("<tr><td>"+ recLink +"</td></tr>");
      }
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      logInContainer.style.display= "none";
      logOutContainer.style.display= "";
      addIngredientContainer.style.display= "";
      userID = firebase.auth().currentUser.uid;
      ingredientDisplay.child(userID + "/Ingredients").on("child_added", snap => {
        var ingredient = snap.val();
        $("#ingredient-body").append("<tr><td>"+ ingredient + "</td><td><button class='deleteIngredientButton' id='" + snap.key + "'>X</button></td></tr>");
        displayrecipes();
      });
      ingredientDisplay.child(userID + "/Ingredients").on("child_removed", snap => {
        //console.log(snap.key);
        $("#" + snap.key).closest('tr').remove();
        displayrecipes();
      });
      // displayrecipes();
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
