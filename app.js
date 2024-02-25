const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

//An array to store the tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const task = taskInput.value;
  if (task) {
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    updateLocalStorage();
  } else {
    alert('Please enter a task.');
  }
}

// Function to delete a task
function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
    updateLocalStorage();
  }
}

// Function to edit task
function editTask(index) {
    const newTask = prompt('Enter update for this task:', tasks[index]);

    if (newTask !== null) {
        tasks[index] = newTask;
        renderTasks();
        updateLocalStorage();
    }
}

// Function to render the tasks on the page
function renderTasks() {
  taskList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="edit-button" onclick="editTask(${i})">Edit</button>
      <button class="delete-button" onclick="deleteTask(${i})">Delete</button>
    `;
    taskList.appendChild(li);
  }
}

// Event listener to add a task
taskInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

// Event listener for keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    addTask();
  } else if (event.keyCode === 46 && taskList.children.length > 0) {
    deleteTask(taskList.children.length - 1);
  }
});

// Load tasks from localStorage
window.addEventListener('load', function() {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
  }
});

// Update localStorage whenever tasks change
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}