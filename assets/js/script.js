var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

// set new values

/* buttonEl.addEventListener("click", function(){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
});
*/
var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;
   
    // check if input values are empty string
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

   // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id");
    // has data attribute, so get task id and call function tpo complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput,taskTypeInput,taskId);
    }
    //no data attribute, so create object as normal and pass to createTask
    else{
    // package up data as an object
   var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
   }
};
    
  /*  // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
     // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput  +  "</h3><span class='task-type'>" + taskTypeInput  +  "</span>";
     listItemEl.appendChild(taskInfoEl)

    // add the entire item to the list
    tasksToDoEl.appendChild(listItemEl);
*/

var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
     // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name  +  "</h3><span class='task-type'>" + taskDataObj.type  +  "</span>";
     listItemEl.appendChild(taskInfoEl)
    // create task actions (buttons and select) for task
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
    // add the entire item to the list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    // create container to hold elements
     var actionContainerEl = document.createElement("div");
     actionContainerEl.className = "task-actions";

     // create edit button
     var editButtonEl = document.createElement("button");
     editButtonEl.textContent = "Edit";
     editButtonEl.className = "btn edit-btn";
     editButtonEl.setAttribute("data-task-id", taskId);

     actionContainerEl.appendChild(editButtonEl);

     // create delete button
     var deleteButtonEl = document.createElement("button");
     deleteButtonEl.textContent = "Delete";
     deleteButtonEl.className = "btn delete-btn";
     deleteButtonEl.setAttribute("data-task-id", taskId);

     actionContainerEl.appendChild(deleteButtonEl);
// create chamge status dropdown
     var statusSelectEl = document.createElement("select");
     statusSelectEl.className = "select-status";
     statusSelectEl.setAttribute("name", "status-change");
     statusSelectEl.setAttribute("data-task-id", taskId);

     actionContainerEl.appendChild(statusSelectEl);
// create status options
     var statusChoices = ["To Do", "In Progress", "Completed"];

     for (var i = 0; i < statusChoices.length; i++) {
         // create option element
         var statusOptionEl = document.createElement("option");
         statusOptionEl.textContent = statusChoices[i];
         statusOptionEl.setAttribute("value", statusChoices[i]);

         // append to select
         statusSelectEl.appendChild(statusOptionEl);
     }

     return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
  
    alert("Task Updated!");
  
    // remove data attribute from form
    formEl.removeAttribute("data-task-id");
    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    formEl.querySelector("#save-task").textContent = "Add Task";
  };

  var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

var taskStatusChangeHandler = function(event) {
    // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

var editTask = function(taskId) {
  console.log(taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name'").value = taskName;
    document.querySelector("select[name = 'task-type'").value = taskType;
    //set data attribute to the form with a value o fthe tasks'id
    formEl.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
  };
  var deleteTask = function(taskId) {
    console.log(taskId);
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };
  // create ne wtask
  formEl.addEventListener("submit", taskFormHandler);
  // for edit and delete button
 pageContentEl.addEventListener("click", taskButtonHandler);
 // for changing the status
 pageContentEl.addEventListener("change", taskStatusChangeHandler);