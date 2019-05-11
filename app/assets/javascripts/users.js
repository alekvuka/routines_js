
//function to get the number or routines a user has



function userInfo() {

   let id = $('#user_id')[0].value
   $.getJSON("/users/" + id, function(result){
     debugger
   })

}

function numberOfRoutines() {

}

//function to get the number of tasks a user has
function numberOfTasks() {

}

//function for current routine section
function currentRoutines(){

}

//function for upcoming routines
function upcomingRoutines() {

}




$(document).ready(function() {
  userInfo()
  //currentRoutines()
  //upcomingRoutines()
  //attachListeners()
});
