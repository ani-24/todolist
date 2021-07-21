const addBtn = document.querySelector(".add-task-btn");
const addTask = document.querySelector(".add-task");
const addInput = document.querySelector(".todo-input");

const todoList = document.querySelector(".todo-list");

const changeStatus = (target) => {
  let taskStatus = JSON.parse(localStorage.getItem("task-status"));
  const task = target.parentElement.parentElement;
  if (target.classList.contains("fa-circle")) {
    target.classList.remove("fa-circle");
    target.classList.add("fa-dot-circle");
    task.classList.add("done");
    taskStatus[task.dataset.index] = "completed";
  } else {
    target.classList.add("fa-circle");
    target.classList.remove("fa-dot-circle");
    task.classList.remove("done");
    taskStatus[task.dataset.index] = "uncompleted";
  }
  localStorage.setItem("task-status", JSON.stringify(taskStatus));
};

const showTask = () => {
  let storedTask = localStorage.getItem("task");
  let taskStatus = localStorage.getItem("task-status");
  if (storedTask) {
    storedTask = JSON.parse(storedTask);
    taskStatus = JSON.parse(taskStatus);
    storedTask.forEach((task, idx) => {
      const item = document.createElement("li");
      item.classList.add("todo-item");
      item.dataset.index = idx;
      if (taskStatus[idx] === "completed") {
        item.classList.add("done");
      }
      item.innerHTML = `
        <div class="left-operation">
          <i class="far ${
            taskStatus[idx] === "completed" ? "fa-dot-circle" : "fa-circle"
          } status"></i>
          <p class="task">${task}</p>
        </div>
        <div class="right-operation">
          <i class="far fa-edit edit"></i>
          <i class="far fa-trash-alt delete"></i>
        </div>
      `;
      todoList.appendChild(item);
    });
  }
};

const addToList = (task) => {
  if (task !== "") {
    let storedTask = localStorage.getItem("task");
    let taskStatus = localStorage.getItem("task-status");
    let index = 0;
    if (!storedTask) {
      let taskArray = [];
      taskArray.push(task);
      localStorage.setItem("task", JSON.stringify(taskArray));
      taskStatus = ["uncompleted"];
      localStorage.setItem("task-status", JSON.stringify(taskStatus));
    } else {
      storedTask = JSON.parse(storedTask);
      storedTask.push(task);
      taskStatus = JSON.parse(taskStatus);
      index = storedTask.indexOf(task);
      taskStatus.push("uncompleted");
      localStorage.setItem("task", JSON.stringify(storedTask));
      localStorage.setItem("task-status", JSON.stringify(taskStatus));
    }
    const item = document.createElement("li");
    item.classList.add("todo-item");
    item.dataset.index = index;
    item.innerHTML = `
      <div class="left-operation">
        <i class="far fa-circle status"></i>
        <p class="task">${task}</p>
      </div>
      <div class="right-operation">
        <i class="far fa-edit edit"></i>
        <i class="far fa-trash-alt delete"></i>
      </div>
    `;
    todoList.appendChild(item);
  }
};

addBtn.addEventListener("click", () => {
  addTask.classList.toggle("show-input");
  if (addTask.classList.contains("show-input")) {
    addInput.focus();
  } else {
    addToList(addInput.value);
    addInput.value = "";
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    changeStatus(e.target);
  }
});

addInput.addEventListener("keyup", (key) => {
  if (key.keyCode == 13) {
    addToList(addInput.value);
    addInput.value = "";
    addTask.classList.remove("show-input");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showTask();
});
