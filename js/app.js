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
    constructor(name, priority, category, description, doneStatus = false) {
        this.id = ++currentId
        this.name = name;
        this.priority = priority;
        this.category = category;
        this.description = description;
        this.doneStatus = doneStatus;
    }
}

// Preload some data --------------------------------------------------------------------------
const taskList = [

    new Task('Complete the Assignment', 'High', 'work', 'Complete Mod 4 assignment'),
    new Task('Set IDs and DataIDs', 'High', 'html', 'Check HTML for IDs and DataIDs'),
    new Task('Live filter', 'Medium', 'js', 'Search all fields on keypress'),
    new Task('New Task Form', 'High', 'js', 'Write JS to add new tasks'),
    new Task('Change trash icon', 'Low', 'html', 'Change to x circle PG used', true),
    new Task('Table Styling', 'Low', 'html', 'Center priority, category'),
    new Task('IPO Chart', 'Low', 'js', 'Fill in IPO chart'),
    new Task('Sorting', 'Low', 'js', 'Consider sorting by priority, category'),
    new Task('Checkbox', 'Medium', 'js', 'Checkbox does not load the value', true),
    new Task('Current status of js', 'High', 'js', 'Tasklist')

]

//#endregion ==================================================================================

//#region Define Variables ====================================================================

// Set some filter default values -------------------------------------------------------------

// I DID THIS QUICK BUT IT NEEDS TO BE RETHOUGHT WHEN I DO FILTER WORK
let filterSearchSetting = '';
let filterPrioritySetting = 'all';
let filterCategorySetting = 'all';

// Input Form Element Variables ---------------------------------------------------------------
const resultsWindowEle = document.getElementById('task-results-window');


//#endregion ==================================================================================

//#region Render Function =====================================================================

function renderTasks() {

    resultsWindowEle.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {

        // ADD THE FILTER CHECKS IN THE IF STATEMENT
        if (true) {

            let isTaskDoneChecked = "";
            let isTaskTextCrossedStart = "";
            let isTaskTextCrossedEnd = "";

            if (taskList[i].doneStatus === true) {
                isTaskDoneChecked = "checked";
                isTaskTextCrossedStart = "<del>";
                isTaskTextCrossedEnd = "</del>";
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
                        ${isTaskTextCrossedStart}${taskList[i].priority}${isTaskTextCrossedEnd}</td>
                    <td class="text-center"><span class="badge bg-secondary">${taskList[i].category}</span></td>
                    <td class="fw-bold">${isTaskTextCrossedStart}${taskList[i].name}${isTaskTextCrossedEnd}</td>
                    <td class="text-muted small">${isTaskTextCrossedStart}${taskList[i].description}${isTaskTextCrossedEnd}</td>
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

// document.getElementById('submit-form').addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('user input: submit-form clicked.');

//     if (!campgroundNameInputEle.value ||
//         !sectorInputEle.value ||
//         !sitesTotalInputEle.value ||
//         !sitesFCInputEle.value ||
//         !mapURLInputEle.value ||
//         !imageURLInputEle.value) {
//         alert("Please fill out all fields.")

//     } else {

//         campgroundsList.push(
//             new Campground(
//                 campgroundNameInputEle.value,
//                 sectorInputEle.value,
//                 sitesTotalInputEle.value,
//                 sitesFCInputEle.value,
//                 hasWCInputEle.checked,
//                 hasWaterInputEle.checked,
//                 mapURLInputEle.value,
//                 imageURLInputEle.value
//             ));

//         inputFormEle.reset();
//         renderCampgrounds();
//     }

// });

// document.getElementById('reset-form').addEventListener('click', function (e) {
//     this.reset;
//     console.log('user input: reset-form clicked.');
// });


// Display Filters ----------------------------------------------------------------------------

// document.getElementById('sector-filter').addEventListener('change', function (e) {
//     filterSectorSetting = e.target.value;
//     renderCampgrounds();
// });

// document.getElementById('wc-filter').addEventListener('change', function (e) {
//     filterWCSetting = e.target.value;
//     renderCampgrounds();
// });

// document.getElementById('water-filter').addEventListener('change', function (e) {
//     filterWaterSetting = e.target.value;
//     renderCampgrounds();
// });

//#endregion ==================================================================================

//#region Runtime let's get started! ==========================================================
console.group("---------- Runtime ----------");

renderTasks();

console.groupEnd();
//#endregion ==================================================================================
