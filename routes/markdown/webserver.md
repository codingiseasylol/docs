### Webserver

#### Webserver

A program inside the server that listens for HTTP commands on port 80, and sends back content, either directly or by redirecting to another program via ports.

Without a webserver, your website cannot be accessed.

#### Ports

Used to locate programs inside the server, similar to IP addresses locating devices.

#### NGINX

The most popular webserver.

```bash
sudo apt install nginx -y;
```

Start it with:

```bash
sudo service nginx start
```

Check if it runs:

```bash
sudo service nginx status
```

Servers are configured in the `/etx/nginx/nginx.conf` file.

Here's what the simplest setup, which serves a static website, looks like:

```nginx
events {}                              # Needed to be a valid conf file.

http {
    include mime.types;                # Recognize filetypes.

    server {
        listen 8080;                   # Port number

        root /home/website;             # Match URIs to files here.
        index index.html;              # index is inside folder
    }
}
```

You can see your website at:

```text
localhost:8080
```

You can if `nginx.conf` is configured properly with:

```bash
sudo nginx -t
```

If it doesn't work, it's most probably because of permissions. You can add them like this:

```bash
sudo chown -R user:user /home/user/website && \   # Make user the owner
sudo usermod -aG www-data user && \               # Make user part of www-data group
sudo chmod -R 777 /home/user/website \;           # Read, write and execute permissions
```

#### CORS (Cross-Origin Resource Sharing)

This is **WAY** simpler than it looks.

It's just a rule saying your front-end (client) and back-end (server) must be on the same computer.

If they are not, you need to tell the back-end which front-ends can access it.

This is a security measure so that `www.hacker.ru` can't ask your `www.bank.com` do to stuff.

#### Proxy-pass

Instead of accessing your back-end from your client with `localhost:3000/api`, you use a `proxy_pass` so you can use it just with `/api`.

Here's what the configuration looks like for the todo app, that uses an API:

```nginx
events {}

http {
    include mime.types;

    server {
        listen 8081;

        root /home/todo; # Path to directory
        index index.html;

        location / {
            # Fixes refresh resulting in 404 error for single page apps
            try_files $uri $uri/ /index.html;
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

#### include

You can also split an `nginx.conf` file into mulitple files and link them in the main one.

**website/nginx.conf** (static)

```nginx
server {
    listen 80;

    root /home/user/website;
    index index.html;
}
```

**docs/nginx.conf** (SSR - Server Side Rendering)

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://127.0.0.1:5000;
    }
}
```

**todo/nginx.conf** (SPA - Single Page App i.e. front-end + back-end)

```nginx
server {
    listen 80;

    root /home/user/todo/client;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /auth {
        proxy_pass http://127.0.0.1:3000;
    }

    location /api {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

**nginx.conf**

```nginx
events {}

http {
    include mime.types;

    include /home/user/website/nginx.conf;
    include /home/user/docs/nginx.conf;
    include /home/user/todo/nginx.conf;
}
```

#### Troubleshoot

Here are the most common reason the webserver doesn't work:

-   Forgot to restart it after changing `nginx.conf`.
-   You have an error. Check with `sudo nginx -t`.
-   You might have more than 1 process running. Stop them with `sudo killall nginx`.
-   You forgot to add:
    -   `events {}`
    -   `port`
    -   `server_name`
    -   `index`
