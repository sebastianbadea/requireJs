/// <reference path="jquery-3.1.0.js" />
/// <reference path="require.js" />
//configuring modules; not necessary related to this js file?
require.config({
    paths: {
        jquery: "jquery-3.1.0"
    }
});
define("taskData", [], function () {
    var storeName = "tasks";

    saveTaskData = function (tasks) {
        localStorage.setItem(storeName, JSON.stringify(tasks));
    },
    loadTaskData = function () {
        var storedTasks = localStorage.getItem(storeName);
        if (storedTasks) {
            return JSON.parse(storedTasks);
        }

        return [];
    },
    clearTaskData = function () {
        localStorage.removeItem(storeName);
    }

    return {
        save: saveTaskData,
        load: loadTaskData,
        clear: clearTaskData
    };
}); 
//loading the modules as dependencies of current js file and the rest is put as callback function
//the module dependencies are specified as an array and the number of items from array must be the same as the parameter number of callback function
require(["jquery", "taskData"], function ($, taskData) {
    var taskTemplate = '<li class="task"><input class="complete" type="checkbox" /><input type="text" class="description" /><button class="btn-danger deleteTask">Delete</button></li>';
    setEvents = function () {
        $("#newTaskButton").click(newTask);
        $("#deleteAllTasksButton").click(deleteAllTasks);
        $("#saveButton").click(save);
        $("#taskList").on("click", ".deleteTask", deleteTask);
    },

    //#region event functions
    newTask = function () {
        var $taskList = $("#taskList");

        $taskList.prepend(_renderTask({}));
    },
    deleteAllTasks = function () {
        taskData.clear();
        _renderTasks(taskData.load());
    },
    deleteTask = function (clickEvent) {
        var taskElement = clickEvent.target;
        $(taskElement).closest(".task").remove();
    },
    save = function () {
        var tasks = [];
        
        $("#taskList .task").each(function (index, task) {
            var $task = $(task);

            tasks.push({ complete: $task.find(".complete").is(":checked"), description: $task.find(".description").val() });
        });

        taskData.save(tasks);
    },
    //#endregion

    //#region functions
    _renderTask = function (task) {
        var $task = $(taskTemplate);

        if (task.complete) {
            $task.find(".complete").attr("checked", "checked");
        }
        $task.find(".description").val(task.description);

        return $task;
    },
    _renderTasks = function (tasks) {
        var tasksArray = $.map(tasks, _renderTask);
        $("#taskList").empty().append(tasksArray);
    }
    //#endregion

    renderPage = function () {
        _renderTasks(taskData.load());
        setEvents();
    }

    renderPage();
});