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
});

// Find One by todoid
router.get("/todoid/:todoid", async (req, res) => {
  const todoid = req.params.todoid;
  try {
    const todo = await Todo.findOne({ todoid });
    res.render("info", { todo });
  } catch (e) {
    res.send(e);
  }
});

// Create new todo document
router.post("/create", async (req, res) => {
  const todo = new Todo(req.body);
  try {
    todo.save();
    console.log("success create data");
    res.redirect("back");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update by todoid
router.put("/todoid/:todoid", async (req, res) => {
  const todoid = req.params.todoid;
  const payload = req.body;
  try {
    const todo = await Todo.findOne({ todoid });
    todo.content = payload.content;
    todo.save();
    res.redirect("back");
  } catch (err) {
    err => res.status(500).send(err);
  }
});

// Delete by todoid
router.delete("/delete", (req, res) => {
  console.log(req.body.todoid);
  Todo.deleteByTodoid(req.body.todoid)
    .then(res.redirect("back"))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
