const express = require("express");
const app = express();
const fs = require("fs");
var session = require("express-session");
const cors = require('cors');

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

const config = {
    origin : ['https://localhost:5173'],
    credentials : true,
}

app.use(cors(config));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "Hello",
        resave: true,
        saveUninitialized: true,
    })
);

app.post('/saveTodo', function (request, response) {
    const todo = request.body;
    // console.log(todo);
    // const image = request.file;
    // request.session.fileName = image.filename;
    // todo.fileName = image.filename;
    saveTodos(todo, function (error) {
        if (error) {
            response.status(500);
            response.json({ error: error });
        } else {
            response.status(200);
            response.send();
        }
    });
});

app.get('/getTodo',function(request,response){
    const name = request.query.name;
    console.log(name);
    getTodos(name, false, function (error, todos) {
        if (error) {
            response.status(500);
            response.json({ error: error });
        } else {
            response.status(200);
            response.json(todos);
        }
    });
});

app.put("/updateCb", function (request, response) {
    const todo = request.body;

    getTodos(null, true, function (error, todos) {
        if (error) {
            response.status(500);
            response.json({ error: error });
        } else {
            const filteredTodos = todos.filter(function (todoItem) {
                if (Number(todoItem.id) == Number(todo.id))
                    {
                    if (Number(todoItem.completed) == 0)
                        todoItem.completed = 1;
                    else
                        todoItem.completed = 0;
                }
                return true;
            });


            fs.writeFile(
                "./store.txt",
                JSON.stringify(filteredTodos),
                function (error) {
                    if (error) {
                        response.status(500);
                        response.json({ error: error });
                    } else {
                        response.status(200);
                        response.send();
                    }
                }
            );
        }
    });

});

app.delete("/deleteTodo", function (request, response) {
    const todo = request.body;

    getTodos(null, true, function (error, todos) {
        if (error) {
            response.status(500);
            response.json({ error: error });
        } else {
            const filteredTodos = todos.filter(function (todoItem) {
                    return Number(todoItem.id) !== Number(todo.id);
            });


            fs.writeFile(
                "./store.txt",
                JSON.stringify(filteredTodos),
                function (error) {
                    if (error) {
                        response.status(500);
                        response.json({ error: error });
                    } else {
                        response.status(200);
                        response.send();
                    }
                }
            );
        }
    });
});


app.get("*", function (request, response) {
    response.sendFile(__dirname + "/public/404.html");
});

app.listen(8000, function () {
    console.log("Server is running on port 8000");
});

function getTodos(username, all, callback) {
    fs.readFile("./store.txt", "utf-8", function (error, data) {
        if (error) {
            callback(error);
        } else {
            if (data.length === 0) {
                data = "[]";    
            }

            try {
                let todos = JSON.parse(data);

                if (all) {
                    callback(null, todos);
                    return;
                }

                const filteredTodos = todos.filter(function (todo) {
                    return todo.userName === username;
                });

                callback(null, filteredTodos);
            } 
            catch (error) {
                callback(null, []);
            }
        }
    });
}

function saveTodos(todo, callback) {
    getTodos(null, true, function (error, todos) {
        if (error) {
            callback(error);
        } else {
            todos.push(todo);

            fs.writeFile("./store.txt", JSON.stringify(todos), function (error) {
                if (error) {
                    callback(error);
                } else {
                    callback();
                }
            });
        }
    });
}