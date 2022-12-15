// import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
    {
        text: "Je suis une todo",
        done: false,
    },
    {
        text: "faire du javascript",
        done: true,
    },
];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value;
    input.value = "";
    addTodo(text);
});

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        return createTodoElement(todo, index);
    });
    ul.innerHTML = "";
    ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Supprimer";
    buttonDelete.addEventListener("click", (event) => {
        event.preventDefault();
        deleTodo(index);
    });

    li.innerHTML = `
        <span class="todo ${todo.done ? "done" : ""}"></span>
        <p>${todo.text}</p>
    `;
    li.appendChild(buttonDelete);
    return li;
};

const addTodo = (text) => {
    todos.push({
        text,
        done: false,
    });
    displayTodo();
};

const deleTodo = (index) => {
    todos.splice(index, 1);
    displayTodo();
};

displayTodo();

// VERSION ALTERATIVE DISPLAY TODO

// const displayTodo = () => {
//     for (const todo of todos) {
//         document.querySelector("ul").innerHTML += `
//        <li>
//         <span class="todo ${todo.done ? "done" : ""}"></span>
//         <p>${todo.text}</p>
//         <button>Éditer</button>
//         <button>Supprimer</button>
//     </li>
//         `;
//     }
// };

// displayTodo();
