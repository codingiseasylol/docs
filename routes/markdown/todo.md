### Todo

#### Code

The code is located here:

<a href="https://github.com/codingiseasylol/todo" target="blank">https://github.com/codingiseasylol/todo</a>

It is uploaded there for 2 reasons:

-   It would take too much space here.
-   Everyone should keep their code on `Github`. There's an explanation why and how to do this a bit later.

#### Download

You can download it in 3 ways:

1. Clicking on the `Code/Download ZIP` button.

![](pics/topics/todo-download.jpg)

2. Using this download link:

```text
https://github.com/codingiseasylol/todo/archive/refs/heads/main.zip
```

3. By running this terminal command:

```bash
git clone https://github.com/codingiseasylol/todo.git
```

This will create a `todo` folder with all the code, in the directory you execute the command in.

#### Setup

After the download, go inside the todo server folder via the terminal.

```bash
cd todo/server
```

1. Install all the packages.

```bash
npm install
```

2. Start the server"

```bash
nodemon server.js
```

3. Configure `nginx.conf`

```nginx
events {}

http {
    include mime.types;

    server {
        listen 8081;

        root /mnt/c/user/codingiseasylol/todo/client; # Path to directory
        index index.html;

        location / {
            try_files $uri $uri/ /index.html; # Fixes refreshing resulting in 404 error for single page apps
        }

        location /auth {
            proxy_pass 'http://127.0.0.1:3001';
        }

        location /api {
            proxy_pass 'http://127.0.0.1:3001';
        }
    }

}
```

4. Go to:

```text
localhost:8081
```
