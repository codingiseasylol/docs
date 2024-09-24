### Server

#### Cloud

This is just a term for "a bunch of servers in datacenters".

#### Host

This is a business that manages datacenters and offers cloud services.

One of the services is creating your own "virtual" server (VPS), instead of creating your own physical machine.

The most user-friendly host is Digital Ocean.

You can create an account here:

<a href="https://www.digitalocean.com">https://www.digitalocean.com</a>

#### VPS (Virtual Private Server)

After you create an account, you create a server like this...

Click on Create and select Droplets (their fancy name for VPS):

![](pics/topics/digitalocean-droplet.jpg)

Select the region closest to your users:

![](pics/topics/digitalocean-region.jpg)

Choose your operating system i.e. Linux distro and version:

![](pics/topics/digitalocean-linux.jpg)

Choose your machine:

![](pics/topics/digitalocean-size.jpg)

Insert your server password:

![](pics/topics/digitalocean-password.jpg)

Give your server a name, and click "Create":

![](pics/topics/digitalocean-create.jpg)

Wait for the creation to finish:

![](pics/topics/digitalocean-loading.jpg)

And that's it! You now have your own server, living on a dedicated IP address.

![](pics/topics/digitalocean-created.jpg)

#### IP Address

This is used to identify and locate servers. Like a phone number.

In this case, the address is:

```text
46.101.132.192
```

We can now connect to it by using `SSH`.

#### SSH (Secure Socket Shell)

Think of this like Teamviewer via the terminal i.e. without a UI.

You use it like this:

```bash
ssh root@46.101.132.192
```

It will ask you for the server password.

![](pics/topics/ssh-password.jpg)

After that, you are connected to the server you created.

![](pics/topics/ssh-root.jpg)

You now **MUST** create a `user` other than `root`. This is for security reasons:

```bash
adduser user
```

And give it root access.

```bash
usermod -aG sudo user
```

Then you login as the new user.

```bash
su - user
```

You can now exit by tying, well... `exit`.

Here's the whole thing:

![](pics/topics/ssh-user.jpg)

#### Keys

Using your password for every `SSH` login is both highly inneficient and insecure.

To avoid that, you can use `private` and `public` keys.

You create them like this:

```text
ssh-keygen
```

The keys will be located in `~/.ssh`.

![](pics/topics/ssh-keys.jpg)

Now you just transfer them to the server like this:

```text
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@46.101.132.192
```

You need to use your own `public` key name.

![](pics/topics/ssh-keys-transfer.jpg)

Now you can connect without typing your password:

```bash
ssh user@46.101.132.192
```

![](pics/topics/ssh-keys-connect.jpg)

#### Environment

You can now prepare your server for your app.

You need to replicate whatever you have on your local machine.

In this case that would be...

-   Update your Linux packages. [INSTRUCTIONS](/#update)
-   Install `nvm` and `nodejs`. [INSTRUCTIONS](/#nvm)
-   Install `mysql`. [INSTRUCTIONS](/#mysql)
-   Install `nginx` (webserver). [INSTRUCTIONS](/#nginx)

#### pm2 (Process Manager)

You can run your `server.js` file with:

```bash
node server.js
```

But, to run it forever in the background and restart it automatically when it crashes, you need a `daemon`, and `pm2` is a popular choice.

You install it like this:

```bash
npm install pm2 -g
```

It is advisable to intall it globally since many apps can use it.

And then you can run your `server.js` like this:

```bash
pm2 start server.js --name "todo"
```

You can check all your running apps with:

```bash
pm2 ls
```

And you can monitor them with:

```bash
pm2 monit
```

To stop an app, use this (you need to be inside the directory):

```bash
pm2 stop server.js
```

In oder for all this to work, you need the actual code files, which we can transfer with `rsync`.
