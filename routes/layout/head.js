let head = /*html*/ `
    <!DOCTYPE html>
    <html>
        <head>
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-WBY86M0XEG"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-WBY86M0XEG');
            </script>

            <title>DOCS - codingiseasy.lol</title>
            <link rel="shortcut icon" href="/pics/codingiseasy_favicon.png" type="image/x-icon" />
            <link rel="icon" href="/pics/codingiseasy_favicon.png" type="image/x-icon" />
            
            <!-- SEO Keywords -->
            <meta name="keywords" content="learn, create, web, app, from, scratch, by, yourself, self, taught, full, stack" />

            <!-- HTML Meta Tags -->
            <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
            <meta name="description" content="Learn to create web apps. From scratch. By yourself." />
            <meta name="robots" content="index, follow" />

            <!-- Social Meta Tags -->
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://docs.codingiseasy.lol" />
            <meta property="og:site_name" content="http://docs.codingiseasy.lol" />
            <meta property="og:title" content="docs.codingiseasy.lol" />
            <meta property="og:description" content="Learn to create web apps. From scratch. By yourself." />
            <meta property="og:image" content="http://docs.codingiseasy.lol/pics/codingiseasy_banner.jpg" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />

            <link rel="stylesheet" type="text/css" href="style.css" />
            <link rel="stylesheet" type="text/css" href="todo.css" />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/stackoverflow-dark.min.css" />

        </head>

        <body>
`;

module.exports = head;
