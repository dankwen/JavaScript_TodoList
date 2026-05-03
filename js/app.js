// Dan Wenger
// Task Planner Assignment


// NOTE THIS IS PORTED FROM THE LAST ASSIGNMENT AND NOT UPDATED YET

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

//#region Define Campground Class =============================================================
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
const taskList = [

    new Task('Set IDs and DataIDs', 'High', 'School', 'Check HTML for IDs and DataIDs'),
    new Task('Live filter', 'Medium', 'General', 'Search all fields on keypress', true),
    new Task('New Task Form', 'High', 'School', 'Write JS to add new tasks', true),
    new Task('Change trash icon', 'Low', 'General', 'Change to x circle PG used', true),
    new Task('Table Styling', 'Low', 'Work', 'Center priority, category', true),
    new Task('IPO Chart', 'Low', 'Work', 'Fill in IPO chart'),
    new Task('Sorting', 'Low', 'School', 'Consider sorting by priority, category'),
    new Task('Checkbox', 'High', 'Shopping', 'Checkbox should set new value'),
    new Task('Filter Reset', 'Low', 'Shopping', 'Add a reset button for filters'),
    new Task('Delete One', 'High', 'Work', 'Make delete button work'),
    new Task('Delete All', 'Low', 'Shopping', 'Add a delete all button'),
    new Task('Line Through Update', 'Medium', 'General', 'Use a data id and new class to use text-decoration: line-through'),
    new Task('Esc and Enter', 'High', 'Shopping', 'Escape should blank form, enter should add new'),
    new Task('Mobile View', 'Medium', 'Work', 'Mobile view is not great'),
    new Task('Table resizing', 'Low', 'Shopping', 'Table columns need to be more static'),
    new Task('Snack bar', 'Low', 'Work', 'Snack bar says task added')

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

//#endregion ==================================================================================

//#region Render Function =====================================================================

function renderTasks() {

    resultsWindowEle.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {

        if (
            (filterSearchSetting === "" || taskList[i].title.toLowerCase().includes(filterSearchSetting.toLowerCase())) &&
            (filterPrioritySetting === 'all' || filterPrioritySetting.includes(taskList[i].priority.toLowerCase())) &&
            (filterCategorySetting === 'all' || filterCategorySetting.includes(taskList[i].category.toLowerCase()))
        ) {

            let isTaskDoneChecked = "";
            let ifTaskTextCrossedStart = "";
            let ifTaskTextCrossedEnd = "";

            if (taskList[i].doneStatus === true) {
                isTaskDoneChecked = "checked";
                ifTaskTextCrossedStart = "<del>";
                ifTaskTextCrossedEnd = "</del>";
            }

            resultsWindowEle.innerHTML += `
            <tr data-id="task-id-${taskList[i].id}">
                    <td class="text-center">
                        <input type="checkbox" 
                        class="form-check-input" 
                        data-id="task-id-${taskList[i].id}" 
                        ${isTaskDoneChecked}>
                    </td>
                    <td class="priority-${taskList[i].priority.toLowerCase()}">
                        ${ifTaskTextCrossedStart}${taskList[i].priority}${ifTaskTextCrossedEnd}</td>
                    <td class="text-center"><span class="badge bg-secondary">${taskList[i].category}</span></td>
                    <td class="fw-bold">${ifTaskTextCrossedStart}${taskList[i].title}${ifTaskTextCrossedEnd}</td>
                    <td class="text-muted small">${ifTaskTextCrossedStart}${taskList[i].description}${ifTaskTextCrossedEnd}</td>
                    <td class="text-center">
                        <button class="btn btn-link p-0" data-id="task-id-${taskList[i].id}"><i
                            class="bi bi-x-circle-fill"></i></button>
                    </td>
            </tr>`

        }

    }
}

//#endregion ==================================================================================

//#region Event Listeners =====================================================================

// Submit Form --------------------------------------------------------------------------------

document.getElementById('input-form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('user input: Add Task form clicked.');

    taskList.push(
        new Task(
            taskTitleEle.value,
            taskPriorityEle.value,
            taskCategoryEle.value,
            taskDescriptionEle.value
        ));

    inputFormEle.reset();
    renderTasks();
});


// Display Filters ----------------------------------------------------------------------------

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

//#endregion ==================================================================================

//#region Runtime let's get started! ==========================================================
console.group("---------- Runtime ----------");

renderTasks();

console.groupEnd();
//#endregion ==================================================================================
