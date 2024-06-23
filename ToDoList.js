document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Event listener for form submit
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(taskInput.value.trim());
        taskInput.value = '';
    });

    // Function to add a task
    function addTask(taskName) {
        if (taskName !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                ${taskName}
                <span class="delete-item">X</span>
            `;
            taskList.appendChild(li);
            saveTask(taskName);
        }
    }

    // Function to delete a task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-item')) {
            if (confirm('Are you sure you want to delete this task?')) {
                event.target.parentElement.remove();
                removeTask(event.target.parentElement.firstChild.textContent.trim());
            }
        }
    });

    // Function to save task to local storage
    function saveTask(taskName) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(taskName);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove task from local storage
    function removeTask(taskName) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.filter(task => task !== taskName);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(task => addTask(task));
    }
});