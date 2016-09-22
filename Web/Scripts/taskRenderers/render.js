define(["jquery"], function ($) {
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