let express = require("express");
let router = express.Router();

let head = require("./layout/head");
let header = require("./layout/header");
let footer = require("./layout/footer");

const { generateSidebar, generateMarkdown } = require("../utils/utils");

router.get("/", (req, res) => {
    let html = /*html*/ `
        ${head}

        ${header}
        
        ${generateSidebar()}

        <div class="content">
            
            ${generateMarkdown()}

        </div>

        ${footer}
    `;

    res.send(html);
});

module.exports = router;
