const headerInput = document.querySelector(".header__input");
const headerSelect = document.querySelector(".header__select");
const headerButton = document.querySelector(".header__button");
const main = document.querySelector(".main");
const todoTemplate = document.querySelector(".todo__template");
const footerButton = document.querySelector(".footer__button");
const modal = document.querySelector(".modal");
const modalCancel = document.querySelector(".modal__cancel");
const modalApply = document.querySelector(".modal__apply");
const modalInput = document.querySelector(".modal__input");

let todos = [
  {
    id: 1,
    text: "note1",
    isComplete: false,
  },
  {
    id: 2,
    text: "note2",
    isComplete: true,
  },
  {
    id: 3,
    text: "note3",
    isComplete: false,
  },
];

footerButton.addEventListener("click", () => {
  modal.classList.add("modal__open");
});
modalCancel.addEventListener("click", closeModal);

headerButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

modalApply.addEventListener("click", () => {
  const value = modalInput.value;
  if (value.trim() === "") {
    alert("Название задачи не может быть пустой");
    return;
  }
  todos.push({
    id: Date.now(),
    text: value,
    isComplete: false,
  });
  renderTodos(todos);
  closeModal();
});

function renderTodos(list) {
  main.innerHTML = null;
  list.forEach((task) => {
    const clone = todoTemplate.content.cloneNode(true);
    const todoName = clone.querySelector(".todo__name");
    const todoDelete = clone.querySelector(".todo__delete");
    const todoEdit = clone.querySelector(".todo__edit");
    const todoCheck = clone.querySelector(".todo__check");
    todoDelete.addEventListener("click", () => deleteTodo(task));
    todoCheck.addEventListener("click", () => completeTodo(task));
    todoName.textContent = task.text;
    if (task.isComplete) {
      const todo = clone.querySelector(".todo");
      todo.classList.add("todo__complete");
    }
    main.append(clone);
  });
}

function closeModal() {
  modal.classList.remove("modal__open");
  modalInput.value = "";
}

function deleteTodo(task) {
  todos = todos.filter((el) => el.id !== task.id);
  renderTodos(todos);
}

function completeTodo(task) {
  task.isComplete = !task.isComplete;
  renderTodos(todos);
}
renderTodos(todos);
