// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Load Tasks from Local Storage when the page loads
    loadTasks();

    // Step 4: Create the addTask Function
    function addTask(taskText, save = true) {
        // Check if taskText is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button
        removeButton.onclick = function () {
            // Remove the task from the DOM
            taskList.removeChild(li);

            // Remove the task from Local Storage
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the <li> element
        li.appendChild(removeButton);

        // Append the <li> to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage (if save is true)
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the task input field
        taskInput.value = '';
    }

    // Step 5: Function to Save Task to Local Storage
    function saveTaskToLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Step 6: Function to Remove Task from Local Storage
    function removeTaskFromLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Step 7: Function to Get Tasks from Local Storage
    function getTasksFromLocalStorage() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    // Step 8: Function to Load Tasks from Local Storage
    function loadTasks() {
        let tasks = getTasksFromLocalStorage();
        tasks.forEach(task => {
            addTask(task, false); // 'false' ensures tasks are not saved again to Local Storage
        });
    }

    // Step 9: Attach Event Listeners
    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Add task when the "Enter" key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });
});