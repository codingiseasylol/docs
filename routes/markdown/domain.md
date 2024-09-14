### Domain

#### Domain

User-friendly name for an IP addresse, like contact name.

They are sold and managed by domain registrars.

You can buy a domain here:

<a href="https://www.namecheap.com">https://www.namecheap.com</a>

After you buy it, you need to go to the Networking page in your Host (cloud provider):

![](pics/topics/digitalocean-networking.jpg)

And add your domain:

![](pics/topics/digitalocean-networking-domain.jpg)

After this, you have to configure the `NS` i.e. name servers.

#### NS (Name Servers)

Name servers define which `DNS` server to use i.e which server contains the actual DNS records.

You need to configure this on both the reigstrar's side, as we all the host's side.

For the registrar, you go to your domain and click on manage.

![](pics/topics/namecheap-domains.jpg)

And inside, you add your host's nameservers under `custom DNS`.

![](pics/topics/namecheap-ns.jpg)

And, for the host's side, you do the same. Usually done automatically when you add the domain.

![](pics/topics/digitalocean-ns.jpg)

#### DNS (Domain Name System)

Container `domains` into `IP addresses`, like a phonebook.

It contains various DNS records which associate server locations to letters.

It's done because computers only understand numbers (IP address), not letters (domain).

It works automatically in the background.

#### A Record

Connects the `domain` name to the `IP address`.

It's done like this:

1. Type `@` in the "hostname" field.
2. Select your server's `IP address` in the "Will direct to" field.
3. Click "Create record"

![](pics/topics/digitalocean-networking-a-record.jpg)

#### CNAME

This record is for defining an alias. This is used so that the `www` in `www.domain.com` can work.

![](pics/topics/digitalocean-networking-cname.jpg)

#### Propagation

You need to wait for some time for the configurations to go live, first for the `NS` (name servers) and then for the `domain`.

It's not uncommon to take 24+ hours.

You can check how far they've propagated with this tool:

<a href="https://www.whatsmydns.net">https://www.whatsmydns.net</a>

For the `NS` (name server) record:

![](pics/topics/whatsmydns-ns.jpg)

For the `A` (domain) record:

![](pics/topics/whatsmydns-a.jpg)

#### SSL (Secure Sockets Layer)

This is `https` instead of `http` i.e. the data sent via HTTP is encrypted.

To add this to your server, you can use `certbot` to generate the certificates, and then add them in the `NGINX` configuration.

#### certbot

Linux package for issuing and renewing `SSL` certificates for `domains` and `subdomains`.

Note that they need **SEPARATE** certificates.

Install `certbot`:

```bash
sudo snap install --classic certbot
```

**BEFORE USING IT, YOU MUST DISABLE `NGINX` BECAUSE `certbot` USES IT'S OWN VERSION. YOU MUST KILL EVERY PROCESS.**

**DO NOT ADD THE CERTIFICATES IN `NGINX` BEFORE THEY ARE CREATED.**

**MAKE SURE THAT `A` RECORDS EXIST IN THE `DNS` BEFORE ISSUING.**

```bash
sudo killall nginx
```

You can now create an `SSL` certificate:

```bash
sudo certbot certonly --nginx -d codingiseasy.lol
```

![](pics/topics/ssl-certbot.jpg)

You can see the `certificate` i.e. `keys` like this:

![](pics/topics/ssl-keys.jpg)

The `nginx.conf` file must now be changed to include them.

Here's the **FULL** `nginx.conf` for this website.

**website/nginx.conf** (static)

```nginx
server {
    listen 80;

    server_name codingiseasy.lol www.codingiseasy.lol;

    return 301 https://codingiseasy.lol$request_uri;
}


server {
    listen 443 ssl;

    server_name codingiseasy.lol;

    ssl_certificate /etc/letsencrypt/live/codingiseasy.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/codingiseasy.lol/privkey.pem;

    root /home/user/website;
    index index.html;
}
```

**docs/nginx.conf** (SSR - Server Side Rendering)

```nginx
server {
    listen 80;

    server_name docs.codingiseasy.lol;

    return 301 https://docs.codingiseasy.lol$request_uri;
}

server {
    listen 443 ssl;

    server_name docs.codingiseasy.lol;

    ssl_certificate /etc/letsencrypt/live/docs.codingiseasy.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docs.codingiseasy.lol/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
    }
}
```

**todo/nginx.conf** (SPA - Single Page App i.e. front-end + back-end)

```nginx
server {
    listen 80;

    server_name todo.codingiseasy.lol;

    return 301 https://todo.codingiseasy.lol$request_uri;
}

server {
    listen 443 ssl;

    server_name todo.codingiseasy.lol;

    ssl_certificate /etc/letsencrypt/live/todo.codingiseasy.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/todo.codingiseasy.lol/privkey.pem;

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

You can now start/restart/reload `NGINX` for this to work:

```bash
service nginx start
```

The app will now be available with `SSL` at:

```text
https://codingiseasy.lol
```

If it still doesn't work, it's probably a caching issue. Try opening the domain:

-   In an `incognito` window.
-   On your phone via `5G` instead of `WiFI`.
