import React from "react";
import Folder from "./Folder";
import Task from "./Task";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const TasksDisplay = ({ editTask, addTask, folderName, deleteFolder, deleteTask, folderArr, tasksArr, handleComplete }) => {
  return folderArr.length === 0 ? (
    ""
  ) : (
    <Container fluid style={{ padding: "20px", borderRadius: "1em", backgroundColor: "#909DAA" }}>
      {folderArr.map((folder) => {
        return (
          <div key={folder.id}>
            <Card bg="light">
              <Folder key={folder.id} addTask={addTask} folderName={folderName} folder={folder} deleteFolder={deleteFolder} />
              <br />
              <br />
              <br />
              <Card.Body>
                <ListGroup>
                  {tasksArr.map((task) => {
                    if (task.folderId === folder.id) {
                      return <Task key={task.id} editTask={editTask} deleteTask={deleteTask} task={task} handleComplete={handleComplete}></Task>;
                    }
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
            <br />
          </div>
        );
      })}
    </Container>
  );
};

export default TasksDisplay;
