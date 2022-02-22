import React from "react";
import Task from "./Task";

const TasksDisplay = ({ tasksArr }) => {
  var checked = [];
  var i = 0;
  var ret = [];

  ret = tasksArr.map((task) => {
    if (!checked.includes(task.folderName)) {
      i++;
      const tasksInSameFolder = tasksArr.filter((task2) => task.folderName === task2.folderName);
      checked.push(task.folderName);
      return (
        <>
          <h3 key={`folder.${i}`}>Folder {`"${task.folderName}"`}</h3>
          {tasksInSameFolder.map((task3) => (
            <Task key={`${i}.${task3.id}`} task={task3}></Task>
          ))}
        </>
      );
    }
    return "";
  });
  return ret;
};

export default TasksDisplay;
