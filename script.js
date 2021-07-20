const addBtn = document.querySelector(".add-task-btn");
const addTask = document.querySelector(".add-task");

addBtn.addEventListener("click", () => {
  addTask.classList.toggle("show-input");
  if (addTask.classList.contains("show-input")) {
    addBtn.setAttribute("style", "transform: rotate(45deg);")
  } else {
    addBtn.setAttribute("style", "transform: rotate(0);")
  }
})