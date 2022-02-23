import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const TaskForm = ({ folderName, setFolderName, createFolder }) => {
  return (
    <Form>
      <Form.Group controlId="folderName">
        <Form.Label>Folder: </Form.Label>
        <Form.Control
          value={folderName}
          type="text"
          placeholder="New folder..."
          onChange={(e) => {
            setFolderName(e.target.value);
          }}
        ></Form.Control>
      </Form.Group>

      <br />
      <Button className={"orange-btn"} onClick={createFolder} variant="info">
        Create folder
      </Button>
    </Form>
  );
};

export default TaskForm;
