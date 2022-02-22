//requirements
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const SERVER_PORT = 3001;

//database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "akjjyglc200",
  database: "ensolversdb",
});

//use
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//tasks
app.get("/api/tasks/get", (req, res) => {
  const sqlSelect = "SELECT * FROM task_list";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/tasks/get/:folderId", (req, res) => {
  const folderId = req.params.folderId;
  const sqlSelect = "SELECT * FROM task_list WHERE folderId = ?";
  db.query(sqlSelect, [folderId], (err, result) => {
    res.send(result);
  });
});

app.post("/api/tasks/insert", (req, res) => {
  const folderId = req.body.folderId;
  const taskName = req.body.taskName;
  const completed = req.body.completed;

  const sqlInsert = "INSERT INTO task_list (folderId , taskName, completed) VALUES (?, ?, ?)";
  db.query(sqlInsert, [folderId, taskName, completed], (err, result) => {
    res.send(result);
  });
});

app.delete("/api/tasks/delete/:id", (req, res) => {
  const taskId = req.params.id;
  const sqlDelete = "DELETE FROM task_list WHERE id = ?";
  db.query(sqlDelete, [taskId], (err, result) => {
    res.send(result);
  });
});

//folders
app.get("/api/folders/get", (req, res) => {
  const sqlSelect = "SELECT * FROM folder_list";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/folders/get/:folderName", (req, res) => {
  const folderName = req.params.folderName;
  const sqlSelect = "SELECT * FROM folder_list WHERE folderName = ?";
  console.log(folderName);
  db.query(sqlSelect, [folderName], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/folders/insert", (req, res) => {
  const folderName = req.body.folderName;
  const sqlInsert = "INSERT INTO folder_list (folderName) VALUES (?)";
  db.query(sqlInsert, [folderName], (err, result) => {
    res.send(result);
  });
});

app.delete("/api/folders/delete/:folderId", (req, res) => {
  const folderId = req.params.folderId;
  const sqlDelete = "DELETE FROM folder_list WHERE id = ?";
  db.query(sqlDelete, [folderId], (err, result) => {
    res.send(result);
  });
});

//listen
app.listen(SERVER_PORT, () => {
  console.log(`running on port ${SERVER_PORT}`);
});
