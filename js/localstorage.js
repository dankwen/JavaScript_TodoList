// Dan Wenger
// JavaScript Class
// Spring 2026

// This is a small module to link a planner to the browser's local storage capability

// An export function to store an array in localStorage
export function saveTasksToStorage(taskList) {
    const taskListString = JSON.stringify(taskList);
    localStorage.setItem('myTaskData', taskListString);
}


export function loadTasksFromStorage() {
    const savedData = localStorage.getItem('myTaskData');

    if (savedData) {
        return JSON.parse(savedData);
    }

    return []; // if no saved data return an empty array
}
