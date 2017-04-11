$( document ).ready(function(){

var myArray = [];
		function ingredientsAdd(){
      $("#ingredientList").empty();
			for( i = 0; i < myArray.length; i++){
				console.log(myArray[i]);
				var a = $("<div>");
				a.attr("date-name", myArray[i]);
				a.text(myArray[i]);
				a.addClass("meals");
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


function signUpEmail(){

  // Initialize Firebase
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
  var auth = firebase.auth();
  
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
 $("#logInEmail").html("Signed is As: " + localStorage.getItem("email"));
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
     usr = $("#usr").val().trim();
     auth = firebase.auth();
    console.log(email);
    console.log(pass);
    console.log(usr);

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
}
signUpEmail();
});

