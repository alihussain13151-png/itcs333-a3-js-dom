document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    const counter = document.getElementById("counter");

    function updateCounter() {
        const items = todoList.querySelectorAll("li");
        const remaining = todoList.querySelectorAll("li:not(.completed)").length;
        counter.textContent = `${remaining} item(s) left`;
    }

    function addItem() {
        const text = input.value.trim();

        if (text === "") {
            errorMsg.style.display = "block";
            return;
        }

        errorMsg.style.display = "none";

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        input.value = "";
        updateCounter();
    }

    addBtn.addEventListener("click", addItem);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addItem();
        }
    });

    todoList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            e.target.parentElement.remove();
            updateCounter();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.classList.toggle("completed");
            updateCounter();
        }
    });

    filterAll.addEventListener("click", function () {
        todoList.querySelectorAll("li").forEach(function (item) {
            item.style.display = "";
        });
    });

    filterActive.addEventListener("click", function () {
        todoList.querySelectorAll("li").forEach(function (item) {
            item.style.display = item.classList.contains("completed")
                ? "none"
                : "";
        });
    });

    filterDone.addEventListener("click", function () {
        todoList.querySelectorAll("li").forEach(function (item) {
            item.style.display = item.classList.contains("completed")
                ? ""
                : "none";
        });
    });

    updateCounter();
});
