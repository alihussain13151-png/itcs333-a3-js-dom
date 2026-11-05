
(() => {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    // Update the counter
    function updateCounter() {
        const items = todoList.querySelectorAll("li");
        const remaining = Array.from(items).filter(
            item => !item.classList.contains("completed")
        ).length;

        counter.textContent = `${remaining} item(s) left`;
    }

    // Apply the selected filter
    function applyFilter() {
        const items = todoList.querySelectorAll("li");

        items.forEach(item => {
            const completed = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                item.style.display = completed ? "none" : "";
            } else if (currentFilter === "done") {
                item.style.display = completed ? "" : "none";
            }
        });
    }

    // Add a new item
    function addItem() {
        const text = todoInput.value.trim();

        if (text === "") {
            errorMsg.hidden = false;
            return;
        }

        errorMsg.hidden = true;

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.type = "button";

        li.appendChild(span);
        li.appendChild(deleteButton);

        todoList.appendChild(li);

        todoInput.value = "";

        applyFilter();
        updateCounter();
    }

    // Add using the button
    addButton.addEventListener("click", addItem);

    // Add using Enter
    todoInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addItem();
        }
    });

    // Event delegation for completing and deleting items
    todoList.addEventListener("click", event => {
        const deleteButton = event.target.closest(".delete-btn");

        if (deleteButton && todoList.contains(deleteButton)) {
            deleteButton.closest("li").remove();
            updateCounter();
            return;
        }

        const li = event.target.closest("li");

        if (li && todoList.contains(li)) {
            if (event.target.closest(".delete-btn")) {
                return;
            }

            li.classList.toggle("completed");

            applyFilter();
            updateCounter();
        }
    });

    // Filter buttons
    filterAll.addEventListener("click", () => {
        currentFilter = "all";
        applyFilter();
    });

    filterActive.addEventListener("click", () => {
        currentFilter = "active";
        applyFilter();
    });

    filterDone.addEventListener("click", () => {
        currentFilter = "done";
        applyFilter();
    });

    // Initial counter
    updateCounter();
})();
