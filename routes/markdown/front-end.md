### Front-end

#### HTML (Hypertext Markup Language)

Structure of websites.

Here's the HTML code for a todo list:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TODO list</title>
    </head>

    <body>
        <div class="container">
            <div class="form">
                <input type="text" />
                <button>Add</button>
            </div>

            <div class="todos">
                <div class="todo"><input type="checkbox" />Buy milk</div>
                <div class="todo"><input type="checkbox" />Walk dog</div>
            </div>

            <div class="completed">
                <div class="todo"><input type="checkbox" checked />Hate React</div>
            </div>
        </div>
    </body>
</html>
```

Which looks like this:

<div class="todo-example">
    <div class="form">
        <input type="text" />
        <button>Add</button>
    </div>
    <div class="todos">
        <div class="todo"><input type="checkbox" />Buy milk</div>
        <div class="todo"><input type="checkbox" />Walk dog</div>
    </div>
    <div class="completed">
        <div class="todo"><input type="checkbox" checked />Hate React</div>
    </div>
</div>

#### CSS (Cascading Style Sheets)

Looks of websites.

This CSS code, in combination with the HTML above...

```css
.container {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.form {
    display: flex;
    gap: 10px;
}

.todos,
.completed {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    max-height: 200px;
    padding: 0px 10px 10px 0px;
}

.todo {
    display: flex;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    align-items: center;
    gap: 10px;
}

.todo:hover {
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.5);
}

.completed {
    opacity: 0.5;
}

input[type="text"] {
    font-size: 16px;
    padding: 7px;
    border-radius: 3px;
    border: 1px solid #ddd;
    width: 100%;
}

input[type="checkbox"] {
    height: 20px;
    width: 20px;
    cursor: pointer;
}

button {
    font-size: 16px;
    border-radius: 3px;
    border: 0px;
    cursor: pointer;
    background: #555;
    color: white;
}

button:hover {
    background: #222;
}
```

Gives us this:

<div class="todo-container">
    <div class="form">
        <input type="text" />
        <button>Add</button>
    </div>
    <div class="todos">
        <div class="todo"><input type="checkbox" />Buy milk</div>
        <div class="todo"><input type="checkbox" />Walk dog</div>
    </div>
    <div class="completed">
        <div class="todo"><input type="checkbox" checked />Hate React</div>
    </div>
</div>

#### Responsive

This is simply using different CSS for different screen sizes.

This makes the text smaller on phones:

```css
@media only screen and (max-device-width: 600px) {
    body {
        font-size: 10px;
    }
}
```

#### Javascript

There are many programming languages, but ONLY Javascript works in the browser i.e. front-end, so you must learn it.

#### Objects

These represent a thing.

```js
{ id: 1, title: "Buy milk", completed: false }
```

#### Arrays

This is a collection of things.

```js
[
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Walk dog", completed: false },
    { id: 3, title: "Hate React", completed: true },
];
```

#### Variables

We can store things as a value for further use.

```js
let todos = [
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Walk dog", completed: false },
    { id: 3, title: "Hate React", completed: true },
];
```

#### Loops

This is used to go throught every item, and possibly do something with it. There are 2 ways to do this.

for loop

```js
for (let i = 0; i < todos.length; i++) {
    console.log(todo);
}
```

forEach loop

```js
todos.forEach((todo) => {
    console.log(todo);
});
```

#### Conditions

We can define rules when something can happen.

```js
for (let i = 0; i < todos.length; i++) {
    if (todo.completed) {
        console.log(todo);
    }
}
```

#### Functions

Give a name to a group of code, and make it executable more than once.

```js
// We define it
function showCompletedTodos() {
    for (let i = 0; i < todos.length; i++) {
        if (todo.completed) {
            console.log(todo);
        }
    }
}

// And we use it
showCompletedTodos();
```

#### DOM (Document Object Model)

It represents the HTML structure of a page as a collection of objects.

This allows changing the UI via code, instead of HTML and CSS.

For example, we can add new todo item like this:

```js
let todos = document.querySelector(".todos");

