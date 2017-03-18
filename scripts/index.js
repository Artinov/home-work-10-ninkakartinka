var inputText = document.querySelector("#todoText");
var todosList = document.querySelector("#todoList");
var todosLeft = document.querySelector("#todosLeft");
var clearCompleted = document.querySelector("#clearCompleted");
var markAllCompleted = document.querySelector("#markAllCompleted");
var todoIndexValue = 0;

var showAll = document.querySelector("#showAll");
var showActive = document.querySelector("#showActive");
var showCompleted = document.querySelector("#showCompleted");

todoIndexValue = 0;

var todos = [{
    text: "first todo",
    isDone: false,
    index: 0
}];

inputText.onkeypress = function(e) {
    if (e.keyCode == 13) {
        todoIndexValue++;
        todos.push({
            text: inputText.value,
            isDone: false,
            index: todoIndexValue
        });
        inputText.value = "";
        renderTodos();
        countActiveTodos();
    }
}

clearCompleted.onclick = function() {
    todos.forEach(function(todo, i) {
        if (todo.isDone == true) {
            var li = document.querySelector("li[todo-index='" + todo.index + "']");
            todosList.removeChild(li);
        }
    });

            todos = todos.filter(function(todo){
                return todo.isDone == false;

            });
}

markAllCompleted.onclick = function() {
    var activeTodos = todos.filter(function(todo) {
        return todo.isDone == false;
    }).length;

    if (activeTodos == 0) {
        todos.forEach(function(todo) {
            var li = document.querySelector("li[todo-index='" + todo.index + "']");
            var checkbox = li.querySelector("input");

            todo.isDone = false;
            checkbox.checked = false;
            li.setAttribute("class", "list-group-item")
        });
    } else {
        todos.forEach(function(todo) {
            var li = document.querySelector("li[todo-index='" + todo.index + "']");
            var checkbox = li.querySelector("input");

            todo.isDone = true;
            checkbox.checked = true;
            li.setAttribute("class", "list-group-item todo-done")
        });
    }

    countActiveTodos();
}
    showActive.onclick - function(){
        renderTodos(false);

}


function renderTodos(todoFilter) {
    var todoElementTemplate = document.querySelector("div li").cloneNode(true);
    var filtredTodos = todos;

    if (todos.length == 0) {
        todosList.innerHTML = "";
        return;
    }

    if(todoFilter != null){
    filtredTodos = filtredTodos.filter(function(todo){
        return todo.isDone == todoFilter;
    });
}

    todos.forEach(function(todo) {
        todoElementTemplate.querySelector("span").innerText = todo.text;
        todoElementTemplate.setAttribute("todo-index", todo.index)
        todoElementTemplate.querySelector("input").onchange = function(e) {
            var li = e.path[1];
            var todoIndex = li.getAttribute("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });

            todo = todos.indexOf(todo[0]);
            todo = todos[todo];

            if (e.path[0].checked) {
                li.setAttribute("class", "list-group-item todo-done");
                todo.isDone = true;
            } else {
                li.setAttribute("class", "list-group-item");
                todo.isDone = false;
            }
            countActiveTodos();
        }
        todoElementTemplate.querySelector("button").onclick = function(e) {
            var li = e.path[1];
            var todoIndex = li.getAttribute("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });

            todoIndex = todos.indexOf(todo[0]);
            todos.splice(Number(todoIndex), 1);

            todosList.removeChild(li);
            countActiveTodos();
        }
        todosList.appendChild(todoElementTemplate);
    });
}

function countActiveTodos() {
    var activeTodos = todos.filter(function(todo) {
        return todo.isDone == false;
    });

    todosLeft.innerText = activeTodos.length;
}

renderTodos(null);
countActiveTodos();