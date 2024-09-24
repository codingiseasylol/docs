### Database

#### DBMS (Database Management System)

Software for creating databases and handling the data in them.

The most popular ones are:

-   MySQL
-   SQL Server
-   Postgresql
-   SQLite.

#### MySQL

The most widely used one. Here are some popular users:

-   Facebook
-   YouTube
-   Twitter
-   Netflix
-   Google
-   WordPress

You install it like this:

```bash
sudo apt install mysql-server -y
```

Start it with:

```bash
sudo service mysql start
```

Check if it runs:

```bash
sudo service mysql status
```

Log in with:

```bash
sudo mysql
```

Once logged in, you need to update the authentication method for the `root` user to use a password.

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
```

![](pics/topics/mysql-root.jpg)

Log out:

```bash
exit
```

Now try logging in with the new password:

```bash
sudo mysql -u root -p
```

If you can't login, this is probably the problem:

-   MySQL is not started. Start it with `sudo service mysql start`.
-   You are not using `sudo`.
-   There is no password. Login with just `sudo mysql`.

#### SQL (Structured Query Language)

The language used to interact with the database via commands called queries.

Once you are logged in the `DBMS` i.e. `MySQL`, you use `SQL`.

#### Workbench

You can execute `SQL` queries in the terminal or in an app with an actual user interface.

You can download it here:

[https://www.mysql.com/products/workbench](https://www.mysql.com/products/workbench/)

And it looks like this:

![](pics/topics/mysql-workbench.jpg)

We will use the terminal for the practice.

#### Schema

The database is all the data. Think of it as an Excel file.

The schema is the blueprint for a database i.e. everything that is not the actual data.

Ex. table definitions, colum definitions, data types, relationships, indexes...

Think of it as the settings in the Excel file.

You can see the databases with this SQL query:

```sql
show databases;
```

Or you can create your own:

```sql
create database todo;
```

Note that you must select the database in order to do things in it.

```sql
use todo;
```

#### Table

Data is organized in tables. Think of them like sheets in an Excel file.

Every table has columns and rows. Exactly like in Excel.

You can see the all the tables in a database with:

```sql
show tables;
```

Or you can create one:

```sql
create table todo (
    id int primary key auto_increment,
    title varchar(255),
    completed int
);
```

#### Columns

When you created the table, you also defined the columns it will have and their names, along with the type of data they will store.

This of them like the titles of Excel columns.

You can also add a column after a table is created:

```sql
alter table todo add created datetime;
```

#### Rows

The actual data is store in rows, the same as Excel.

Every row is a collection of values that correspond to the columns.

You add rows like this:

```sql
insert into todo (title, completed, created) values ('learn SQL', 0, now());
```

You can add multiple at once:

```sql
insert into todo
    (title, completed, created)
values
    ('Create you dream idea', 0, now()),
    ('???', 0, now()),
    ('Profit!', 0, now())
;
```

You can see the result of this with:

```sql
select * from todo;
```

If you want to update a value, you do this:

```sql
update todo set completed = 1 where id = 1;
```

**IT IS SUPER IMPORTANT TO USE A `where` CLAUSE, BECAUSE THIS WILL UPDATE EVERY ROW, NOT JUST THE ONE YOU WANT!!!**

**THE SAME APPLIES WHERE DELETING DATA!!!**

```sql
delete from todo where id = 1;
```

**A GOOD PRACTICE IS TO FIRST SELECT THE DATA, THEN UPDATE OR DELETE IT.**

#### node + mysql

This is a database driver, which is a fancy way to say an npm package for connecting to your database.

There are many, but the best one is the default `mysql` one.

```bash
npm install mysql --save
```

#### Connection

You connect to your database like this:

```js
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    database: "todo",
    user: "root",
    password: "root",
});

connection.connect();
```

And then you run your queries:

```js
connection.query("select * from toro");
```

And you end the connection.

```js
connection.end();
```

#### Pool

Opening and closing conections is costly, so a better way is to connect once, create a bunch of connections, and then just borrow them for executing queries, and finally returning them.

The best way to do this is to create the following files:

**db.js**

```js
module.exports.db = {
    host: "localhost",
    database: "todo",
    user: "root",
    password: "root",
    connectionLimit: 100,
};
```

**pool.js**

```js
const mysql = require("mysql");
const db = require("./db.js");

const pool = mysql.createPool(db);

module.exports = pool;
```

Optionally add this "promisify" code in the `pool.js` file to make the `query` function asynchronous i.e. `async/await`.

```js
const util = require("util");
pool.query = util.promisify(pool.query);
```

Finally, you can now use actual `SQL` in your `server.js`.

It's a good idea to handle errors when executing queries.

```js
let express = require("express");
let pool = require("./pool.js");

let app = express();
let port = 3000;

app.use(express.json());

app.get("/api/todos", (req, res) => {
    try {
        let query = `
            select *
            from todo
            ;
        `

        let todos = await pool.query(query);

        res.status(200).send(todos);
    } catch (error) {
        console.log(error)
    }
});


app.get("/api/todos/:todoId", (req, res) => {
    try {
        let { todoId } = req.params;

        let query = `
            select *
            from todo
            where id = ?
            ;
        `

        let todo = await pool.query(query, [todoId]);

        res.status(200).send(todo);
    } catch (error) {
        console.log(error)
    }
});

app.post(`/api/todos`, async (req, res) => {
    try {
        let todo = req.body;

        let query = `
            insert into todo
                (
                    title,
                    completed,
                    created
                )
            values
                (
                    ?,
                    ?,
                    now()
                )
            ;
        `;

        let todo = await pool.query(query, [userId,todo.completed, todo.title]);

        res.status(200).send(todo);
    } catch (error) {
        console.log(error)
    }
});

app.patch(`/api/todos/:todoId`, async (req, res) => {
    try {
        let { todoId } = req.params;
        let todo = req.body;

        let query = `
            update todo
            set
                title = ?,
                completed = ?
            where id = ?
            ;
        `;

        let todo = await pool.query(query, [todo.title, todo.completed, todoId]);

        res.status(200).send(todo);
    } catch (error) {
        console.log(error)
    }
});

router.delete(`/api/todos/:todoId`, async (req, res) => {
    try {
        let { todoId } = req.params;

        let query = `
            delete from todo
            where id = ?
            ;
        `;

        let todo = await pool.query(query, [todoId]);

        res.status(200)
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```
