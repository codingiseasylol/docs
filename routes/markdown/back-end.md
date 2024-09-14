### Back-end

#### Node

Allows you to run Javascript outside of browsers i.e. on your computer directly, with access to your OS.

Don't install it directly, use `nvm`.

#### nvm (Node Version Manager)

Allows you to install multiple node versions and switch between them.

In your terminal, use this command to install it:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

This command uses the `curl` program to download the `install.sh` file from the link, and then execute it by `piping` it to the `bash` program.

**MUST RESTART TERMINAL AFTER INSTALL FOR `nvm` TO WORK!**

Check if it works with:

```bash
nvm -v
```

Now install node:

```bash
nvm install node
```

Check if it works with:

```bash
node -v
```

#### Script

You can execute this `hello.js` script...

```js
console.log("Hello World!");
```

Like this in the terminal:

```bash
node hello.js
```

#### npm

Installs `node` packages/libraries/modules...

Which are then used inside of your code.

Basically, you download someone else's code, and use it, instead of writing it.

You do it like this:

```bash
npm install PACKAGE_NAME
```

This creates a `node_modules` folder where all the packages go.

Now, instead of manually installing mulitple packages, you can just do...

```bash
npm install
```

Which will look for all packages listed inside a file called `package.json`

#### package.json

This file includes all the packages used in your project. You can create one with:

```bash
npm init
```

It looks like this:

```json
{
    "name": "app",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {},
    "author": "",
    "license": "ISC",
    "description": ""
}
```

To add a package, you can either write it manually, or add `--save` to your install command:

```bash
npm install mysql --save
```

The `package.json` file will look like this now:

```json
{
    "name": "app",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {},
    "author": "",
    "license": "ISC",
    "description": "",
    "dependencies": {
        "mysql": "^2.18.1"
    }
}
```

You can install all the packages listed in dependencies at once with:

```bash
npm install
```

#### express

This is an `npm` package used for creating an `API` i.e. back-end, like the todos one shown before.

```bash
npm install express --save
```

Here's a very simple server/API, similar to the one we used before...

Put this code inside a `server.js` file:

```js
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

app.get("/api/todos", (req, res) => {
    let todos = [
        { id: 1, title: "Buy milk", completed: false },
        { id: 2, title: "Walk dog", completed: false },
        { id: 3, title: "Hate React", completed: true },
    ];

    res.status(200).send(todos);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

And run it with:

```bash
node server.js
```

Now, in your browser, go to this URL:

```text
http://localhost:3000/api/todos
```

And you should see the todos `JSON`.

Note that the todos are hard-coded in the API. In a real API, these would come form the database.

#### nodemon

An `npm` package for continuously running a node script, especially when it fails.

You install it like this:

```bash
npm install nodemon
```

And then you run the server with:

```bash
nodemon server.js
```

You can do it like this:

#### REST

A mutually-agreed convention how to write API endpoints/routes/URLs/URIs.

| Method | Resource  | Result                 |
| ------ | --------- | ---------------------- |
| GET    | /todos    | Get a list of todos    |
| GET    | /todos/12 | Get a specific todo    |
| POST   | /todos    | Create a new todo      |
| PATCH  | /todos/12 | Update todo with ID 12 |
| DELETE | /todos/12 | Delete todo with ID 12 |

Here's what the full `server.js` file would look like.

```js
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

let todos = [
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Walk dog", completed: false },
    { id: 3, title: "Hate React", completed: true },
];

app.get("/api/todos", (req, res) => {
    res.status(200).send(todos);
});

app.get("/api/todos/:todoId", (req, res) => {
    let { todoId } = req.params;
    let todo = todos.find((item) => item.id == todoId);

    res.status(200).send(todo);
});

app.post(`/api/todos`, async (req, res) => {
    let todo = req.body;

    let newTodo = {
        id: todos.length + 1,
        title: todo.title,
        completed: todo.completed,
    };

    todos.push(newTodo);

    res.status(200).send(newTodo);
});

router.patch(`/api/todos/:todoId`, async (req, res) => {
    let { todoId } = req.params;
    let todo = req.body;

    let updatedTodo = todos.find((item) => item.id == todoId);

    updatedTodo.title = todo.title;
    updatedTodo.completed = todo.completed;

    res.status(200).send(updatedTodo);
});

router.delete(`/api/todos/:todoId`, async (req, res) => {
    let { todoId } = req.params;

    todos = todos.filter((item) => item.id != todoId);

    res.status(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```
