// Task List ve Completed Task List için boş dizi oluştur
let taskList = [];
let completedList = [];

// Add Task butonuna tıklandığında
document.getElementById('btnAddTaskList').addEventListener('click', function() {
    let newTaskName = document.getElementById('newTaskName').value.trim();
    if (newTaskName !== '') {
        if (taskList.includes(newTaskName) || completedList.includes(newTaskName)) {
            alert('Bu görev zaten eklenmiş.');
            return;
        }
        taskList.push(newTaskName);
        renderTaskList();
        document.getElementById('newTaskName').value = '';
    }
});

// Tamamlandı butonuna tıklandığında
document.getElementById('btnCompletedTask').addEventListener('click', function() {
    let selectedTasks = document.querySelectorAll('.task-item input:checked');
    selectedTasks.forEach(task => {
        let index = parseInt(task.dataset.index);
        let completedTask = taskList.splice(index, 1)[0];
        completedList.push(completedTask);
    });
    renderTaskList();
    renderCompletedList();
});

// Listeden Çıkar butonuna tıklandığında
document.getElementById('btnRemoveTask').addEventListener('click', function() {
    let selectedTasks = document.querySelectorAll('.task-item input:checked');
    selectedTasks.forEach(task => {
        let index = parseInt(task.dataset.index);
        taskList.splice(index, 1);
    });
    renderTaskList();
});

// Tümünü Seç butonuna tıklandığında
document.getElementById('btnSelectAll').addEventListener('click', function() {
    let allTasks = document.querySelectorAll('.task-item input');
    allTasks.forEach(task => {
        task.checked = true;
    });
});

// Clear List butonuna tıklandığında
document.getElementById('btnClearList').addEventListener('click', function() {
    completedList = [];
    renderCompletedList();
});

// Task List'i yeniden oluştur
function renderTaskList() {
    let taskListUl = document.getElementById('taskListUl');
    taskListUl.innerHTML = '';
    taskList.forEach((task, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'task-item');
        li.innerHTML = `
            <input type="checkbox" data-index="${index}" class="form-check-input me-2">
            <span>${task}</span>
        `;
        taskListUl.appendChild(li);
    });
}

// Completed Task List'i yeniden oluştur
function renderCompletedList() {
    let completedListUl = document.getElementById('completedListUl');
    completedListUl.innerHTML = '';
    completedList.forEach(task => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'completed-item');
        li.innerHTML = `<s>${task}</s>`;
        completedListUl.appendChild(li);
    });
}

// İlk render işlemleri
renderTaskList();
renderCompletedList();
