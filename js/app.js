// Dan Wenger
// Task Planner Assignment


//#region IPO Chart ===========================================================================

console.groupCollapsed("---------- IPO Chart ----------");
console.group("---------- INPUTS -----------");

console.groupEnd();

console.group("---------- PROCESS ----------");

console.groupEnd();

console.group("---------- OUTPUT -----------");

console.groupEnd();
console.groupEnd();
console.log("\n\n");

//#endregion ==================================================================================

//#region Define Task Class ===================================================================

let currentId = 0;

class Task {
    constructor(title, priority, category, description, doneStatus = false) {
        this.id = ++currentId
        this.title = title;
        this.priority = priority;
        this.category = category;
        this.description = description;
        this.doneStatus = doneStatus;
    }
}

// Preload our data and reset our serial ------------------------------------------------------

// I got ambitious and added links to local browser storage.
// see localstorage.js for the function.
import { saveTasksToStorage, loadTasksFromStorage } from './localstorage.js';
let taskList = loadTasksFromStorage();

// We need to reset the currentId serial since our old data has serials
if (taskList.length > 0) {
    let maxId = 0;
    for (let i = 0; i < taskList.length; i++) {
        let id = Number(taskList[i].id);
        if (id > maxId) {
            maxId = id;
        }
    }
    currentId = maxId;
}

//#endregion ==================================================================================

//#region Define Variables ====================================================================

// Input Form Element Variables ---------------------------------------------------------------
const resultsWindowEle = document.getElementById('task-table-body');
const inputFormEle = document.getElementById('input-form');
const taskTitleEle = document.getElementById('task-title');
const taskCategoryEle = document.getElementById('task-category');
const taskPriorityEle = document.getElementById('task-priority');
const taskDescriptionEle = document.getElementById('task-description');

// Filter Default Values ----------------------------------------------------------------------
let filterSearchSetting = '';
let filterPrioritySetting = 'all';
let filterCategorySetting = 'all';

// Sort Control Variables ---------------------------------------------------------------------
let weSortedDone = false;
let weSortedPriority = false;
let weSortedCategory = false;

//#endregion ==================================================================================

//#region Functions ===========================================================================

