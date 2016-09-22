define(["jquery", "taskRenderers/render", "taskData/data"], function ($, render, data) {
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