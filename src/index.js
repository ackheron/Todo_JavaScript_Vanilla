import "./style.css";

const ul = document.querySelector("ul");

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

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        return createTodoElement(todo, index);
    });
    ul.innerHTML = "";
    ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="todo ${todo.done ? "done" : ""}"></span>
        <p>${todo.text}</p>
        <button>Éditer</button>
        <button>Supprimer</button>
    `;
    return li;
};

displayTodo();

// VERSION ALTERATIVE

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
