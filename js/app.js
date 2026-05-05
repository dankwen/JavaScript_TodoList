// Dan Wenger
// Task Planner Assignment


//#region IPO Chart ===========================================================================
console.groupCollapsed("---------- IPO Chart ----------");
console.group("---------- INPUTS -----------");
console.log("We start by loading some functions from ./localstorage.js");
console.log("Then we load some data (taskList) from local storage.");
console.log("Listeners on the Submit form trigger createTask().");
console.log("Listeners on the Filter controls set new filter settings and call renderTasks().");
console.log("Listeners on the Sort table headers sort the taskList array and call renderTasks().");
console.log("Listeners on the Submit form trigger createTask().");
console.log("Listeners on the table headers look for sort inputs and delete all inputs.");
console.log("Listeners on the table row look for updates to make to the listed <tr> item.");
console.groupEnd();

console.group("---------- PROCESS ----------");
console.log("We create a Task class.");
console.log("We reset the currentId (serial for tasks) to the max of those pre-loaded.");
console.log("Function renderTasks() checks filter settings and renders tasks in HTML.");
console.log("Function updateSortIcons renders HTML icons when sorts are selected.");
console.log("When a Filter listener is clicked renderTasks() filters the view.");
console.log("When a new task form submit is detected it calls createTask().");
console.log("When a Sort listener is clicked they sort the array.");
console.log("When a table checkbox is marked, the data table doneStatus is toggled.");
console.log("When a table delete row is clicked, the item is removed from taskList.");
console.log("When a Delete All Checked button is clicked it filters the array and deletes all the doneStatus=true tasks.");
console.groupEnd();

console.group("---------- OUTPUT -----------");
console.log("Function renderTasks() function outputs HTML to 'task-table-body'.");
console.log("Function renderTasks() also saves taskList to localStorage().");
console.log("Function createTask() creates a new task in the array & calls render function.");
console.log("Filter functions change settings that impact the output of renderTasks().");
console.log("Sort functions change the order items are displayed in the table.");
console.log("When sort functions are chosen, some update icons in the table heading.");
console.log("Delete one listener can remove items from the array and display table.");
console.log("Delete all checked items listener can remove items from the array and display table.");
console.log("");

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

// Element Variables --------------------------------------------------------------------------
const resultsWindowEle = document.getElementById('task-table-body');
const inputFormEle = document.getElementById('input-form');
const taskTitleEle = document.getElementById('task-title');
const taskCategoryEle = document.getElementById('task-category');
const taskPriorityEle = document.getElementById('task-priority');
const taskDescriptionEle = document.getElementById('task-description');
const sortDoneIconEle = document.getElementById('sort-done-icon');
const sortPriorityIconEle = document.getElementById('sort-priority-icon');
const sortCategoryIconEle = document.getElementById('sort-category-icon');

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

// Main Render Function -----------------------------------------------------------------------

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
                    <td class="text-center" data-id="${task.id}">
                        <input type="checkbox" 
                        class="form-check-input" 
                        ${isTaskDoneChecked}>
                    </td><td class="priority-${task.priority.toLowerCase()}">${task.priority}</td>
                    <td class="text-center"><span class="badge bg-secondary">${task.category}</span></td>
                    <td class="fw-bold">${task.title}</td>
                    <td class="text-muted small d-none d-md-table-cell">${task.description}</td>
                    <td class="text-center">
                        <button class="btn btn-link p-0" data-id="${task.id}">
                        <i class="bi bi-x-circle-fill"></i>
                        </button>
                    </td>`
            resultsWindowEle.appendChild(row);
        }
    }
    // console.log('NOTE: I disabled saving for now. Restore and remove this alert.');
    saveTasksToStorage(taskList);
}
// Create a New Task --------------------------------------------------------------------------

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

// Update Sort Icons --------------------------------------------------------------------------

function updateSortIcons(targetIcon, direction) {
    sortPriorityIconEle.innerHTML = '';
    sortCategoryIconEle.innerHTML = '';

    switch (targetIcon) {
        case 'priority':
            sortPriorityIconEle.innerHTML = `<i class="bi bi-arrow-${direction}"></i>`;
            break;
        case 'category':
            sortCategoryIconEle.innerHTML = `<i class="bi bi-arrow-${direction}"></i>`;
            break;
    }

}

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

//#region Listeners: Sort Events --------------------------------------------------------------

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
            updateSortIcons('priority', 'down');
            weSortedDone = false;
            weSortedPriority = true;
            weSortedCategory = false;
            break;

        default:
            taskList.reverse();
            updateSortIcons('priority', 'up');
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
            updateSortIcons('category', 'down');
            weSortedDone = false;
            weSortedPriority = false;
            weSortedCategory = true;
            break;

        default:
            taskList.reverse();
            updateSortIcons('category', 'up');
    };
    renderTasks();
});

//#endregion ----------------------------------------------------------------------------------

//#region Listeners: Task Update Events -------------------------------------------------------

document.getElementById('task-table-body').addEventListener('click', function (e) {
    const finishTask = e.target.closest('.form-check-input');
    const deleteTask = e.target.closest('.bi-x-circle-fill');

    if (finishTask) {
        const id = Number(finishTask.parentElement.dataset.id);
        const index = taskList.findIndex(function (task) {
            if (task.id === id) { return true; }
            return false;
        });

        if (index > -1) {
            taskList[index].doneStatus = !taskList[index].doneStatus;
            renderTasks();
        }
    }

    if (deleteTask) {
        const id = Number(deleteTask.parentElement.dataset.id);
        const index = taskList.findIndex(function (task) {
            if (task.id === id) { return true; }
            return false;
        });

        if (index > -1) {
            if (confirm(`Are you sure you want to permanently delete the task: ${taskList[index].title}? (WARNING: This can not be undone!)`)) {
                taskList.splice(index, 1);
                renderTasks();
            }
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
