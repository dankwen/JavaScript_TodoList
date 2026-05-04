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

    new Task('Revise render HTML', 'Low', 'School', 'Mod 5 cars render is better than mine'),
    new Task('Review Filter', 'Low', 'School', 'Mod 5 filter function is neater'),
    new Task('Set IDs and DataIDs', 'High', 'School', 'Check HTML for IDs and DataIDs', true),
    new Task('Live filter', 'Medium', 'General', 'Search all fields on keypress', true),
    new Task('New Task Form', 'High', 'School', 'Write JS to add new tasks', true),
    new Task('Change trash icon', 'Low', 'General', 'Change to x circle PG used', true),
    new Task('Table Styling', 'Low', 'Work', 'Center priority, category', true),
    new Task('IPO Chart', 'High', 'Work', 'Fill in IPO chart'),
    new Task('Sorting', 'Low', 'School', 'Consider sorting by priority, category'),
    new Task('Checkbox', 'High', 'Work', 'Checkbox should set new value', true),
    new Task('Filter Reset', 'Low', 'Shopping', 'Add a reset button for filters'),
    new Task('Delete One', 'High', 'Work', 'Make delete button work', true),
    new Task('Delete All', 'Low', 'Shopping', 'Add a delete all button'),
    new Task('Line Through Update', 'Medium', 'General', 'Use a data id and new class to use text-decoration: line-through', true),
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

//#endregion ==================================================================================

//#region Functions ===========================================================================

function renderTasks() {

    resultsWindowEle.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {

        if (
            (filterSearchSetting === "" || taskList[i].title.toLowerCase().includes(filterSearchSetting.toLowerCase())) &&
            (filterPrioritySetting === 'all' || filterPrioritySetting.includes(taskList[i].priority.toLowerCase())) &&
            (filterCategorySetting === 'all' || filterCategorySetting.includes(taskList[i].category.toLowerCase()))
        ) {

            let isTaskDoneChecked = "";

            if (taskList[i].doneStatus === true) {
                isTaskDoneChecked = "checked";
            }

            resultsWindowEle.innerHTML += `
            <tr>
                    <td class="text-center">
                        <input type="checkbox" 
                        class="form-check-input" 
                        data-id="${taskList[i].id}" 
                        ${isTaskDoneChecked}>
                    </td><td class="priority-${taskList[i].priority.toLowerCase()}">${taskList[i].priority}</td>
                    <td class="text-center"><span class="badge bg-secondary">${taskList[i].category}</span></td>
                    <td class="fw-bold">${taskList[i].title}</td>
                    <td class="text-muted small">${taskList[i].description}</td>
                    <td class="text-center">
                        <button class="btn btn-link p-0">
                        <i class="bi bi-x-circle-fill" data-id="${taskList[i].id}"></i>
                        </button>
                    </td>
            </tr>`
        }
    }
}

function createTask() {

    if (!taskTitleEle.value || !taskPriorityEle.value || !taskCategoryEle.value) {
        alert("Title, Category and Priority are all required.");
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
    renderTasks();
};


//#endregion ==================================================================================

//#region Event Listeners =====================================================================

// Submit Form --------------------------------------------------------------------------------

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


// Task Event Listeners -----------------------------------------------------------------------

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



//#endregion ==================================================================================

//#region Runtime let's get started! ==========================================================
console.group("---------- Runtime ----------");

renderTasks();

console.groupEnd();
//#endregion ==================================================================================
