import { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import TasksDisplay from "./components/TasksDisplay";
import TaskForm from "./components/TaskForm";

function App() {
  const serverUrl = "http://localhost:3001";

  const [folderName, setFolderName] = useState("");

  const [tasksDisplayed, setTasksDisplayed] = useState([]);
  const [foldersDisplayed, setFoldersDisplayed] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/tasks/get`)
      .then((res) => {
        setTasksDisplayed(res.data);
      })
      .catch(() => setTasksDisplayed([]));
    axios
      .get(`${serverUrl}/api/folders/get`)
      .then((res) => {
        setFoldersDisplayed(res.data);
      })
      .catch(() => setFoldersDisplayed([]));
  }, []);

  const addTask = (folderValueName, taskName) => {
    let folderId = 0;
    axios
      .get(`${serverUrl}/api/folders/get/${folderValueName}`)
      .then((res) => {
        folderId = res.data[0].id;
        const newTask = { folderId: folderId, taskName: taskName, completed: 0 };
        axios.post(`${serverUrl}/api/tasks/insert`, newTask).then((response) => {
          newTask["id"] = response.data.insertId;
          setTasksDisplayed([...tasksDisplayed, newTask]);
        });
        setFolderName("");
      })
      .catch(() => {
        alert("The folder you especified does not exist in the database, please create it");
      });
  };

  const createFolder = () => {
    if (folderName !== "") {
      const foldersNames = foldersDisplayed.map((folder) => folder.folderName);
      if (!foldersNames.includes(folderName)) {
        const newFolder = { folderName: folderName };
        axios.post(`${serverUrl}/api/folders/insert`, newFolder).then((response) => {
          newFolder["id"] = response.data.insertId;
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

  const handleComplete = (id) => {
    console.log(id);
  };

  const editTask = (id, editName) => {
    console.log(id, editName);
  };

  const deleteTask = (id) => {
    axios.delete(`${serverUrl}/api/tasks/delete/${id}`).then((response) => {
      setTasksDisplayed(tasksDisplayed.filter((task) => task.id !== id));
    });
  };

  const deleteFolder = (folderId) => {
    axios.get(`${serverUrl}/api/tasks/get/${folderId}`).then((tresponse) => {
      axios.delete(`${serverUrl}/api/folders/delete/${folderId}`).then((response) => {
        setFoldersDisplayed(foldersDisplayed.filter((folder) => folder.id !== folderId));
        const idArr = tresponse.data.map((task) => task.id);
        for (let i = 0; i < idArr.length; i++) {
          axios.delete(`${serverUrl}/api/tasks/delete/${idArr[i]}`).then((response) => {});
        }
        setTasksDisplayed(tasksDisplayed.filter((task) => !idArr.includes(task.id)));
      });
    });
  };

  return (
    <div className="App">
      <Container>
        <h1>Ensolvers To-do List</h1>

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

export default App;
