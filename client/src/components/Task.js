import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Task = ({ deleteTask, task, handleComplete }) => {
  const [completed, setCompleted] = useState(Boolean(task.completed));
  return (
    <>
      <input
        checked={completed ? 1 : 0}
        style={{ marginRight: "5px" }}
        key={`input.${task.id}`}
        type="checkbox"
        onChange={() => {
          setCompleted(!completed);
          handleComplete(task.id);
        }}
      ></input>
      <p className={completed ? "text-muted" : ""} key={task.id} style={{ marginRight: "10px", display: "inline" }}>
        {task.taskName}
      </p>
      <Button onClick={() => deleteTask(task.id)} style={{ marginBottom: "10px" }} size="sm" variant="outline-danger">
        Delete task
      </Button>
      <br />
    </>
  );
};

export default Task;
