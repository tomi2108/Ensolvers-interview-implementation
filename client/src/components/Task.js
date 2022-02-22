import React from "react";

const Task = ({ task }) => {
  return (
    <>
      <input style={{ marginRight: "5px" }} key={`input.${task.id}`} type="checkbox"></input>
      <p key={task.id} style={{ display: "inline" }}>
        {task.taskName}
      </p>
      <br />
    </>
  );
};

export default Task;
