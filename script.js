const headerInput = document.querySelector(".header__input");
const headerSelect = document.querySelector(".header__select");
const headerButton = document.querySelector(".header__button");
const main = document.querySelector(".main");
const todoTemplate = document.querySelector(".todo__template");
const footerButton = document.querySelector(".footer__button");
const modal = document.querySelector(".modal");
const modalCancel = document.querySelector(".modal__cancel");
const modalApply = document.querySelector(".modal__apply");

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
modalCancel.addEventListener("click", () => {
  modal.classList.remove("modal__open");
});

headerButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function renderTodos(list) {
  list.forEach((task) => {
    const clone = todoTemplate.content.cloneNode(true);
    main.append(clone);
  });
}
renderTodos(todos);
