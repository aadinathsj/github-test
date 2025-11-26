// Task Manager Application

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentEditId = null;
        this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
    }

    setupEventListeners() {
        // Add Task
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Edit Modal
        const modal = document.getElementById('editModal');
        const closeBtn = document.querySelector('.modal-close');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const saveBtn = document.getElementById('saveEditBtn');

        closeBtn.addEventListener('click', () => this.closeEditModal());
        cancelBtn.addEventListener('click', () => this.closeEditModal());
        saveBtn.addEventListener('click', () => this.saveEdit());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeEditModal();
        });
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const daySelect = document.getElementById('daySelect');
        const taskText = taskInput.value.trim();
        const day = daySelect.value;

        if (!taskText) {
            alert('Please enter a task description');
            return;
        }

        if (!day) {
            alert('Please select a day');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            day: day,
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();

        // Clear inputs
        taskInput.value = '';
        daySelect.value = '';
        taskInput.focus();
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.renderTasks();
        }
    }

    openEditModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.currentEditId = id;
        document.getElementById('editTaskInput').value = task.text;
        document.getElementById('editDaySelect').value = task.day;
        document.getElementById('editModal').classList.add('active');
    }

    closeEditModal() {
        document.getElementById('editModal').classList.remove('active');
        this.currentEditId = null;
    }

    saveEdit() {
        if (!this.currentEditId) return;

        const newText = document.getElementById('editTaskInput').value.trim();
        const newDay = document.getElementById('editDaySelect').value;

        if (!newText) {
            alert('Task description cannot be empty');
            return;
        }

        const taskIndex = this.tasks.findIndex(t => t.id === this.currentEditId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].text = newText;
            this.tasks[taskIndex].day = newDay;
            this.saveTasks();
            this.renderTasks();
            this.closeEditModal();
        }
    }

    toggleComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    renderTasks() {
        const grid = document.getElementById('tasksGrid');
        grid.innerHTML = '';

        this.daysOfWeek.forEach(day => {
            const dayTasks = this.tasks.filter(task => task.day === day);
            const dayCard = this.createDayCard(day, dayTasks);
            grid.appendChild(dayCard);
        });
    }

    createDayCard(day, dayTasks) {
        const card = document.createElement('div');
        card.className = 'day-card';

        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = `${day} (${dayTasks.length})`;

        const content = document.createElement('div');
        content.className = 'day-content';

        if (dayTasks.length === 0) {
            const noTasks = document.createElement('div');
            noTasks.className = 'no-tasks';
            noTasks.textContent = 'No tasks for this day';
            content.appendChild(noTasks);
        } else {
            dayTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                content.appendChild(taskElement);
            });
        }

        card.appendChild(header);
        card.appendChild(content);
        return card;
    }

    createTaskElement(task) {
        const item = document.createElement('div');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;

        const text = document.createElement('div');
        text.className = 'task-text';
        text.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        // Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn-small btn-complete';
        completeBtn.textContent = task.completed ? '✓' : '○';
        completeBtn.addEventListener('click', () => this.toggleComplete(task.id));

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-small btn-edit';
        editBtn.textContent = '✏️';
        editBtn.addEventListener('click', () => this.openEditModal(task.id));

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-small btn-delete';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        item.appendChild(text);
        item.appendChild(actions);
        return item;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

greetBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        personalGreeting.textContent = `Hello, ${name}! Nice to meet you! 😊`;
        personalGreeting.style.animation = 'fadeInDown 0.5s ease';
    } else {
        personalGreeting.textContent = 'Please enter your name!';
        personalGreeting.style.color = '#f5576c';
        setTimeout(() => {
            personalGreeting.style.color = '#667eea';
        }, 2000);
    }
});

// Allow Enter key to trigger greeting
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        greetBtn.click();
    }
});

// Add transition to count display
countDisplay.style.transition = 'transform 0.2s ease';

console.log('Interactive Hello World App loaded! 🚀');
