const express = require("express");
const app = express();
const session = require("express-session");

app.get("/", (req, res) => {
  res.send("ahhhhh");
});

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

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

// Task lösche
app.delete("/deleteTask/:idOfTask", (req, res) => {
  const IdOfTask = req.params.id;
  //   if (!IdOfTask) {
  //     res.status(404).send("Task wurde nicht gefunden");
  //   }
  tasks = tasks.filter((task) => task.IdOfTask !== IdOfTask);
  res.status(200).send("Task gelöscht!");
});

// en task mal bearbeite
app.patch("/EditTask/:id", (req, res) => {
  const id = req.params.id;
  const newsmt = req.body;
  let taskfound = false;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      taskfound = true;
      return {
        ...task,
        ...newsmt,
      };
    }
    return task;
  });
  if (taskfound) {
    res.status(200).send("Task wurde geändert!");
  } else {
    res.status(404).send("Task wurde nicht gefunden.");
  }
});

// sich ihlogge
app.post("/login", (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];
  const buffer = Buffer.from(`${username}:${password}`, "utf8");
  const data64 = buffer.toString("base64");
  const expectedBase64 = "emxpOnpsaTEyMzQ=";
  if (data64 === expectedBase64) {
    req.session.authenticated = true;
    res.status(200).send("Eingeloggt!!!");
  }
});

app.post("/verify", (req, res) => {
  const check = Boolean(req.session.authenticated);
  if (check === true) {
    res.status(200).send("Du bist eingeloggt");
  } else {
    res.status(401).send("log dich mal an maga");
  }
});

app.delete("/logout", (req, res) => {
  const check = Boolean(req.session.authenticated);
  if (check === true) {
    req.session.authenticated = null;
    res.status(200).send("Du hast dich abgemolden");
  } else {
    res
      .status(401)
      .send("Du kannst dich nicht abmelden ohne dich einzuloggen maga");
  }
});

// ohni de lauft nöd
app.listen(3000, () => {
  console.log("Server lauft auf http://localhost:3000");
});
