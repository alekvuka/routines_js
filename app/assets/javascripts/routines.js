

function backtoMainScreenButton(){
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

function deleteRoutine(rid){
  $.get(`/delete_routine/${rid}`, function(result){
    getAllRoutines()
  })
}





function showRoutine(result){
   clearPage()


   var div=document.createElement('div')
   div.innerHTML = `<b>${result.name} (${result.start_time} - ${result.end_time})</b>`

   var ul = document.createElement('ul');
   for(j=0; j<result.tasks.length; j++) {
     var li=document.createElement('li')
      li.innerHTML = `${result.tasks[j].name}`
     ul.appendChild(li)
   }

   div.append(ul)
   $('#routines_page').append(div)
   $('#routines_page').append(`<a id="${result[i].id}" href="">delete this routine</a>`)
   $('#routines_page').append("<br>")
   $('#routines_page').append("<br>")
   $(`#${result[i].id}`)[0].addEventListener("click", function(e){
     deleteRoutine(e.currentTarget.id)
   })

}




function showAllRoutines(result){
  clearPage()

  $('#routines_page').append("<h1>Here are all of your Routines!</h1>")

  for(i=0; i<result.length; i++){
     var div=document.createElement('div')
     div.innerHTML = `<b>${result[i].name} (${result[i].start_time} - ${result[i].end_time})</b>`

     var ul = document.createElement('ul');
     for(j=0; j<result[i].tasks.length; j++) {
       var li=document.createElement('li')
        li.innerHTML = `${result[i].tasks[j].name}`
       ul.appendChild(li)
     }

     div.append(ul)

     $('#routines_page').append(div)
     $('#routines_page').append(`<a id="${result[i].id}" href="">delete this routine</a>`)
     $('#routines_page').append("<br>")
     $('#routines_page').append("<br>")
     $(`#${result[i].id}`)[0].addEventListener("click", function(e){
       deleteRoutine(e.currentTarget.id)
     })

  }

  backtoMainScreenButton()
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
  $('#routines_page').append("Tasks for this Routine:")



  //var br = document.createElement("BR");
  var x = document.createElement("DIV");
  x.id = "existing_tasks"

  $.getJSON("/all_tasks",  function(result){

    for(i=0; i<result.length; i++){
      var br = document.createElement("BR");
      var l = document.createElement("LABEL");
      l.innerHTML = result[i].name

      var imp = document.createElement("INPUT");
      imp.type = 'checkbox'
      imp.value = result[i].id
      imp.name = result[i].name
      l.appendChild(imp)
      x.appendChild(l)
      x.appendChild(br)
    }
    x.append(document.createElement("BR"))
  })

  $('#routines_page').append(x)

  $('#routines_page').append("Or create a new task for this routine")

  var xi = document.createElement("DIV");
  xi.id = "new_tasks"
  let newTask = 0

  var imp = document.createElement("INPUT");
  imp.type = 'text'
  imp.id = newTask
  var lab = document.createElement("LABEL");
  lab.innerText = "Task name:"

  lab.appendChild(imp)

  var but = document.createElement("button");
  but.innerText = "Another One"
  but.id = 'moreNewTasks'

  xi.appendChild(lab)
  xi.append(document.createElement("BR"))
  xi.appendChild(but)
  $('#routines_page').append(xi)

  $('#moreNewTasks')[0].addEventListener('click', function(e){
    var lab = document.createElement("LABEL");
    lab.innerText = "Task name:"
    var imp = document.createElement("INPUT");
    imp.type = 'text'
    imp.id = newTask
    lab.appendChild(imp)
    xi.appendChild(lab)
    xi.append(document.createElement("BR"))
    xi.appendChild(but)
  })

  $('#routines_page').append(document.createElement("BR"))

  backtoMainScreenButton()

  var createButton = document.createElement("button");
  createButton.innerText = "Create This Routine"
  createButton.id = 'createRoutine'
  $('#routines_page').append(createButton)
  $('#createRoutine')[0].addEventListener('click', function(e){
      createNewRoutine()
  })
}


class Routine {
  constructor(name, start_time, end_time) {
    this.name = name;
    this.start_time = start_time;
    this.end_time = end_time;
  }

  assignTasks() {
    let ar = []
    for (i=0; i<$("#existing_tasks input:checkbox").length; i++){
      if ($("#existing_tasks input:checkbox")[i].checked){
        ar.push($("#existing_tasks input:checkbox")[i].value)
      }
    }
    this.task_ids= ar


    let tks={}

    for(i=0; i<$("#new_tasks input:text").length; i++){
      if ($("#new_tasks input:text")[i].value != ""){
        tks[i]=$("#new_tasks input:text")[i].value
      }

    }

    this.tasks = tks
  }

  postMe() {

    let rt2 = {}
    rt2["routine"] = this
    rt2["user"] = $('#user_id')[0].value

    $.post('/routine', rt2, function(data, status){
      showRoutine(data)
    })
  }
}


function createNewRoutine(){
  let name = $('#routine_name')[0].value
  let start_time = $('#start_time')[0].value
  let end_time = $('#end_time')[0].value
  let newRoutine = new Routine(name, start_time, end_time)
  newRoutine.assignTasks()
  newRoutine.postMe()

}
