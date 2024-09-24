### Deployment

#### rsync

This is a Linux package for transfering files.

We use this to transfer our code from our local computer to the remote server.

Here's the command, which you run on your local machine:

```bash
rsync -av -e 'ssh' ./client ./server --exclude 'server/node_modules' --exclude 'server/package-lock.json' --exclude 'server/.env' user@46.101.132.192:~/todo/
```

In order to see any changes, you need to restart your `pm2` daemon:

```bash
ssh user@46.101.132.192 pm2 reload /home/user/todo/server/server.js --name "todo"
```

You can put both commands inside a `deploy.sh` file...

```bash
rsync -av -e 'ssh' ./server --exclude 'server/node_modules' --exclude 'server/package-lock.json' --exclude 'server/.env' user@46.101.132.192:~/todo/ \
&& ssh user@46.101.132.192 pm2 reload /home/user/todo/server/server.js --name "todo"
```

So you can run the file with:

```bash
./deploy.sh
```

This will use `SSH` to transfer the `client` and `server` folders from your local machine, inside a `todo` folder on the remote machine.

It will not transfer the `node_modules` folder, as well as the `.env.` file.

You will need to manually create the `.env` file with your production credentials.

You can connect to the server to check if everything was transferred correctly.

```bash
ssh user@46.101.132.192
```

#### Production db

You need to create the database by running this command:

```bash
mysql -u root -p < schema.sql
```

#### Production .env

Create this file in the server directory:

```bash
touch .env
```

Edit it with:

```bash
vim .env
```

And put the credentials inside like you did in your local environment, but use your production (server) ones.

#### npm install

After you've transferred the files, you can now install the packages.

First go to the server folder

```bash
cd todo/server
```

And then do

```bash
npm install
```

In order for everything to work, you need to configure your `webserver` i.e. `nginx`.

#### nginx.conf

You can edit the `nginx.conf` file with:

```bash
sudo vim /etc/nginx/nginx.conf
```

The configuration should look like this:

```nginx
events {} # Needed to be a valid conf file.

    http {
    include mime.types; # Recognize filetypes.

    server {
        listen 80;

        server_name 46.101.132.192;

        root /home/user/todo/client; # Path to directory
        index index.html;

        location / {
            try_files $uri $uri/ /index.html; # Fixes refreshing resulting in 404 error for single page apps
        }

        location /auth {
            proxy_pass http://127.0.0.1:3001;
        }

        location /api {
            proxy_pass http://127.0.0.1:3001;
        }
    }
}
```

The app is now available at:

```text
46.101.132.192
```
