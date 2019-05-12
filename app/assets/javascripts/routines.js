


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


function createARoutine(){
    //e.preventDefault();
    //debugger
}
