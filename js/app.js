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

//#region Imported Functions ==================================================================

import { saveTasksToStorage, loadTasksFromStorage } from './localstorage.js';

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

// Preload some data --------------------------------------------------------------------------

let taskList = []

const starterTaskList = [
    new Task('Revise render HTML', 'Low', 'School', 'Mod 5 cars render is better than mine', true),
    new Task('Filter icons', 'Low', 'School', 'M5L1 nicer way to do filter icons'),
    new Task('I found a bug', 'High', 'Work', 'When i uncheck an item done it does not update the array'),
    new Task('Review Done Sort', 'Low', 'School', 'Done reverse should fail if none are done', true),
    new Task('Sort Reverse', 'Medium', 'Work', 'Look at M5/1 practice for the new way to reverse the sort'),
    new Task('Need that -1', 'Medium', 'Shopping', 'Need that -1 on the delete row function'),
    new Task('Set IDs and DataIDs', 'High', 'School', 'Check HTML for IDs and DataIDs', true),
    new Task('Live filter', 'Medium', 'General', 'Search all fields on keypress', true),
    new Task('New Task Form', 'High', 'School', 'Write JS to add new tasks', true),
    new Task('Change trash icon', 'Low', 'General', 'Change to x circle PG used', true),
    new Task('Table Styling', 'Low', 'Work', 'Center priority, category', true),
    new Task('IPO Chart', 'High', 'Work', 'Fill in IPO chart'),
    new Task('Sorting', 'Low', 'School', 'Consider sorting by priority, category', true),
    new Task('Checkbox', 'High', 'Work', 'Checkbox should set new value', true),
    new Task('Filter Reset', 'Low', 'Shopping', 'Add a reset button for filters'),
    new Task('Delete One', 'High', 'Work', 'Make delete button work', true),
    new Task('Delete All', 'Low', 'Shopping', 'Delete all button is not working right', true),
    new Task('Line Through Update', 'Medium', 'General', 'Use a data id and new class add a line through the tr', true),
    new Task('Esc and Enter', 'High', 'Shopping', 'Escape should blank form, enter should add new', true),
    new Task('Mobile View', 'Medium', 'Work', 'Mobile view is not great'),
    new Task('Table resizing', 'Low', 'Shopping', 'Table columns need to be more static'),
    new Task('Succ Message', 'Medium', 'Work', 'Status bar says task added... or delete the style and HTML div')
]

//#endregion ==================================================================================

//#region Define Variables ====================================================================

// Set some filter default values -------------------------------------------------------------

let filterSearchSetting = '';
let filterPrioritySetting = 'all';
let filterCategorySetting = 'all';

// Input Form Element Variables ---------------------------------------------------------------
const resultsWindowEle = document.getElementById('task-results-window');
const inputFormEle = document.getElementById('input-form');
const taskTitleEle = document.getElementById('task-title');
const taskCategoryEle = document.getElementById('task-category');
const taskPriorityEle = document.getElementById('task-priority');
const taskDescriptionEle = document.getElementById('task-description');

// Load our data! -----------------------------------------------------------------------------

// REFACTOR TO WORK WITH LOCALSTORAGE ONLY; DELETE NAV DEMO LOAD AND SAVE IN HTML

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

//#region Submit Form -------------------------------------------------------------------------

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

//#region Display Filters ---------------------------------------------------------------------

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

//#region Sort Event Listeners ----------------------------------------------------------------

let weSortedDone = false;
let weSortedPriority = false;
let weSortedCategory = false;

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

//#region Task Event Listeners ----------------------------------------------------------------

document.getElementById('task-results-window').addEventListener('click', function (e) {

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

        taskList[index].doneStatus = true;
        console.log(`i just updated tasklist item ${taskList[index].title} with done status ${taskList[index].doneStatus}`);
    }

    if (deleteTask) {

        const id = Number(deleteTask.dataset.id);

        const index = taskList.findIndex(function (task) {
            if (task.id === id) {
                return true;
            }
            return false;
        });

        console.log('i made it this far')
        console.log(id, index)

        if (confirm(`Are you sure you want to delete the task: ${taskList[index].title}?`)) {
            taskList.splice(index, 1);
            renderTasks();
        }
    }
});

document.getElementById('delete-completed-btn').addEventListener('click', function (e) {

    if (confirm('Are you sure you want to delete all completed items?')) {

        for (let i = 0; i < taskList.length; i++) {

            console.log(i, taskList[i].title, taskList[i].doneStatus);

            if (taskList[i].doneStatus) {
                console.log('imma delete this one');
                taskList.splice(i, 1);
                i = -1;
            }
        }
        renderTasks();
    }

});

//#endregion ----------------------------------------------------------------------------------

//#region LocalStorage Event Listeners --------------------------------------------------------

document.getElementById('demo-data').addEventListener('click', function (e) {
    for (let i = 0; i < starterTaskList.length; i++) {
        taskList.push(starterTaskList[i]);
    }
    renderTasks();
});

document.getElementById('storage-save-data').addEventListener('click', function (e) {
    saveTasksToStorage(taskList);
    alert('Tasks Saved!');
});

document.getElementById('storage-load-data').addEventListener('click', function (e) {
    taskList = loadTasksFromStorage();
    renderTasks();
});

//storage-save-data
// taskList += loadTasksFromStorage();

//#endregion ----------------------------------------------------------------------------------

//#endregion ==================================================================================

//#region Runtime let's get started! ==========================================================
console.group("---------- Runtime ----------");

renderTasks();

console.groupEnd();
//#endregion ==================================================================================
