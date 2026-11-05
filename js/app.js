(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const todoInput = document.getElementById('todo-input') || document.querySelector('input[type="text"]');
        const addBtn = document.getElementById('add-btn') || document.querySelector('button');
        const todoList = document.getElementById('todo-list');
        const errorMsg = document.getElementById('error-msg');
        const counter = document.getElementById('counter');
        const filterAll = document.getElementById('filter-all');
        const filterActive = document.getElementById('filter-active');
        const filterDone = document.getElementById('filter-done');

        let currentFilter = 'all';

        if (errorMsg) errorMsg.style.display = 'none';

        function updateCounter() {
            if (!counter || !todoList) return;
            const items = todoList.querySelectorAll('li');
            let activeCount = 0;
            items.forEach(item => {
                if (!item.classList.contains('completed')) {
                    activeCount++;
                }
            });
            counter.textContent = `${activeCount} item(s) left`;
        }

        function applyFilter(filter) {
            currentFilter = filter;
            if (!todoList) return;
            const items = todoList.querySelectorAll('li');
            items.forEach(item => {
                const isCompleted = item.classList.contains('completed');
                if (filter === 'all') {
                    item.style.display = '';
                } else if (filter === 'active') {
                    item.style.display = isCompleted ? 'none' : '';
                } else if (filter === 'done') {
                    item.style.display = isCompleted ? '' : 'none';
                }
            });
        }

        function addItem() {
            const text = todoInput ? todoInput.value.trim() : '';
            
            if (!text) {
                if (errorMsg) errorMsg.style.display = 'block';
                return;
            }
            
            if (errorMsg) errorMsg.style.display = 'none';

            const li = document.createElement('li');
            li.innerHTML = `<span>${text}</span> <button class="delete-btn">Delete</button>`;
            todoList.appendChild(li);

            if (todoInput) todoInput.value = '';
            applyFilter(currentFilter);
            updateCounter();
        }

        if (addBtn) {
            addBtn.addEventListener('click', addItem);
        }
        if (todoInput) {
            todoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addItem();
                }
            });
        }

        if (todoList) {
            todoList.addEventListener('click', (e) => {
                const target = e.target;
                const li = target.closest('li');
                if (!li) return;

                if (target.classList.contains('delete-btn')) {
                    li.remove();
                } else {
                    li.classList.toggle('completed');
                }
                
                updateCounter();
                applyFilter(currentFilter);
            });
        }

        if (filterAll) filterAll.addEventListener('click', () => applyFilter('all'));
        if (filterActive) filterActive.addEventListener('click', () => applyFilter('active'));
        if (filterDone) filterDone.addEventListener('click', () => applyFilter('done'));

        updateCounter();
    });
})();
 
