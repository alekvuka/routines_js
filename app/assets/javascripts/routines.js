//user identifier
let id

//createNewRoutine variables
let name
let start_time
let end_time
let newRoutine

//backtoMainScreenButton() variables
let backButton

//createTimeOptions() variables
let times
let select
let options

//showRoutine() variables
let rDiv
let rUl
let rLi

//showAllRoutines() variables
let rsDiv
let rsUl
let rsLi

//createRoutine() variables
let br
let txtInput
let existingTasksDiv
let newTasksDiv
let l
let imp
let newTask
let lab
let anotherOne
let createButton


const timeOptions =  ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am','6:00am',
    '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm','5:00pm','6:00pm',
    '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am' ]



function backtoMainScreenButton(){
  backButton = document.createElement("button")
  backButton.innerHTML = "Back to Main Screen"
  backButton.id = 'back_to_main_screen'


  $('#routines_page').append(backButton)
  $('#back_to_main_screen')[0].addEventListener('click', function(e){
       e.preventDefault();
       clearPage()
       userInfo()
       currentRoutines()
       upcomingRoutines()
  })
}


function createTimeOptions(j){

  select = document.createElement("SELECT")
  select.id = j
  for(i=0; i<timeOptions.length; i++){
    options = document.createElement("OPTION")
    options.value = timeOptions[i]
    options.innerText = timeOptions[i]
    select.appendChild(options)
  }
  return select
}

function deleteRoutine(rid){
  $.get(`/delete_routine/${rid}`, function(result){
    getAllRoutines()
  })
}

function showRoutine(result){
   clearPage()

   rDiv=document.createElement('div')
   rDiv.innerHTML = `<b>${result.name} (${result.start_time} - ${result.end_time})</b>`

   rUl = document.createElement('ul');
   for(j=0; j<result.tasks.length; j++) {
      rLi=document.createElement('li')
      rLi.innerHTML = `${result.tasks[j].name}`
     rUl.appendChild(rLi)
   }

   rDiv.append(rUl)
   $('#routines_page').append(rDiv)
   $('#routines_page').append("<br>")
   $('#routines_page').append("<br>")
   backtoMainScreenButton()
}


function showAllRoutines(result){
  clearPage()

  $('#routines_page').append("<h1>Here are all of your Routines!</h1>")

  for(i=0; i<result.length; i++){
     rsDiv=document.createElement('div')
     rsDiv.innerHTML = `<b>${result[i].name} (${result[i].start_time} - ${result[i].end_time})</b>`

     rsUl = document.createElement('ul');
     for(j=0; j<result[i].tasks.length; j++) {
       rsLi=document.createElement('li')
       rsLi.innerHTML = `${result[i].tasks[j].name}`
       rsUl.appendChild(rsLi)
     }

     rsDiv.append(rsUl)

     $('#routines_page').append(rsDiv)
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
  id = $('#user_id')[0].value
  $.getJSON("/get_routines/" + id, function(result){
    showAllRoutines(result)
  })
}

function createRoutine(){
  clearPage()

  $('#routines_page').append("<h1>Create a New Routine!</h1>")
  txtInput = document.createElement("INPUT");
  txtInput.setAttribute("type", "text");
  txtInput.id = "routine_name"
  $('#routines_page').append("Name of your new routine:")
  $('#routines_page').append(txtInput)
  $('#routines_page').append("<br><br>")
  $('#routines_page').append("Routine avalable/visible from:")
  $('#routines_page').append(createTimeOptions("start_time"))
  $('#routines_page').append("to:")
  $('#routines_page').append(createTimeOptions("end_time"))
  $('#routines_page').append("<br>")
  $('#routines_page').append("<br>")
  $('#routines_page').append("Tasks for this Routine:")

  existingTasksDiv = document.createElement("DIV");
  existingTasksDiv.id = "existing_tasks"

  $.getJSON("/all_tasks",  function(result){

    for(i=0; i<result.length; i++){
      br = document.createElement("BR");
      l = document.createElement("LABEL");
      l.innerHTML = result[i].name

      imp = document.createElement("INPUT");
      imp.type = 'checkbox'
      imp.value = result[i].id
      imp.name = result[i].name
      l.appendChild(imp)
      existingTasksDiv.appendChild(l)
      existingTasksDiv.appendChild(br)
    }
    existingTasksDiv.append(document.createElement("BR"))
  })

  $('#routines_page').append(existingTasksDiv)

  $('#routines_page').append("Or create a new task for this routine")

  newTasksDiv = document.createElement("DIV");
  newTasksDiv.id = "new_tasks"
  newTask = 0

  imp = document.createElement("INPUT");
  imp.type = 'text'
  imp.id = newTask
  lab = document.createElement("LABEL");
  lab.innerText = "Task name:"

  lab.appendChild(imp)

  anotherOne = document.createElement("button");
  anotherOne.innerText = "Another One"
  anotherOne.id = 'moreNewTasks'

  newTasksDiv.appendChild(lab)
  newTasksDiv.append(document.createElement("BR"))
  newTasksDiv.appendChild(anotherOne)
  $('#routines_page').append(newTasksDiv)

  $('#moreNewTasks')[0].addEventListener('click', function(e){
    lab = document.createElement("LABEL");
    lab.innerText = "Task name:"
    imp = document.createElement("INPUT");
    imp.type = 'text'
    imp.id = newTask
    lab.appendChild(imp)
    newTasksDiv.appendChild(lab)
    newTasksDiv.append(document.createElement("BR"))
    newTasksDiv.appendChild(anotherOne)
  })

  $('#routines_page').append(document.createElement("BR"))

  backtoMainScreenButton()

  createButton = document.createElement("button");
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
  name = $('#routine_name')[0].value
  start_time = $('#start_time')[0].value
  end_time = $('#end_time')[0].value
  newRoutine = new Routine(name, start_time, end_time)
  newRoutine.assignTasks()
  newRoutine.postMe()
}
