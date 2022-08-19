const router = require("express").Router();
const Todo = require("../models/todo");

// Find All
router.get("/", (req, res) => {
  Todo.findAll()
    .then(todos => {
      if (!todos.length) return res.render("home", { todos: "" });
      console.log(todos);
      res.render("home", { todos });
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get("/todoid/:todoid", (req, res) => {
  Todo.findOneByTodoid(req.params.todoid)
    .then(todo => {
      if (!todo) return res.status(404).send({ err: "Todo not found" });
      res.send(`findOne successfully: ${todo}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post("/create", (req, res) => {
  Todo.create(req.body)
    .then(res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put("/todoid/:todoid", (req, res) => {
  Todo.updateByTodoid(req.params.todoid, req.body)
    .then(todo => res.send(todo))
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
