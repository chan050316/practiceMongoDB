const router = require("express").Router();
const Todo = require("../models/todo");
var util = require("util");
var EventEmitter = require("events").EventEmitter;

//EventEmitter 상속
var MyObj = function () {};
util.inherits(MyObj, EventEmitter);
var myObj = new MyObj();
myObj.setMaxListeners(20);

// Find All
router.get("/", async (req, res) => {
  // let todolist;
  todos = await Todo.find();
  console.log(todos);
  res.render("home", { todos });
  // .then(todos => {
  //   console.log(todos);
  //   if (!todos.length) return res.render("home", { todos: "" });
  //   todolist += todos;
  //   return todolist;
  // })
  // .then(todolist => {
  //   console.log(typeof todolist);
  //   res.render("home", { todos: todolist });
  // })
});

// Find One by todoid
router.get("/todoid/:todoid", (req, res) => {
  Todo.findOneByTodoid(req.params.todoid)
    .then(todo => {
      if (!todo) {
        res.status(404).send({ err: "Todo not found" });
      }
      return res.send(`findOne successfully: ${todo}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post("/create", async (req, res) => {
  const todo = new Todo(req.body);
  try {
    console.log(todo);
    todo.save();
    console.log("success");
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update by todoid
router.put("/todoid/:todoid", (req, res) => {
  Todo.updateByTodoid(req.params.todoid, req.body)
    .then(todo => res.send(todo))
    // .then(res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete("/delete", (req, res) => {
  console.log(req.body.todoid);
  Todo.deleteByTodoid(req.body.todoid)
    .then(res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
