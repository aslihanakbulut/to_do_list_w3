// task_list ve completed task icin dizi
let task_list = [];
let completed_list = [];

// add_task btn tıiklandiginda yeni task ekle
document.getElementById('add_task').addEventListener('click', function() {

    let newTask = document.getElementById('new_task').value.trim(); //new task
    if (newTask !== '') {

        if (task_list.includes(newTask) || completed_list.includes(newTask)) { // daha once eklendiyse uyari gonder
            alert('Bu görev zaten eklenmiş.');
            return;
        }

        task_list.push(newTask);
        render_task_list();
        document.getElementById('new_task').value = '';
    }
});

// tamamlandi butonu
document.getElementById('completed_btn').addEventListener('click', function() {

    let selected_task = document.querySelectorAll('.task-item input:checked'); //secilen task

    selected_task.forEach(task => {
        let index = parseInt(task.dataset.index);
        let completedTask = task_list.splice(index, 1)[0];
        completed_list.push(completedTask);
    });
    render_task_list();
    render_Completed_list();
});

// listeden cikar
document.getElementById('remove_btn').addEventListener('click', function() {

    let selected_task = document.querySelectorAll('.task-item input:checked'); //secilen task
    selected_task.forEach(task => {
        let index = parseInt(task.dataset.index);
        task_list.splice(index, 1);
    });
    render_task_list();
});

// tumu secildiginde
document.getElementById('select_all_btn').addEventListener('click', function() {

    let allTasks = document.querySelectorAll('.task-item input');// secilen tum tasks
    allTasks.forEach(task => {
        task.checked = true;
    });
});

// clear_btn 
document.getElementById('clear_btn').addEventListener('click', function() {

    completed_list = []; // diziyi sifirla
    render_Completed_list();
});

// task_list render islemi
function render_task_list() {

    let task_list_grp = document.getElementById('task_list_grp');

    task_list_grp.innerHTML = '';
    task_list.forEach((task, index) => {
        
        let element_taskList = document.createElement('element_taskList');
        element_taskList.classList.add('list-group-item', 'task-item');
        element_taskList.innerHTML = ` <input type="checkbox" data-index="${index}" class="form-check-input me-2"> <span>${task}</span>`;

        task_list_grp.appendChild(element_taskList);
    });
}

// comp_list render islemleri 
function render_Completed_list() {

    let comp_list_grp = document.getElementById('comp_list_grp');
    comp_list_grp.innerHTML = '';

    completed_list.forEach(task => {

        let element_cmp = document.createElement('element_cmp');
        element_cmp.classList.add('list-group-item', 'completed-item');
        element_cmp.innerHTML = `<s>${task}</s>`;
        comp_list_grp.appendChild(element_cmp);
    });
}

// İlk render işlemleri
render_task_list();
render_Completed_list();
