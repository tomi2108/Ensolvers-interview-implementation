import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import TasksDisplay from "./components/TasksDisplay";

function App() {
  const serverUrl = "http://localhost:3001";

  const [folderName, setFolderName] = useState("");
  const [taskName, setTaskName] = useState("");

  const [tasksDisplayed, setTasksDisplayed] = useState([]);
  const [foldersDisplayed, setFoldersDisplayed] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/get/tasks`)
      .then((res) => {
        setTasksDisplayed(res.data);
      })
      .catch(() => setTasksDisplayed([]));
    axios
      .get(`${serverUrl}/api/get/folders`)
      .then((res) => {
        setFoldersDisplayed(res.data);
      })
      .catch(() => setFoldersDisplayed([]));
  }, []);

  const submitTask = () => {
    const folder = { folderName: folderName };
    let folderId = 0;
    axios
      .post(`${serverUrl}/api/get/folders/folder`, folder)
      .then((res) => {
        folderId = res.data[0].id;
        const newTask = { folderId: folderId, taskName: taskName, completed: 0 };
        axios.post(`${serverUrl}/api/insert`, newTask).then((response) => {
          setTasksDisplayed(tasksDisplayed.concat(newTask));
        });
        setTaskName("");
        setFolderName("");
      })
      .catch(() => {
        alert("The folder you especified does not exist in the database, please create it");
      });
  };

  const createFolder = () => {
    let folders = [];
    axios.get(`${serverUrl}/api/folders`).then((res) => {
      folders = res.data.map((folder) => folder.folderName);
    });
    if (!folders.includes(folderName)) {
      const newFolder = { folderName: folderName };
      axios.post(`${serverUrl}/api/folders/insert`, newFolder).then((response) => {});
    }
  };

  return (
    <div className="App">
      <Container>
        <h1>Ensolvers To-do List</h1>
        <h2>Folders</h2>

        <TasksDisplay folderArr={foldersDisplayed} tasksArr={tasksDisplayed}></TasksDisplay>
        <br />
        <br />
        <br />
        <form>
          <label htmlFor="foldername">Folder: </label>
          <input
            value={folderName}
            type="text"
            id="foldername"
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
          ></input>
          <br />
          <br />
          <label htmlFor="task">Task: </label>
          <input
            value={taskName}
            type="text"
            id="task"
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></input>
          <br />
          <br />
          <Button onClick={submitTask} variant="success">
            Save task
          </Button>
          <br />
          <br />
          <Button onClick={createFolder} variant="info">
            Create folder
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default App;
