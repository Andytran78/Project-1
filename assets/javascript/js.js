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

  var auth = firebase.auth();
  var email = "";
  var pass = "";
  // var passWord = $("#txtPassword");
  // var btnLogin = $("#btnLogin");
  // var btnSignUp = $("#btnSignUp")
  // var btnLogOut = $("#btnLogOut")

  function clearlogIn(){
    $("#txtEmail").html("");
    $("#passWord").html("");
  }
  $("#btnLogin").on("click", e =>{
    alert("I was clicked");
     email = $("#txtEmail").val().trim();
     pass = $("#txtPassword").val().trim();
    var auth = firebase.auth();
    
    console.log(email);
    console.log(pass);
    var promise = auth.signInWithEmailAndPassword(email,pass);

    promise.catch(e => console.log(e.message));

 });
  $("#btnSignUp").on("click", e=>{
    // TODO CHECK FOR REAL EMAIL
    event.preventDefault();

     email = $("#email").val().trim();
     pass = $("#pwd").val().trim();
     usr = $("#usr").val().trim();
     auth = firebase.auth();
     window.location.href="index.html";
    console.log(email);
    console.log(pass);
    console.log(usr);
    var promise = auth.createUserWithEmailAndPassword(email,pass);

    promise.catch(e => console.log(e.message));
    promise.catch(e => $("#dupMessage").html(e.message));
  });

  
  $("#btnLogOut").on("click",e =>{
      firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
       console.log(firebaseUser);
       $("#txtEmail").addClass("hide");
        $("#userEmail").removeClass("hide");
        $("#txtPassword").addClass("hide");
        $("#btnLogOut").removeClass("hide");
      }
      else  {
        console.log("not logged in");
        $("#txtEmail").removeClass("hide");
        $("#userEmail").addClass("hide");
        $("#txtPassword").removeClass("hide");
        $("#btnLogOut").addClass("hide");
      }
  });
}




  