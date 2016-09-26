/// <reference path="jquery-3.1.0.js" />
/// <reference path="require.js" />
//configuring modules; it must be included at the top of the main js file(the one loaded from html with require)

require.config({
    //'paths' is used for simplify the names of files or folders; also allows to navigate up to another folder with ../..
    paths: {
        jquery: "jquery-3.1.0",
        //specifying the the templates folder from above
        templates: "../templates"
    }
});
//-----------------------------------------------------------------------------------------------------
//defining a module 'inline' - in the same file; 
//it needs the name as the first parameter; when adding it from another file, the name is no longer necessary and it will take the name of the file
//define("render", ["jquery"], function ($) { });
//-----------------------------------------------------------------------------------------------------
//when loading the module from another file, it will take the folder of current js file as the base folder for the new one and it will add the 'js' extension
//if the file is in a sub-folder, this will have to be added in the string definition
//-----------------------------------------------------------------------------------------------------
//loading the modules as dependencies of current js file and the rest is put as callback function
//the module dependencies are specified as an array and the number of items from array must be the same as the parameter number of callback function
require(["jquery", "tasksOperations/tasks"], function ($, tasks) {
    
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