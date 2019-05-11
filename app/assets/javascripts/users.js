

//function to get the number or routines a user has

const maybePluralize = (count, noun, suffix = 's') =>`${count} ${noun}${count !== 1 ? suffix : ''}`;


function appendUserInfo(result){
  let numberOfRoutines = result.routines.length
  let name = result.name

  $('#user_info').append(
    `<h1>Hello, ${name}! </h1>
     You have a total of ${maybePluralize(numberOfRoutines, 'routine')} today.
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
       <a href="" id='create_a_routine'> create one!</a> `
    )
  }else{

    for(i=0; i<=result.length; i++){
       $("#current_routine").append(`${result[i].name} (${result[i].start_time} - ${result[i].end_time}) <br>`)

       for(j=0; j<result[i].tasks.length; j++) {
         $("#current_routine").append(`<input type="checkbox" name="task" value="task">${result[i].tasks[j].name}<br>`)
       }
       $("#current_routine").append("<br>")
    }
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