function renderTasks() {

    resultsWindowEle.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {

        const task = taskList[i];

        if (
            (filterSearchSetting === "" || task.title.toLowerCase().includes(filterSearchSetting.toLowerCase())) &&
            (filterPrioritySetting === 'all' || filterPrioritySetting.includes(task.priority.toLowerCase())) &&
            (filterCategorySetting === 'all' || filterCategorySetting.includes(task.category.toLowerCase()))
        ) {

            let isTaskDoneChecked = "";
            if (task.doneStatus === true) {
                isTaskDoneChecked = "checked";
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                    <td class="text-center">
                        <input type="checkbox" 
                        class="form-check-input" 
                        data-id="${task.id}" 
                        ${isTaskDoneChecked}>
                    </td><td class="priority-${task.priority.toLowerCase()}">${task.priority}</td>
                    <td class="text-center"><span class="badge bg-secondary">${task.category}</span></td>
                    <td class="fw-bold">${task.title}</td>
                    <td class="text-muted small">${task.description}</td>
                    <td class="text-center">
                        <button class="btn btn-link p-0">
                        <i class="bi bi-x-circle-fill" data-id="${task.id}"></i>
                        </button>
                    </td>`
            resultsWindowEle.appendChild(row);
        }
    }
    // console.log('NOTE: I disabled saving for now. Restore and remove this alert.');
    saveTasksToStorage(taskList);
}

function createTask() {

    if (!taskTitleEle.value || !taskPriorityEle.value || !taskCategoryEle.value) {
        alert("Title, Category, and Priority are all required.");
        return;
    }

    taskList.push(
        new Task(
            taskTitleEle.value,
            taskPriorityEle.value,
            taskCategoryEle.value,
            taskDescriptionEle.value
        ));

    inputFormEle.reset();
    weSortedDone = false;
    weSortedPriority = false;
    weSortedCategory = false;

    renderTasks();
};


//#endregion ==================================================================================

//#region Event Listeners =====================================================================

//#region Listeners: Submit Form --------------------------------------------------------------

document.getElementById('input-form').addEventListener('submit', function (e) {
    e.preventDefault();
    createTask();
});

document.getElementById('input-form').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        createTask();
    }

    if (e.key === 'Escape') {
        this.reset();
    }
});

//#endregion ----------------------------------------------------------------------------------

//#region Listeners: Filter Controls ----------------------------------------------------------

document.getElementById('filter-search').addEventListener('keyup', function (e) {
    filterSearchSetting = e.target.value;
    renderTasks();
});

document.getElementById('filter-priority').addEventListener('change', function (e) {
    filterPrioritySetting = e.target.value;
    renderTasks();
});

document.getElementById('filter-category').addEventListener('change', function (e) {
    filterCategorySetting = e.target.value;
    renderTasks();
});

//#endregion ----------------------------------------------------------------------------------

//#region Listeners: Sort Event ---------------------------------------------------------------

document.getElementById('sort-done-btn').addEventListener('click', function (e) {

    switch (weSortedDone) {
        case false:
            taskList.sort(function (a, b) {
                return a.doneStatus - b.doneStatus;
            })
            weSortedDone = true;
            weSortedPriority = false;
            weSortedCategory = false;
            break;
        default:
            taskList.sort(function (a, b) {
                return b.doneStatus - a.doneStatus;
            })
            weSortedDone = false;
            weSortedPriority = false;
            weSortedCategory = false;
            break;
    };
    renderTasks();
});

document.getElementById('sort-priority-btn').addEventListener('click', function (e) {

    switch (weSortedPriority) {
        case false:
            taskList.sort(function (a, b) {

                let aRank = 0;
                let bRank = 0;

                if (a.priority === 'High') { aRank = 1; }
                else if (a.priority === 'Medium') { aRank = 2; }
                else { aRank = 3; }

                if (b.priority === 'High') { bRank = 1; }
                else if (b.priority === 'Medium') { bRank = 2; }
                else { bRank = 3; }

                return aRank - bRank;
            })

            weSortedDone = false;
            weSortedPriority = true;
            weSortedCategory = false;
            break;

        default:
            taskList.reverse();
    };
    renderTasks();
});

document.getElementById('sort-category-btn').addEventListener('click', function (e) {

    switch (weSortedCategory) {
        case false:
            taskList.sort(function (a, b) {

                if (a.category > b.category) { return 1; }
                else if (a.category < b.category) { return -1; }
                else { return 0; }

            })
            weSortedDone = false;
            weSortedPriority = false;
            weSortedCategory = true;
            break;

        default:
            taskList.reverse();
    };
    renderTasks();
});

//#endregion ----------------------------------------------------------------------------------

//#region Listeners: Task Update Events -------------------------------------------------------

document.getElementById('task-table-body').addEventListener('click', function (e) {


    // About to refactor this... I have an idea
    // where maybe i can move the dataID to the <tr> itself
    // and use closest and parentElement to get the dataset id
    // like in M5L1 practice line 58-61
    // I undid the changes though before this push so go back and make the changes to the <tr>

    const finishTask = e.target.closest('.form-check-input');
    const deleteTask = e.target.closest('.bi-x-circle-fill');

    if (finishTask) {

        const id = Number(finishTask.dataset.id);

        const index = taskList.findIndex(function (task) {
            if (task.id === id) {
                return true;
            }
            return false;
        });

        taskList[index].doneStatus = !taskList[index].doneStatus;
        console.log(`i just updated tasklist item ${taskList[index].title} with done status ${taskList[index].doneStatus}`);

        renderTasks();
    }

    if (deleteTask) {

        const id = Number(deleteTask.dataset.id);

        const index = taskList.findIndex(function (task) {
            if (task.id === id) {
                return true;
            }
            return false;
        });

        if (confirm(`Are you sure you want to permanently delete the task: ${taskList[index].title}? (WARNING: This can not be undone!)`)) {
            taskList.splice(index, 1);

            renderTasks();
        }
    }
});

document.getElementById('delete-completed-btn').addEventListener('click', function (e) {

    if (confirm('Are you sure you want to permanently delete all completed items? (WARNING: This can not be undone!)')) {
        taskList = taskList.filter(function (task) {
            return !task.doneStatus;
        });
        renderTasks();
    }
});

//#endregion ----------------------------------------------------------------------------------

//#endregion ==================================================================================

//#region Runtime let's get started! ==========================================================
console.group("---------- Runtime ----------");

renderTasks();

console.groupEnd();
//#endregion ==================================================================================
