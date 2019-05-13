
function createTimeOptions(j){

  let times =   ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am','6:00am',
      '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
      '1:00pm', '2:00pm', '3:00pm', '4:00pm','5:00pm','6:00pm',
      '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am' ]


  var sel = document.createElement("SELECT")
  sel.id = j
  for(i=0; i<times.length; i++){
    var opt = document.createElement("OPTION")
    opt.value = times[i]
    opt.innerText = times[i]
    sel.appendChild(opt)
  }

  return sel

}

function showAllRoutines(result){
  clearPage()

  $('#routines_page').append("<h1>Here are all of your Routines!</h1>")

  for(i=0; i<result.length; i++){
     var div=document.createElement('div')
     div.id = `${result[i].id}`
     div.innerHTML = `<b>${result[i].name} (${result[i].start_time} - ${result[i].end_time})</b>`

     var ul = document.createElement('ul');
     for(j=0; j<result[i].tasks.length; j++) {
       var li=document.createElement('li')
        li.innerHTML = `${result[i].tasks[j].name}`
       ul.appendChild(li)
     }

     div.append(ul)
     $('#routines_page').append(div)

     $('#routines_page').append(`<a href="/users/${$('#user_id')[0].value}/routines/${result[i].id}/edit" id='see_all_routines'>edit this routine</a>`)
     $('#routines_page').append("<br>")
     $('#routines_page').append("<br>")

  }
  var button = document. createElement("button")
  button.innerHTML = "Back to Main Screen"
  button.id = 'back_to_main_screen'

  $('#routines_page').append(button)
  $('#back_to_main_screen')[0].addEventListener('click', function(e){
       e.preventDefault();
       clearPage()
       userInfo()
       currentRoutines()
       upcomingRoutines()
  })
}

function getAllRoutines(){
  let id = $('#user_id')[0].value
  $.getJSON("/get_routines/" + id, function(result){
    showAllRoutines(result)
  })
}

function createRoutine(){
  clearPage()

  $('#routines_page').append("<h1>Create a New Routine!</h1>")
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.id = "routine_name"
  $('#routines_page').append("Name of your new routine:")
  $('#routines_page').append(x)
  $('#routines_page').append("<br><br>")

  $('#routines_page').append("Routine avalable/visible from:")
  $('#routines_page').append(createTimeOptions("start_time"))
  $('#routines_page').append("to:")
  $('#routines_page').append(createTimeOptions("end_time"))
  $('#routines_page').append("<br>")
  $('#routines_page').append("<br>")
  $('#routines_page').append("Tasks for this Routine: <br>")

  



}
