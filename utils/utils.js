const fs = require("fs");
const path = require("path");
const { Marked } = require("marked");

const { markedHighlight } = require("marked-highlight");
const hljs = require("highlight.js");

function slugify(str) {
    return str
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

const renderer = {
    heading(object) {
        const id = slugify(object.text);
        return `<h${object.depth} id="${id}" class="anchor">${object.text}</h${object.depth}>`;
    },
};

const marked = new Marked(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    }),
    { renderer }
);

function markdownToHtml(markdownFileName) {
    const absolutePath = path.join(__dirname, "../routes/markdown/", markdownFileName);

    let markdown = fs.readFileSync(absolutePath, "utf8");

    let html = marked.parse(markdown);

    return /*html*/ `
        <div class="markdown">
            ${html}
        </div>
    `;
}

function markdownToObjects(markdownFileName) {
    const absolutePath = path.join(__dirname, "../routes/markdown/", markdownFileName);

    let markdown = fs.readFileSync(absolutePath, "utf8");

    let lines = markdown.split("\n");

    let objects = [];
    let subObject = {};

    lines.forEach((line) => {
        let parts = line.split(" ");

        if (parts[0] == "###") {
            if (subObject.title) {
                objects.push(subObject);
            }

            subObject = {};

            let title = line.split("### ")[1];

            subObject.title = title;
            subObject.link = slugify(title);
            subObject.items = [];
        }

        if (parts[0] == "####") {
            let subtitle = line.split("#### ")[1];

            if (!subObject.items) return;

            subObject.items.push({
                title: subtitle,
                link: slugify(subtitle),
            });
        }
    });

    if (objects.length == 0) {
        objects.push(subObject);
    }

    return objects;
}

function getOrdererFiles() {
    const absolutePath = path.join(__dirname, "../routes/", "order.txt");
    let order = fs.readFileSync(absolutePath, "utf8");
    let array = order.split("\n").filter((item) => item != "");
    return array;
}

module.exports.generateSidebar = () => {
    let sidebar = "";

    getOrdererFiles().forEach((file) => {
        let markdownObjects = markdownToObjects(file);

        markdownObjects?.forEach((object) => {
            let links = "";

            object.items?.forEach((item) => {
                links += `<a href="#${item.link}">${item.title}</a>`;
            });

            sidebar += `
                <details open>
                    <summary>
                        <h4>${object.title || ""}</h4>
                    </summary>
                    ${links}
                </details>
            `;
        });
    });

    return `
        <div class="sidebar hidden">
            ${sidebar}
        </div>
    `;
};

module.exports.generateMarkdown = () => {
    let markdown = "";
    getOrdererFiles().forEach((file) => {
        markdown += markdownToHtml(file);
    });
    return markdown;
};
