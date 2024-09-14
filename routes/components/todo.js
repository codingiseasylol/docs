module.exports.todo = () => {
    return /*html*/ `
        <div class="todo-container">
            <div class="wrapper">    
                <div class="form">
                    <input type="text" />
                    <button>Add</button>
                </div>

                <div class="todos">
                    <div class="todo"><input type="checkbox" />Buy milk</div>
                    <div class="todo"><input type="checkbox" />Walk dog</div>
                </div>

                <div class="completed">
                    <div class="todo"><input type="checkbox" checked />Hate React</div>
                </div>
            </div>
        </div>
    `;
};

module.exports.todoRaw = () => {
    return /*html*/ `
        <div class="container">
            <div class="wrapper">    
                <div class="form">
                    <input type="text" />
                    <button>Add</button>
                </div>

                <div class="todos">
                    <div class="todo"><input type="checkbox" />Buy milk</div>
                    <div class="todo"><input type="checkbox" />Walk dog</div>
                </div>

                <div class="completed">
                    <div class="todo"><input type="checkbox" checked />Hate React</div>
                </div>
            </div>
        </div>
    `;
};
