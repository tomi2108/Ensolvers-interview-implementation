const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "akjjyglc200",
  database: "ensolversdb",
});

const SERVER_PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get/tasks", (req, res) => {
  const sqlSelect = "SELECT * FROM task_list";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/folders", (req, res) => {
  const sqlSelect = "SELECT * FROM folder_list";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/get/folders/folder", (req, res) => {
  const folderName = req.body.folderName;
  const sqlSelect = "SELECT * FROM folder_list WHERE folderName = ?";

  db.query(sqlSelect, [folderName], (err, result) => {
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

app.post("/api/insert", (req, res) => {
  const folderId = req.body.folderId;
  const taskName = req.body.taskName;
  const completed = req.body.completed;

  const sqlInsert = "INSERT INTO task_list (folderId , taskName, completed) VALUES (?, ?, ?)";
  db.query(sqlInsert, [folderId, taskName, completed], (err, result) => {
    res.send(result);
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`running on port ${SERVER_PORT}`);
});
