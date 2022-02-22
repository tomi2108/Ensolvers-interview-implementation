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

  const submitTask = () => {
    let folderId = 0;
    if (folderName !== "") {
      axios
        .get(`${serverUrl}/api/folders/get/${folderName}`)
        .then((res) => {
          folderId = res.data[0].id;
          const newTask = { folderId: folderId, taskName: taskName, completed: 0 };
          axios.post(`${serverUrl}/api/tasks/insert`, newTask).then((response) => {
            newTask["id"] = response.data.insertId;
            setTasksDisplayed([...tasksDisplayed, newTask]);
          });
          setTaskName("");
          setFolderName("");
        })
        .catch(() => {
          alert("The folder you especified does not exist in the database, please create it");
        });
    } else {
      alert("Please especify a folder name");
    }
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

  const deleteTask = (id) => {
    axios.delete(`${serverUrl}/api/tasks/delete/${id}`).then((response) => {
      setTasksDisplayed(tasksDisplayed.filter((task) => task.id !== id));
    });
  };

  const deleteFolder = (folderId) => {
    axios.get(`${serverUrl}/api/tasks/get/${folderId}`).then((response) => {
      const idArr = response.data.map((task) => task.id);
      for (let i = 0; i < idArr.length; i++) {
        axios.delete(`${serverUrl}/api/tasks/delete/${idArr[i]}`).then((response) => {});
      }
      setTasksDisplayed(tasksDisplayed.filter((task) => !idArr.includes(task.id)));

      axios.delete(`${serverUrl}/api/folders/delete/${folderId}`).then((response) => {
        setFoldersDisplayed(foldersDisplayed.filter((folder) => folder.id !== folderId));
      });
    });
  };

  return (
    <div className="App">
      <Container>
        <h1>Ensolvers To-do List</h1>
        <h2>Folders</h2>

        <TasksDisplay deleteFolder={deleteFolder} deleteTask={deleteTask} folderArr={foldersDisplayed} tasksArr={tasksDisplayed} handleComplete={handleComplete}></TasksDisplay>
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
