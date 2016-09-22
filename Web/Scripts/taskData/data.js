define([], function () {
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