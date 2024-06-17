var form = document.querySelector("#form");
var taskInput = document.querySelector("#container-form_input");
var taskList = document.querySelector("#list");
var task = document.querySelector(".container-list-tasks");
var currentId = 0;
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var taskText = taskInput.value;
    var taskHTML = "<li class=\"container-list-tasks\" id= \"".concat(currentId, "\">\n  <input type=\"text\" style=\"display: none\"  id=\"").concat("input-".concat(currentId), "\"></input>\n  <div class=\"container-list_name\" id=\"").concat("taskName-".concat(currentId), "\">").concat(taskText, "</div>\n  <div class=\"container-list_buttons\">\n  <button type=\"button\"  id=\"").concat("save-".concat(currentId), "\" class=\"container-list_buttons-action\" style=\"display: none\">\n  Save\n  </button>\n  <button type=\"button\" data-action=\"edit\" id=\"").concat("edit-".concat(currentId), "\" class=\"container-list_buttons-action\">\n  Edit\n  </button>\n  <button type=\"button\" data-action=\"delete\"  id=\"").concat("delete-".concat(currentId), "\" class=\"container-list_buttons-action\">\n  Delete\n  </button>\n  </div>\n  </li>");
    taskList.insertAdjacentHTML("beforeend", taskHTML);
    taskInput.value = "";
    currentId++;
});
var taskListClickHandler = function (event) {
    var targetElement = event.target;
    if (!targetElement || !targetElement.id)
        return;
    if (targetElement.id.includes("edit")) {
        editTask(event);
    }
    if (targetElement.id.includes("delete")) {
        deleteTask(event);
    }
    if (targetElement.id.includes("save")) {
        saveEdTask(event);
    }
};
taskList.addEventListener("click", taskListClickHandler);
var deleteTask = function (event) {
    var targetElement = event.target;
    if (!targetElement)
        return;
    var listItem = targetElement.closest("li");
    if (listItem) {
        listItem.remove();
    }
};
var editTask = function (event) {
    var targetElement = event.target;
    if (!targetElement || !targetElement.id)
        return;
    var taskId = targetElement.id.slice(5);
    if (!taskId)
        return;
    var taskParent = document.getElementById("".concat(taskId));
    if (!taskParent)
        return;
    var taskElement = taskParent.querySelector(".container-list_name");
    if (!taskElement)
        return;
    var taskName = taskElement.textContent;
    if (!taskName)
        return;
    var taskParentInput = taskParent.querySelector("input");
    if (!taskParentInput)
        return;
    taskParentInput.value = taskName;
    toggleElementVisibility("taskName-".concat(taskId), false);
    toggleElementVisibility("input-".concat(taskId), true);
    toggleElementVisibility("edit-".concat(taskId), false);
    toggleElementVisibility("save-".concat(taskId), true);
};
var saveEdTask = function (event) {
    var targetElement = event.target;
    if (!targetElement || !targetElement.id)
        return;
    var taskId = targetElement.id.slice(5);
    var taskParent = document.getElementById("".concat(taskId));
    if (!taskParent)
        return;
    var taskParentInput = taskParent.querySelector("input");
    if (!taskParentInput)
        return;
    var taskName = taskParentInput.value;
    if (!taskName)
        return;
    var taskElement = taskParent.querySelector(".container-list_name");
    if (!taskElement)
        return;
    taskElement.textContent = taskName;
    taskParentInput.value = "";
    toggleElementVisibility("taskName-".concat(taskId), true);
    toggleElementVisibility("input-".concat(taskId), false);
    toggleElementVisibility("edit-".concat(taskId), true);
    toggleElementVisibility("save-".concat(taskId), false);
};
var toggleElementVisibility = function (id, show) {
    var currentElement = document.getElementById(id);
    if (!currentElement)
        return;
    if (show) {
        currentElement.style.display = "";
    }
    else {
        currentElement.style.display = "none";
    }
};
