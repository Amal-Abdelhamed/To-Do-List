let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let container = document.querySelector(".container");
let numTasks = 0;
let numDone = 0;


// empty array to store tasks 
let arrayOfTasks = [];
//check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));

}

getDataFromLocalStorage();



input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (input.value !== "") {
            addTaskToArray(input.value);  // add tasks to array of tasks
            input.value = ""; //empty input field

        }
        event.preventDefault();
    }
});


// submit.onclick = function () {
//     if (input.value !== "") {
//         addTaskToArray(input.value);  // add tasks to array of tasks
//         input.value = ""; //empty input field

//     }
// };

//make task done
tasksDiv.addEventListener("click", (e) => {
    //delete button
    if (e.target.classList.contains("del")) {
        //remove task from page
        e.target.parentElement.remove();
        //remove task from storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    //make item done
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        // toggle completed at storage
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
    }
})


// add tasks
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    //push task to array of tasks 
    arrayOfTasks.push(task)

    //add tasks to page
    addElementsToPageFrom(arrayOfTasks);
    //add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks)

};
//add tasks to page
function addElementsToPageFrom(arrayOfTasks) {

    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    //looping on arrayOfTasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";



        //check if task is done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        let span = document.createElement("span");
        span.className = "del";

        // span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        //add div task to div tasks
        tasksDiv.appendChild(div)

    });
    if (arrayOfTasks.length && !document.querySelector(".tasks-details")) {
        addFooter();
    }
    numTasks = arrayOfTasks.length
};
console.log(numTasks);
//add tasks to local storage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}


function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
    if (!arrayOfTasks.length && document.querySelector(".tasks-details")) {
        // console.log(document.querySelector(".tasks-details"));
        document.querySelector(".tasks-details").className = "none";
    }

}

function toggleStatusTaskWith(taskId) {
    arrayOfTasks.forEach((task) => {
        if (task.id == taskId) {
            task.completed == false ? (task.completed = true) : (task.completed = false);
        }
    })
    addDataToLocalStorageFrom(arrayOfTasks);

}

function addFooter() {
    // check if array empty or not
    if (tasksDiv.innerHTML !== "") {
        // add footer
        let footer = document.createElement("div");
        footer.className = "tasks-details";
        let numAll = document.createElement("div");
        numAll.className = "num-all-items";
        numAll.appendChild(document.createTextNode("you have " + numTasks +" tasks"));
        let numCompleted = document.createElement("div");
        numCompleted.className = "num-completed-items";
        numCompleted.appendChild(document.createTextNode(numDone+" tasks are done"));
        footer.appendChild(numAll);
        footer.appendChild(numCompleted);
        container.appendChild(footer)

    }
}

