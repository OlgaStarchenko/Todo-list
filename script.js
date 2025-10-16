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
const modalTitle = document.querySelector(".modal__title");
const emptyTemplate = document.querySelector(".empty__template");

let editTodo = null;

let todos = getList();

footerButton.addEventListener("click", openModal);
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

  if (editTodo) {
    todos = todos.map((todo) => {
      if (editTodo.id === todo.id) {
        todo.text = value;
      }
      return todo;
    });
  } else {
    todos.push({
      id: Date.now(),
      text: value,
      isComplete: false,
    });
  }

  renderTodos(todos);
  closeModal();
});

headerInput.addEventListener("input", () => {
  const value = headerInput.value.trim();
  const serchTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(value.toLowerCase())
  );
  renderTodos(serchTodos);
});

headerSelect.addEventListener("change", () => {
  const value = headerSelect.value;
  let filterTodos = todos;
  if (value === "complete") {
    filterTodos = todos.filter((todo) => todo.isComplete);
  } else if (value === "incomplete") {
    filterTodos = todos.filter((todo) => !todo.isComplete);
  }
  renderTodos(filterTodos);
});

function renderTodos(list) {
  main.innerHTML = null;
  if (list.length === 0) {
    showEmpty();
  }
  list.forEach((task) => {
    const clone = todoTemplate.content.cloneNode(true);
    const todoName = clone.querySelector(".todo__name");
    const todoDelete = clone.querySelector(".todo__delete");
    const todoEdit = clone.querySelector(".todo__edit");
    const todoCheck = clone.querySelector(".todo__check");
    todoDelete.addEventListener("click", () => deleteTodo(task));
    todoCheck.addEventListener("click", () => completeTodo(task));
    todoEdit.addEventListener("click", () => startEdit(task));
    todoName.textContent = task.text;
    if (task.isComplete) {
      const todo = clone.querySelector(".todo");
      todo.classList.add("todo__complete");
    }
    main.append(clone);
  });
  saveList();
}

function openModal() {
  modal.classList.add("modal__open");
}

function closeModal() {
  modal.classList.remove("modal__open");
  modalInput.value = "";
  modalTitle.textContent = "NEW NOTE";
  editTodo = null;
}

function deleteTodo(task) {
  todos = todos.filter((el) => el.id !== task.id);
  renderTodos(todos);
}

function completeTodo(task) {
  task.isComplete = !task.isComplete;
  renderTodos(todos);
}

function startEdit(task) {
  editTodo = task;
  modalTitle.textContent = "EDIT NOTE";
  openModal();
  modalInput.value = task.text;
}
renderTodos(todos);

function showEmpty() {
  const clone = emptyTemplate.content.cloneNode(true);
  main.append(clone);
}

function saveList() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getList() {
  const saveTodos = localStorage.getItem("todos");
  if (saveTodos) {
    return JSON.parse(saveTodos);
  } else {
    return [];
  }
}
