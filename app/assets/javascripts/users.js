

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
     or <a href="" id='create_a_routine'> create a new routine</a>
    `
  )
}

function appendCurrentRoutines(result) {

  if(result.length === 0){
    $("#current_routine").append(
      `You do not have a routine that is applicable at the current time <br>
       <a href="" id='create_a_routine'> create one!</a>
      `
    )
  }else{
    
  }

}


function userInfo() {
   let id = $('#user_id')[0].value
   $.getJSON("/get_user/" + id, function(result){
     appendUserInfo(result)
   })
}


function currentRoutines() {
  let id = $('#user_id')[0].value
  $.getJSON("/get_current_routines/" + id, function(result){
    appendCurrentRoutines(result)
  })


}





$(document).ready(function() {
  userInfo()
  currentRoutines()
  //upcomingRoutines()
  //attachListeners()
});
