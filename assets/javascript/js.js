var config = {
    apiKey: "AIzaSyB0B7n5RShoXKGzqddL0JNxunQfvHBbcRs",
    authDomain: "project-5759926021839573065.firebaseapp.com",
    databaseURL: "https://project-5759926021839573065.firebaseio.com",
    projectId: "project-5759926021839573065",
    storageBucket: "project-5759926021839573065.appspot.com",
    messagingSenderId: "173548131166"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var usr = "";

$( document ).ready(function(){

// database.ref(/firebaseUser).on("value", function(snapshot) {
//   var sv = snapshot.val();
//   console.log(sv.usrName);
//   $("#profileName").append("<div>" + snapshot.val().usrName+ "<div>");
// },
// function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });

var myArray = [];
		function ingredientsAdd(){
      $("#ingredientList").empty();
			for( i = 0; i < myArray.length; i++){
				console.log(myArray[i]);

        var a = $("<div>");
				a.attr("data-name", myArray[i]);
        a.attr("data-Index",i);
				a.text(myArray[i]);
				a.addClass("meals");
        a.text(" - "+ myArray[i]);

				$("#ingredientList").append(a);

			}
		}
				$("#addIngredient").on("click", function(){
				event.preventDefault();
				var newIngredient = $("#newIngredientTxt").val().trim();
				myArray.push(newIngredient);
				$("#newIngredientTxt").val("");
			    ingredientsAdd();

				});
	ingredientsAdd();

function removeIngredient(){

  //remove from Array
  console.log(this);
  var getIndex = $(this).attr("data-index");
  var getName = $(this).attr("data-name");

  myArray.splice(getIndex,1);
  console.log(myArray);

  //remove from DOM
  $("#ingredientList").empty();
      for( i = 0; i < myArray.length; i++){
        console.log(myArray[i]);
        var a = $("<div>");
        a.attr("data-name", myArray[i]);
        a.attr("data-Index",i);
        a.text(" - "+ myArray[i]);
        a.addClass("meals");
        $("#ingredientList").append(a);



  };
};

$(document).on("click", ".meals", removeIngredient);



  var auth = firebase.auth();

function signUpEmail(){


  function clearlogIn(){
    $("#txtEmail").val("");
    $("#txtPassword").val("");
  }


    function setLocalStorage(){
       $("#logInEmail").html();
          $("#logInEmail").html("Signed is As: " + email);
          localStorage.clear();
          localStorage.setItem("email",email);

    }

    // to log in as a existng usr con
    $("#btnLogin").on("click", e=> {
         event.preventDefault();
         email = $("#txtEmail").val().trim();
         pass = $("#txtPassword").val().trim();
         setLocalStorage();
         var auth = firebase.auth();
        clearlogIn();

        var promise = auth.signInWithEmailAndPassword(email,pass);

        promise.catch(e => console.log(e.message));

     });

      // to sign up for an account


      // to log out of user account
      $("#btnLogOut").on("click",e =>{
          firebase.auth().signOut();
          localStorage.clear();
          $("#logInEmail").html("");


      });
      //checks to see if the user is logged in or out
      firebase.auth().onAuthStateChanged(firebaseUser =>{
          if(firebaseUser){

          // var displayName = firebaseUser.displayName;
          // var email = firebaseUser.email;
          // var emailVerified = firebaseUser.emailVerified;
          // var photoURL = firebaseUser.photoURL;
          // var isAnonymous = firebaseUser.isAnonymous;
          // var uid = firebaseUser.uid;
          // var providerData = firebaseUser.providerData;
          //console.log(firebaseUser);
          //console.log(firebaseUser.uid);
           $("#txtEmail").addClass("hide");
            $("#userEmail").removeClass("hide");
            $("#txtPassword").addClass("hide");
            $("#btnLogOut").removeClass("hide");
            $("#logInEmail").removeClass("hide");
          }
          else  {
            console.log("not logged in");
            $("#txtEmail").removeClass("hide");
            $("#userEmail").addClass("hide");
            $("#txtPassword").removeClass("hide");
            $("#btnLogOut").addClass("hide");
            $("#logInEmail").addClass("hide");
          }
      });

  };
signUpEmail();

 function signUp(){
          $("#btnSignUp").on("click", function(){
            // TODO CHECK FOR REAL EMAIL
            event.preventDefault();
            alert("I was clicked");
             email = $("#email").val().trim();
             pass = $("#pwd").val().trim();
             usrName = $("#usr").val().trim();
             auth = firebase.auth();
            console.log(email);
            console.log(pass);
            console.log(usrName);

           firebase.auth().createUserWithEmailAndPassword(email,pass)
           .then(function(user){
            database.ref("/user").push({
              userId: user.uid,
              userName: usrName,
              userEmail:user.email


            });
            alert(user.uid);
             $("#dupMessage").html("Click "+"<a href = 'index.html'>here</a> "+"here to log in");
            //var promise = auth.createUserWithEmailAndPassword(email,pass);
          }).catch(function(error){
            promise.catch(firebaseUser => console.log(firebaseUser.message));
            promise.catch(firebaseUser => $("#dupMessage").html(firebaseUser.message + "Click "+"<a href = 'indexSignUpPage.html'>here</a> "+"to try again"));

            $("#logInEmail").html("Signed is As: " + localStorage.getItem("email"));
        });
        });

      }
      signUp();

  $("#ingredientSearch").on("click", function() {
          event.preventDefault();
          var userInput = myArray.toString();
          console.log(userInput);
          addIngredients(userInput);
          //return false;
      });

        //Search function button
function addIngredients(userInput) {
    var p = $(this).data("name");
    var queryURL = "https://api.edamam.com/search?q= " + userInput + " &app_id=694da05d&app_key=56d6789992fbe1f17a7c2ce8cbc3fc62"
    //ajax call
    $.ajax({ url: queryURL, method: "GET" })
        .done(function(response) {
            var hits = response.hits;

            for (var i = 0; i < hits.length; i++) {
                var recipe = hits[i].recipe;
                console.log(recipe);
                var recipesDiv = $('<div class="item">');
                var ingredientResults = recipe.ingredientLines;
                var ingredientParagraph = $("<p>").html("<strong>Ingredients: </strong>" + ingredientResults);
                var label = recipe.label;
                var header = $("<h1>").text(label)
                var image = $("<img>");
                image.attr("src", recipe.image);
                var url = $("<a>").html("<p><strong>Click Here for Full Recipe!!!</strong></p>");
                url.attr("href", recipe.url);

                recipesDiv.append(ingredientParagraph);
                recipesDiv.append(image);
                recipesDiv.append(url);

                recipesDiv.prepend(header);




                $("#recipeList").prepend(recipesDiv);

            }

    });
    // });
}

}); // do