let todo = document.createElement("div");
todo.className = "todo";

let checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");

todo.append(checkbox);
todo.append("Learn DOM events next");

todos.append(todo);
```

Or, even simpler, we can do this:

```js
let todos = document.querySelector(".todos");

todos.innerHTML += `
    <div class="todo">
        <input type="checkbox" />
        Learn DOM events next
    </div>
`;
```

And we can create a function for it:

```js
function addTodo() {
    let input = document.querySelector("input");

    let todos = document.querySelector(".todos");

    todos.innerHTML += `
        <div class="todo">
            <input type="checkbox" />
            ${input.value}
        </div>
    `;

    todos.scrollTop = todos.scrollHeight;

    input.value = "";
    input.focus();
}
```

We will use this function below.

#### Events

Every time we interact with HTML, events are sent. They can be moving the mouse, mouse clicks, key presses, hovering over an element...

And we can exexute some code when they happen.

Like this:

```html
<button onclick="addTodo()">Add TODO</button>
```

Or like this:

```js
let button = document.querySelector("button");

btn.onclick = function () {
    addTodo();
};
```

#### addEventListener

A more flexible and modern approach for handling events.

When a button is clicked...

```js
document.querySelector("button").addEventListener("click", addTodo);
```

Or when the "Enter" key is pressed.

```js
document.querySelector("input").addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        addTodo();
    }
});
```

Try it here:

<div class="todo-container js-dom-example">
    <div class="form">
        <input type="text" />
        <button>Add</button>
    </div>
    <div class="todos">
        <div class="todo"><input type="checkbox" />Buy milk</div>
        <div class="todo"><input type="checkbox" />Walk dog</div>
    </div>
    <div class="completed">
        <div class="todo"><input type="checkbox" checked />Hate React</div>
    </div>
</div>

The new todos are not permanent because they are not stored in a database. When you refresh the page, they will be gone.

I order to save them, or retrieve them from a database, we need to use AJAX.

#### AJAX (Asynchronous JavaScript And XML)

Used to send HTTP requests from client to server, without reloading the web page.

Instead of getting the whole page as HTML from the server, we can only get just the data and we can show it in the client via the DOM.

The data is received in the JSON format.

#### JSON (JavaScript Object Notation)

The data recieved from servers looks like this:

```json
[
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    }
]
```

The same format is used for sending data.

#### XHR (XMLHttpRequest)

The original way to do AJAX looked like this:

```js
let xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/todos", true);

xhr.onload = function () {
    console.log(JSON.parse(xhr.responseText));
};

xhr.send();
```

#### fetch

A much nicer way to do AJAX:

```js
fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => console.log(data));
```

#### async/await

An cleaner way to do fetch.

```js
let response = await fetch("https://jsonplaceholder.typicode.com/todos");
let data = await response.json();
console.log(data);
```

#### API (Application Programming Interface)

API = server that sends and receives data

This can also be called a web service or back-end.

When the button receives a click EVENT, we will use AJAX to make an HTTP GET request to the typicode API, which will send us JSON, which we then convert it into HTML and add it to the DOM.

<div class="ajax-example">
    <button>Get TODOS</button>
    <b>JSON</b>
    <div class="json"></div>
    <b>HTML</b>
    <div class="html"></div>
</div>

This is the code:

```js
document.querySelector("button").addEventListener("click", async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let todos = await response.json();

    let json = document.querySelector(".json");

    json.innerHTML = JSON.stringify(todos);

    let html = document.querySelector(".html");

    todos.forEach((todo) => {
        html.innerHTML += `
            <div class="todo">
                <input type="checkbox" ${todo.completed ? "checked" : ""}/>
                ${todo.title}
            </div>
        `;
    });
});
```

This was someone else's API/back-end. Now it's time to build your own, but first, some Linux!
