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

database.ref().on("value", function(snapshot) {
  var sv = snapshot.val();
  console.log(sv.usrName);
  $("#profileName").append("<div>" + snapshot.val().usrName+ "<div>");
},
function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

var myArray = [];
		function ingredientsAdd(){
      $("#ingredientList").empty();
			for( i = 0; i < myArray.length; i++){
				console.log(myArray[i]);
				var a = $("<div>");
        var glyph = $("<span class = 'glyphicon glyphicon-minus'>")
				a.attr("date-name", myArray[i]);
        a.attr("date-Index",i);
				a.text(myArray[i]);
				a.addClass("meals");
        $("#ingredientList").append(glyph);
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

  myArray.splice(getIndex, 1);
  console.log(myArray);

  //remove from DOM
  $("#ingredientList").empty();
      for( i = 0; i < myArray.length; i++){
        console.log(myArray[i]);
        var a = $("<div>");
        a.attr("date-name", myArray[i]);
        a.attr("date-Index",i);
        a.text(" - "+ myArray[i]);
        a.addClass("meals");
        $("#ingredientList").append(a);



  };
};

$(document).on("click", ".meals", removeIngredient);



  // Initialize Firebase
 
  
  var auth = firebase.auth();

function signUpEmail(){ 

  function clearlogIn(){
    $("#txtEmail").val("");
    $("#txtPassWord").val("");
  }
  
    function setLocalStorage(){
       $("#logInEmail").html();
          $("#logInEmail").html("Signed is As: " + email);
          localStorage.clear();
          localStorage.setItem("email",email);
         
    }
    
    // to log in as a existng usr 
    $("#btnLogin").on("click", e=> {
         event.preventDefault();
         email = $("#txtEmail").val().trim();
         pass = $("#txtPassword").val().trim();
          console.log(email);
         setLocalStorage();
         

        var auth = firebase.auth();
        clearlogIn();
        var promise = auth.signInWithEmailAndPassword(email,pass);

        promise.catch(e => console.log(e.message));

     });
     
      // to sign up for an account
      $("#btnSignUp").on("click", e=>{
        // TODO CHECK FOR REAL EMAIL
        event.preventDefault();
         email = $("#email").val().trim();
         pass = $("#pwd").val().trim();
         usrName = $("#usr").val().trim();
         auth = firebase.auth();
        console.log(email);
        console.log(pass);
        console.log(usr);
        database.ref().push({
          usrName: usrName,
          email: email,
        });
        var promise = auth.createUserWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));
        promise.catch(e => $("#dupMessage").html(e.message + "Click "+"<a href = 'indexSignUpPage.html'>here</a> "+"to try again"));
        $("#dupMessage").html("Click "+"<a href = 'index.html'>here</a> "+"here to log in");
        setLocalStorage();
         });
      // to log out of user account
      $("#btnLogOut").on("click",e =>{
          firebase.auth().signOut();
          localStorage.clear();
          $("#logInEmail").html("");
      });
      //checks to see if the user is logged in or out
      firebase.auth().onAuthStateChanged(firebaseUser =>{
          if(firebaseUser){
           console.log(firebaseUser);
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
       $("#logInEmail").html("Signed is As: " + localStorage.getItem("email"));
  }
signUpEmail();


}); // document on ready



