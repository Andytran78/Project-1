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
var auth = firebase.auth();
var  uid = "";

$( document ).ready(function(){

// database.ref().on("value", function(snapshot) {
//   var sv = snapshot.val();
//   console.log(sv["VST5EAIRteXRcQ6G5G5BrcHNeUm1"]);
//   //$("#profileName").append("<div>" + snapshot.val().usrName+ "<div>");
// });

 

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
    $("#btnLogin").on("click", firebaseUser => {
         event.preventDefault();
         email = $("#txtEmail").val().trim();
         pass = $("#txtPassword").val().trim();
         setLocalStorage();
         var auth = firebase.auth();
        clearlogIn();        
        var promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(firebaseUser => console.log(e.message));

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
           uid = firebaseUser.uid;
          
          database.ref().on("value", function(snapshot) {
          var sv = snapshot.val();
          console.log(sv[uid].userName);
          $("#profileName").append("<div>" + sv[uid].userName+ "<div>"); 
          $("#profileEmail").append("<div>" + sv[uid].userEmail + "</div>");
          $("#profileFavFood").append("<div>" + sv[uid].favFood+ "</div>");
          $("#profileFavProgrammer").append("<div" + sv[uid].favProgrammer + "</div>");
          });
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
            
             email = $("#email").val().trim();
             pass = $("#pwd").val().trim();
             usrName = $("#usr").val().trim();
             favFood = $("#favFood").val().trim();
             favProgrammer = $("favProgrammer").val().trim();
             auth = firebase.auth();
           firebase.auth().createUserWithEmailAndPassword(email,pass)
           .then(function(user){
            database.ref().child(user.uid).set({
              userId: user.uid,
              userName: usrName,
              userEmail:user.email,
              favFood:favFood,
              favProgrammer:favProgrammer

            });
             $("#dupMessage").html("Click "+"<a href = 'index.html'>here</a> "+"to return to the main page");
            //var promise = auth.createUserWithEmailAndPassword(email,pass);
          }).catch(function(error){                      
            promise.catch(firebaseUser => console.log(firebaseUser.message));
            promise.catch(firebaseUser => $("#dupMessage").html(firebaseUser.message + "Click "+"<a href = 'indexSignUpPage.html'>here</a> "+"to try again"));
                     
        });
           $("#logInEmail").html("Signed is As: " + localStorage.getItem("email"));
        });

      }
      signUp();
  

}); // document on ready



