const express = require("express");
const app = express();
const session = require("express-session");

app.get("/", (req, res) => {
  res.send("ahhhhh");
});

let tasks = [
  {
    id: "1",
    title: "aaa",
    Description: "a",
    Done: false,
    Due: "blahblah",
  },
];
// alli tasks hole
app.get("/Tasks", (req, res) => {
  const alltasks = tasks.map((task) => {
    return { title: task.title, Description: task.Description, Due: task.Due };
  });
  res.send(alltasks);
});

// en task nach id hole
app.get("/Tasks/:id", (req, res) => {
  const id = req.params.id;
  const onetask = tasks.find((task) => task.id === id);
  res.send(onetask);
});

// neue task mit json schicke
app.use(express.json());
app.post("/addTask", (req, res) => {
  const newtask = req.body;
  const id = Number(req.body.id);
  if (tasks.find((task) => Number(task.id) === id)) {
    return res.status(409).send("Book already exists.");
  }
  tasks = [...tasks, newtask];
  res.send(tasks);
});

app.delete("/deleteTask", (req, res) => {
  const TaskToBeDeleted = req.params.id;
  tasks;
});
// ohni de lauft nöd
app.listen(3000, () => {
  console.log("Server lauft auf http://localhost:3000");
});
