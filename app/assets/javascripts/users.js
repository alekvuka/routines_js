

//function to get the number or routines a user has

const maybePluralize = (count, noun, suffix = 's') =>`${count} ${noun}${count !== 1 ? suffix : ''}`;

function appendUserInfo(result){
  let numberOfRoutines = result.routines.length
  let name = result.name
  let numberOfTasks = 0

  $('#user_info').append(
    `<h1>Hello, ${name}! </h1>
     You have ${maybePluralize(numberOfRoutines, 'routine')}
     consisting of ${maybePluralize(numberOfTasks, 'task')}.
     <br>
     <br>
     You can <a href="" id='see_all_routines'>see all of your routines</a>
     or <a href="" id='add a routine'> add a new routine</a>
    `
  )
}


function userInfo() {
   let id = $('#user_id')[0].value
   $.getJSON("/get_user/" + id, function(result){
     appendUserInfo(result)
   })
}


function currentRoutines() {
  let id = $('#user_id')[0].value
  //debugger
  $.getJSON("/get_current_routines/" + id, function(result){
    //appendUserInfo(result)
    debugger
  })




}





$(document).ready(function() {
  userInfo()
  currentRoutines()
  //upcomingRoutines()
  //attachListeners()
});
