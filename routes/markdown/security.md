### Security

#### .env

It's not a good idea to store your database credentials in code.

A better way is to store them in a `.env` file.

This file is nothing magical, just a agreed upon way.

It looks like this:

```env
DB_NAME=todo
DB_USER=root
DB_PASSWORD=root
```

This is a package that reads `.env` files, and makes the content available in `server.js`.

Install it like this:

```bash
npm install dotenv --save
```

And use this `.env` file...

```env
DB_NAME=todo
DB_USER=root
DB_PASSWORD=root
```

In your `db.js` file like this:

```js
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports.db = {
    server: "localhost",
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 100,
};
```

#### Authentication

In order to implement authentication, the app needs to be modified in several places:

-   Create the `user` database table.
-   Add a `userId` column in the `todo` table, so we which todo belongs to which user.
-   Create a `signup` page so users can be created.
-   Create a `login` page for existing users.
-   Create the `API` endpoints for signup and login.
-   Install the `JWT` (tokens) issuing library.
-   Install the `SHA256` hashing algorithm for safely storing passwords.
-   Add a `router` so that we can redirect anyone without access to the `login` page.
-   Modify the `SQL` queries to have a `userId` `where` clause, so users get only their todos.
-   Add `middleware` for token verification.

You can see the whole code in the [TODO](#todo) topic.

Before we do that, let's see how `JWT` and `SHA256` work.

#### JWT (JSON Web Token)

A token looks like this:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNDI1NTczNywiZXhwIjoxNzU1NzkxNzM3fQ.WW218MHiBX2VaU-GmTXmXvzTBe-4ZwSeg2E_HNlbTr0
```

This is actually a `base64` encoded string separated by a `.` in `3` parts.

`base64` is **NOT** encryption, it just saves characters and makes it `URL` friendly. Anyone can decode it.

If you decode it, it looks like this:

The first part `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` (header) decoded is:

```txt
{
    "alg": "HS256",
    "typ": "JWT"
}
```

The second part `eyJ1c2VySWQiOjEsImlhdCI6MTcyNDI1NTczNywiZXhwIjoxNzU1NzkxNzM3fQ` (payload) decoded is:

```txt
{
    "userId": 1,
    "iat": 1724255737,
    "exp": 1755791737
}
```

The third part `WW218MHiBX2VaU-GmTXmXvzTBe-4ZwSeg2E_HNlbTr0` (verification) decoded is a `SHA256` hash of 3 parts:

-   The `base64` of the first part (header).
-   The `base64` of the second part (payload).
-   The token secret i.e. a password you define that only the server knows.

So, what is `SHA256`?

#### httpOnly cookies

```js
let token = jwt.sign(
    {
        username: user.username,
        userId: user.id,
    },
    config.tokenSecret,
    {
        expiresIn: "7d",
    }
);

res.cookie("token", token, {
    httpOnly: true,
    secure: true,
});
```

#### Middleware

This is some code that is executed between:

-   Receiving the request and executing the query. ex. Authentication.
-   Executing the query and sending the response back. ex. Error logging.

```js
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

function authenticationMiddleware(req, res, next) {
    let token = req.cookies.token;

    jwt.verify(token, config.tokenSecret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                status: 401,
                message: "No access!",
            });
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
}

function errorLogger(err, req, res, next) {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).send({ error: "Internal Server Error" });
}

app.use(authenticationMiddleware);

app.get("/api/todos", (req, res, next) => {
    try {
        let query = `
            select *
            from todo
            ;
        `

        let todos = await pool.query(query);

        res.status(200).send(todos);
    } catch (error) {
        next(error)
    }
});

app.use(errorLogger);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

#### SHA256

It's an algorithm that converts **ANY** sized string to a fixed length random-character string, that is **IMPOSSIBLE** to convert back.

For example, the string `a` hashed is:

```text
ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
```

The password `12345678` is:

```text
ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f
```

The USA Declaration of Independence is this:

```text
c803200a5f8119e0c16b4c5da548fd9559742a86a0af2befc54416d9305554d6
```

Fun fact: This is how `crypto` works. Each `block` in the `chain` contains the `hash` of the previous `blocks`. When you are `mining`, you are actually looking for a specific number, that when added to the `block` results in `hash` that starts with several zeros.

`SHA256` is useful for 2 things:

-   Verify that some content has not been changed.
-   Make it impossible to know the content.

In our case, we store the `SHA256` hash of the user passwords, not the actual passwords. This way you don't know them, as well as anyone that steals them.

How it works in practice is, a user logs in, and his real passwords is hashed, and then compared to the hash you have in the database.

#### SQL Injection

This is **THE MOST DANGEROUS** vulnerability a back-end can have.

It is **INCREDIBLY** important to **NOT** trust **ANYTHING** that comes from the client.

Everything **MUST** be sanitized before it is executed as a query.

This is already done in the code above.

**THIS IS WHAT YOU SHOULD NEVER DO!!!**

```js
app.get("/api/todos/:todoId", (req, res) => {
    try {
        let { todoId } = req.params;

        let query = `
            select *
            from todo
            where id = ${todoId}    -- <-- THIS HERE!!!
            ;
        `

        let todo = await pool.query(query);

        res.status(200).send(todo);
    } catch (error) {
        console.log(error)
    }
});
```

Notice how the `todoId` is directly used in the query, instead of being sanitized by the `mysql` library.

This is how you get hacked.

Instead of a doing sending a `todoId` in the API request...

```text
GET https://localhost:3000/api/todos/1
```

Someone can send `SQL` code, and ruin your day, like this:

```text
GET https://localhost:3000/api/todos/1%20or%201%3D1
```

Which is this:

```text
GET https://localhost:3000/api/todos/1 or 1=1
```

Which turns your `SQL` query into:

```sql
select *
from todo
where id = 1 or 1=1
;
```

And since `1=1` is always true, the `where id = 1` is ignored, and all the todos will be returned, instead of one.

An even more fun one is this:

```text
GET https://localhost:3000/api/todos/1%3B%20drop%20database%20todo%3B%20--
```

Which is:

```text
GET https://localhost:3000/api/todos/1; drops database todo; --
```

Which is:

```sql
select *
from todo
where id = 1; drop database todo; -- ;
```

Which is bye bye to your whole database.
