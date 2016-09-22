/// <reference path="jquery-3.1.0.js" />
/// <reference path="require.js" />
//configuring modules; not necessary related to this js file?
require.config({
    paths: {
        jquery: "jquery-3.1.0"
    }
});
//defining a module 'inline' - in the same file
define("data", [], function () {
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
define("render", ["jquery"], function ($) {
    var taskTemplate = '<li class="task"><input class="complete" type="checkbox" /><input type="text" class="description" /><button class="btn-danger deleteTask">Delete</button></li>';
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

    return {
        task: _renderTask,
        tasks: _renderTasks
    };
});
define("tasks", ["jquery", "render", "data"], function ($, render, data) {
    newTask = function () {
        var $taskList = $("#taskList");

        $taskList.prepend(render.task({}));
    },
    deleteAllTasks = function () {
        data.clear();
        render.tasks(data.load());
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

        data.save(tasks);
    },
    load = function () {
        render.tasks(data.load());
    }

    return {
        create: newTask,
        removeAll: deleteAllTasks,
        remove: deleteTask,
        save: save,
        render: load
    };
});
//loading the modules as dependencies of current js file and the rest is put as callback function
//the module dependencies are specified as an array and the number of items from array must be the same as the parameter number of callback function
require(["jquery", "tasks"], function ($, tasks) {
    
    setEvents = function () {
        $("#newTaskButton").click(tasks.create);
        $("#deleteAllTasksButton").click(tasks.removeAll);
        $("#saveButton").click(tasks.save);
        $("#taskList").on("click", ".deleteTask", tasks.remove);
    },

    renderPage = function () {
        tasks.render();
        setEvents();
    }

    renderPage();
});