//here the 'text' plugin is used to load the taskTemplate.html file from 'templates' path (=../templates folder)
define(["jquery", "text!templates/taskTemplate.html"], function ($, taskTemplate) {
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