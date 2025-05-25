//toggle buttons for todo list and contact us div's.
const contactUsButton = document.getElementById("contact-us-button");
const todoListButton = document.getElementById("todo-list-button");

//Containers for todo list and contact us form and hiding them by default
const contactFormContainer = document.getElementById("contact-form-container");
const todoListContainer = document.getElementById("todo-list-container");
contactFormContainer.style.display = "none";
todoListContainer.style.display = "none"

//ToDo List elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


//Contact Form elements
const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

//Toggling the visibility of contact form and todo list
contactUsButton.addEventListener('click', function () {
    if (contactFormContainer.style.display === "none") {
        contactFormContainer.style.display = "block";
        todoListContainer.style.display = "none";
    } else {
        contactFormContainer.style.display = "none";
    }
});
todoListButton.addEventListener('click', function () {
    if (todoListContainer.style.display === "none") {
        todoListContainer.style.display = "block";
        contactFormContainer.style.display = "none";
    } else {
        todoListContainer.style.display = "none";
    }
});

//todo list logic
const todos = []
function createTodoItem(todoText, index) {
    const li = document.createElement("li");
    li.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick = () => {
        todos.splice(index, 1);
        renderTodos();
    };

    li.appendChild(deleteBtn);
    return li;
}

function renderTodos() {
    todoList.innerHTML = ""; // Clear current list
    todos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);
    });
}

todoForm.onsubmit = function (evt) {
    evt.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("Please enter a todo item");
        return;
    }
    todos.push(todoText);
    todoInput.value = "";
    renderTodos();
};






//Contact form logic
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function validateForm() {
    if (nameInput.value === "" || emailInput.value === "" || messageInput.value === "") {
        alert("Please fill in all fields");
        return false;
    }
    if (!validateEmail(emailInput.value)) {
        alert("Please enetr a valid email address!!")
        return false;
    }
    return true;
}
submitButton.onclick = function (evt) {
    evt.preventDefault();
    if (validateForm()) {
        alert("Thank you " + nameInput.value + " for contacting us");
    }
}