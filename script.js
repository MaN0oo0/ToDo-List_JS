const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
let taskItem = document.createElement("li");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
var count = tasks.length;

// Add task event listener
addTaskBtn.addEventListener("click", (event) => {
event.preventDefault();
  addTask();

});

// Add task function
function addTask() {
  const taskName = document.getElementById("task-name").value;
  const taskDesc = document.getElementById("task-desc").value;
  const dueDate = document.getElementById("due-date").value;
  if (taskName != "" && taskDesc != "" && dueDate != "") {
    // Create task object
    const task = {
      name: taskName,
      description: taskDesc,
      dueDate: dueDate,
    };

    // Save task to local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Add task to task list
    console.log(tasks.length);


    taskItem = document.createElement("li");
    taskItem.innerHTML = `<span
     onclick="compete(${count.toString()})"
      data-TaskNumber="${count}">
      ${taskName} - ${dueDate}
      <br>
      ${task.description}</span>
      <button>Delete</button>`;



      count++;
    taskList.appendChild(taskItem);

    // Clear form inputs
    document.getElementById("task-name").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("due-date").value = "";
  }
  else{
    alert("Please fill in all fields"); 
  }
}

// Load tasks from local storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  count=tasks.length;
  tasks.forEach((task) => {

    taskItem = document.createElement("li");


    taskItem.innerHTML = `<span  onclick="compete(${count.toString()})"
      data-TaskNumber="${count}">${task.name} - ${task.dueDate}<br>${task.description}</span><button>Delete</button>`;
    taskList.appendChild(taskItem);
    count++;
  });
  console.log(taskItem.firstChild);
}

// Delete task event listener
taskList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const taskName =
      event.target.previousElementSibling.textContent.split(" - ")[0];
    deleteTask(taskName);
    event.target.parentElement.remove();
  }
});

// Delete task function
function deleteTask(taskName) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.name !== taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Compltet Task
function compete(number) {
const competeElement=document.querySelector(`[data-TaskNumber="${number}"]`);
competeElement.classList.toggle("complete");
}

// Load tasks on page load
loadTasks();
