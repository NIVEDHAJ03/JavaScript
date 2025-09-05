const submit = document.getElementById('addTaskBtn');  
const deleteAll = document.getElementById('deleteTaskBtn');
const taskListElement = document.getElementById('taskList');

let taskList = [];

function renderTaskList() {
  taskListElement.innerHTML = '';
  taskList.forEach((task, index) => {
    const listitem = document.createElement('li');
    listitem.innerHTML = `
      ${task.task} - ${task.status} 
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskListElement.appendChild(listitem);
  });
}

window.deleteTask=(index)=> {
  taskList.splice(index, 1);
  renderTaskList();
};

submit.addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskStatus = document.getElementById('taskStatus');
  console.log(taskInput.value, taskStatus.value);

  if (taskInput.value.trim() !== '') {
    taskList.unshift({
      task: taskInput.value,
      status: taskStatus.value,
    });
    renderTaskList();
    taskInput.value = '';
    taskStatus.value = 'Completed';
  }
});

deleteAll.addEventListener('click', () => {
  taskList = [];
  renderTaskList();
});
