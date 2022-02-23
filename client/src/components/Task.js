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
          <Col xs={5}>
            <input
              checked={completed ? 1 : 0}
              style={{ marginRight: "5px" }}
              type="checkbox"
              onChange={() => {
                setCompleted(!completed);
                handleComplete(task.id);
              }}
            ></input>
            <p className={completed ? "text-muted text-decoration-line-through" : ""} s style={{ display: "inline" }}>
              {task.taskName}
            </p>
          </Col>
          <Col xs={3}>{editEnabled ? <Form.Control style={{}} value={editName} onChange={(e) => setEditName(e.target.value)} type="text" placeholder="Change task..."></Form.Control> : ""}</Col>
          <Col xs={1}>
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
                +
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
