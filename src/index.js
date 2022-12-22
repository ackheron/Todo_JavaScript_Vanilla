import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
    {
        text: "Je suis une todo",
        done: false,
        editMode: false,
    },
    {
        text: "faire du javascript",
        done: true,
        editMode: true,
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
        if (todo.editMode) {
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    ul.innerHTML = "";
    ul.append(...todosNode);
};

/**
 * Création d'un élément Todo
 * @param {{text: string, done:boolean, editMode: boolean}} todo objet contenu dans le tableau todos
 * @param {number} index nombre index de l'objet courant
 * @returns
 */
const createTodoElement = (todo, index) => {
    const li = document.createElement("li");

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Supprimer";
    buttonDelete.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleTodo(index);
    });

    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Éditer";
    buttonEdit.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleEditMode(index);
    });

    li.innerHTML = `
        <span class="todo ${todo.done ? "done" : ""}"></span>
        <p>${todo.text}</p>
    `;
    li.append(buttonEdit, buttonDelete);
    li.addEventListener("click", (event) => {
        event.preventDefault();
        toggleTodo(index);
    });
    return li;
};

/**
 * Création d'un élément Todo en mode édition
 * @param {{text: string, done:boolean, editMode: boolean}} todo objet contenu dans le tableau todos
 * @param {number} index nombre index de l'objet courant
 * @returns
 */
const createTodoEditElement = (todo, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;

    const buttonSave = document.createElement("button");
    buttonSave.innerText = "Enregistrer";
    buttonSave.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        editTodo(index, input);
    });

    const buttonCancel = document.createElement("button");
    buttonCancel.innerText = "Annuler";
    buttonCancel.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleEditMode(index);
    });
    li.append(input, buttonCancel, buttonSave);
    return li;
};

/**
 * Ajout d'une todo en empêchant l'entrée d'une chaîne vide
 * @param {string} text
 */
const addTodo = (text) => {
    text = text.trim(); // méthode trim() supprime les espaces vides avant et après une chaîne de caractères
    if (text) {
        todos.push({
            text: `${text[0].toUpperCase()}${text.slice(1)}`,
            done: false,
        });
    }

    displayTodo();
};

/**
 * Suppression d'une todo
 * @param {number} index nombre de l'index de la todo
 */
const deleTodo = (index) => {
    todos.splice(index, 1);
    displayTodo();
};

/**
 * Changement de status d'un todo
 * @param {number} index nombre de l'index de la todo
 */
const toggleTodo = (index) => {
    todos[index].done = !todos[index].done;
    displayTodo();
};

/**
 * Passage d'une todo en mode édition
 * @param {number} index nombre de l'index de la todo
 */
const toggleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
};

// Modification du texte d'une todo en mode edition
/**
 *
 * @param {number} index
 * @param {HTMLInputElement} input
 */
const editTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    displayTodo();
};

displayTodo();
