// INITIAL ANCHOR =======================================================

window.addEventListener("load", () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);

        if (target) {
            target.scrollIntoView();
        }
    }
});

// MENU ITEM HIGHLIGHTER =======================================================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const link = document.getElementById(`link-${entry.target.id}`);

            if (entry.isIntersecting) {
                link.classList.add("active");

                link.scrollIntoView({
                    behavior: "instant", // Animates the scrolling
                    block: "center", // Aligns the element at the nearest position in the viewport
                    inline: "nearest", // Aligns it horizontally to the center if applicable
                });
            } else {
                link.classList.remove("active");
            }
        });
    },
    {
        // Adjust threshold or rootMargin as needed
        threshold: 0, // Adjusts how much of the section needs to be visible (50%)
    }
);

const titles = document.querySelectorAll("section");

titles.forEach((title) => {
    observer.observe(title);
});

// HAMBURGER =======================================================

let sidebar = document.querySelector(".sidebar");

let hamburger = document.querySelector(".hamburger").addEventListener("click", () => {
    if (sidebar.className == "sidebar hidden") {
        sidebar.className = "sidebar";
    } else {
        sidebar.className = "sidebar hidden";
    }
});

let links = document.querySelectorAll(".sidebar a");

links.forEach((element) => {
    // Add an event listener to each element
    element.addEventListener("click", () => {
        sidebar.className = "sidebar hidden";
    });
});

// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//         e.preventDefault();
//         const targetId = this.getAttribute("href");
//         const targetElement = document.querySelector(targetId);

//         if (targetElement) {
//             targetElement.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//             });
//         }

//         // Optional: Update the URL hash manually if needed
//         history.pushState(null, null, targetId);
//     });
// });

// IMAGE MODAL =======================================================

// function showModal() {
//     let modal = document.getElementById("modal");
//     modal.style.visibility = "visible";
// }

// function closeModal() {
//     let modal = document.getElementById("modal");
//     modal.style.visibility = "hidden";
//     let modalContent = document.getElementById("modal-content");
//     modalContent.innerHTML = "";
// }

// document.querySelectorAll(".feature-image").forEach((el) =>
//     el.addEventListener("click", (e) => {
//         showModal();
//         let modalWrapper = document.getElementById("modal-wrapper");
//         modalWrapper.className = "modal-image";

//         let modalContent = document.getElementById("modal-content");

//         let imageSrc = e.currentTarget.querySelector("img").currentSrc;

//         let img = document.createElement("img");
//         img.src = imageSrc;

//         modalContent.appendChild(img);

//         let modalClose = document.getElementById("modal-close");
//         modalClose.addEventListener("click", () => {
//             closeModal();
//         });
//     })
// );

function addTodo() {
    let input = document.querySelector(".js-dom-example input");

    let todos = document.querySelector(".js-dom-example .todos");

    todos.innerHTML += `
        <div class="todo">
            <input type="checkbox" />
            ${input.value}
        </div>
    `;

    todos.scrollTop = todos.scrollHeight;

    input.value = "";
    input.focus();
}

document.querySelector(".js-dom-example button").addEventListener("click", addTodo);

document.querySelector(".js-dom-example input").addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        addTodo();
    }
});

document.querySelector(".ajax-example button").addEventListener("click", async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let todos = await response.json();

    let json = document.querySelector(".ajax-example .json");

    json.innerHTML = JSON.stringify(todos);

    let html = document.querySelector(".ajax-example .html");

    todos.forEach((todo) => {
        html.innerHTML += `<div class="todo"><input type="checkbox" ${todo.completed ? "checked" : ""}/>${todo.title}</div>`;
    });
});
