import React from "react";
import Task from "./Task";
import Button from "react-bootstrap/Button";

const TasksDisplay = ({ deleteFolder, deleteTask, folderArr, tasksArr, handleComplete }) => {
  return (
    <>
      {folderArr.map((folder) => {
        return (
          <>
            <h3 style={{ display: "inline" }} key={folder.id}>
              {folder.folderName}
            </h3>
            <Button onClick={() => deleteFolder(folder.id)} variant="danger" size="sm">
              Delete folder
            </Button>
            <br />
            <br />
            <br />
            {tasksArr.map((task) => {
              if (task.folderId === folder.id) {
                return <Task key={task.id} deleteTask={deleteTask} task={task} handleComplete={handleComplete}></Task>;
              }
            })}
          </>
        );
      })}
    </>
  );
};

export default TasksDisplay;
