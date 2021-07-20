const addBtn = document.querySelector(".add-task-btn");
const addTask = document.querySelector(".add-task");
const addInput = document.querySelector(".todo-input");

const todoList = document.querySelector(".todo-list");

const showTask = () => {
  let storedTask = localStorage.getItem("task");
  if (storedTask) {
    storedTask = JSON.parse(storedTask);
    storedTask.forEach(task => {
      const item = document.createElement("li");
      item.classList.add("todo-item");
      item.innerHTML = `
        <div class="left-operation">
          <i class="far fa-circle status"></i>
          <p class="task">${task}</p>
        </div>
        <div class="right-operation">
          <i class="far fa-edit edit"></i>
          <i class="far fa-trash-alt delete"></i>
        </div>
      `
      todoList.appendChild(item);
    })
  }
}

const addToList = (task) => {
  if (task !== "") {
    let storedTask = localStorage.getItem("task");
    if (!storedTask) {
      let taskArray = [];
      taskArray.push(task);
      localStorage.setItem("task", JSON.stringify(taskArray));
    } else {
      storedTask = JSON.parse(localStorage.getItem("task"));
      storedTask.push(task);
      localStorage.setItem("task", JSON.stringify(storedTask));
    }
    const item = document.createElement("li");
    item.classList.add("todo-item");
    item.innerHTML = `
      <div class="left-operation">
        <i class="far fa-circle status"></i>
        <p class="task">${task}</p>
      </div>
      <div class="right-operation">
        <i class="far fa-edit edit"></i>
        <i class="far fa-trash-alt delete"></i>
      </div>
    `
    todoList.appendChild(item);
  }
}

addBtn.addEventListener("click", () => {
  addTask.classList.toggle("show-input");
  if (addTask.classList.contains("show-input")) {
    addInput.focus();
  } else {
    addToList(addInput.value);
    addInput.value = "";
  }
});

addInput.addEventListener("keyup", key => {
  if (key.keyCode == 13) {
    addToList(addInput.value);
    addInput.value = "";
    addTask.classList.remove("show-input");
  }
})


document.addEventListener("DOMContentLoaded", () => {
  showTask();
})