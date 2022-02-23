import React from "react";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Task = ({ deleteTask, task, handleComplete, editTask }) => {
  const [completed, setCompleted] = useState(Boolean(task.completed));
  const [editEnabled, setEditEnabled] = useState(0);
  const [editName, setEditName] = useState("");

  return (
    <ListGroup.Item key={task.id}>
      <Container>
        <Row>
          <Col xs={4}>
            <label className="checkbox-container">
              <p className={completed ? "text-muted text-decoration-line-through" : ""} style={{ lineHeight: "2em", fontSize: "0.85em" }}>
                {task.taskName}
              </p>
              <input
                type="checkbox"
                checked={completed ? 1 : 0}
                style={{ marginRight: "5px" }}
                onChange={() => {
                  handleComplete(task.id, +!completed);
                  setCompleted(!completed);
                }}
              />
              <span className="checkmark"></span>
            </label>
          </Col>
          <Col xs={3}>{editEnabled ? <Form.Control size="sm" style={{}} value={editName} onChange={(e) => setEditName(e.target.value)} type="text" placeholder="Change task..."></Form.Control> : ""}</Col>
          <Col xs={2}>
            {editEnabled ? (
              <Button
                onClick={() => {
                  editTask(task.id, editName);
                  setEditName("");
                  setEditEnabled(false);
                }}
                variant="success"
                size="sm"
              >
                Save
              </Button>
            ) : (
              ""
            )}
          </Col>
          <Col xs={3} style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                setEditEnabled(!editEnabled);
              }}
              className={"orange-outline-btn"}
              style={{ margin: "10px" }}
              size="sm"
              variant="outline-info"
            >
              Edit
            </Button>
            <Button onClick={() => deleteTask(task.id)} size="sm" variant="outline-danger">
              Delete
            </Button>
          </Col>
          <br />
        </Row>
      </Container>
    </ListGroup.Item>
  );
};

export default Task;
