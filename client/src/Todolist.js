import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Service from "./services/tasks";
import Container from "react-bootstrap/Container";
import TasksDisplay from "./components/TasksDisplay";
import TaskForm from "./components/TaskForm";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Todolist({ setLogin }) {
  const [tasksDisplayed, setTasksDisplayed] = useState([]);
  const [foldersDisplayed, setFoldersDisplayed] = useState([]);

  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    Service.task_getAll()
      .then((res) => {
        setTasksDisplayed(res);
      })
      .catch(() => setTasksDisplayed([]));
    Service.folder_getAll()
      .then((res) => {
        setFoldersDisplayed(res);
      })
      .catch(() => setFoldersDisplayed([]));
  }, []);

  //tasks functions

  const addTask = (folderId, taskName) => {
    const newTask = { folderId: folderId, taskName: taskName, completed: 0 };

    Service.task_add(newTask)
      .then((res) => {
        newTask["id"] = res.insertId;
        setTasksDisplayed([...tasksDisplayed, newTask]);
        setFolderName("");
      })
      .catch(() => {
        alert("The folder you especified does not exist in the database, please create it");
      });
  };

  const editTask = (id, editName) => {
    Service.task_edit(id, editName).then((res) => {
      console.log(res);
      setTasksDisplayed(tasksDisplayed.map((task) => (task.id !== id ? task : { folderId: task.folderId, taskName: editName, completed: task.completed })));
    });
  };

  const deleteTask = (id) => {
    Service.task_delete(id).then((response) => {
      setTasksDisplayed(tasksDisplayed.filter((task) => task.id !== id));
    });
  };

  const handleComplete = (id, complete) => {
    Service.task_complete(id, complete).then((response) => {});
  };
  //folders functions

  const createFolder = () => {
    if (folderName !== "") {
      const foldersNames = foldersDisplayed.map((folder) => folder.folderName);
      if (!foldersNames.includes(folderName)) {
        const newFolder = { folderName: folderName };
        Service.folder_add(newFolder).then((res) => {
          newFolder["id"] = res.insertId;
          setFoldersDisplayed([...foldersDisplayed, newFolder]);
          setFolderName("");
        });
      } else {
        alert("Folder already created");
      }
    } else {
      alert("Please especify a folder name");
    }
  };

  const deleteFolder = (folderId) => {
    Service.task_getByFolderId(folderId).then((res) => {
      Service.folder_delete(folderId).then((response) => {
        const tasksToDelete = res.map((task) => task.id);
        for (let i = 0; i < tasksToDelete.length; i++) {
          Service.task_delete(tasksToDelete[i]).then((response) => {});
        }
        setFoldersDisplayed(foldersDisplayed.filter((folder) => folder.id !== folderId));
        setTasksDisplayed(tasksDisplayed.filter((task) => !tasksToDelete.includes(task.id)));
      });
    });
  };

  //render

  return (
    <div style={{ fontFamily: "Poppins, Sans-serif" }} className="App">
      <Container>
        <img src={require("./Images/logo.jpg")} style={{ width: "100px" }} alt="ensolvers-logo.jpg" />
        <Row>
          <Col style={{ textAlign: "right" }}>
            <h1>Ensolvers To-do List</h1> <h6>Logged in as admin</h6>
            <Button size="sm" variant="link" onClick={() => setLogin(false)}>
              Logout
            </Button>
          </Col>
        </Row>
        <TaskForm folderName={folderName} setFolderName={setFolderName} createFolder={createFolder}></TaskForm>
        <br />
        <TasksDisplay editTask={editTask} folderName={folderName} setFolderName={setFolderName} addTask={addTask} createFolder={createFolder} deleteFolder={deleteFolder} deleteTask={deleteTask} folderArr={foldersDisplayed} tasksArr={tasksDisplayed} handleComplete={handleComplete}></TasksDisplay>
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}

export default Todolist;
