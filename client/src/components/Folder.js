import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Folder = ({ folder, deleteFolder, addTask }) => {
  const [taskName, setTaskName] = useState("");
  return (
    <Card.Title>
      <Container style={{ padding: "15px" }}>
        <Row>
          <Col>{folder.folderName}</Col>
          <Col style={{ textAlign: "right" }}>
            <Button style={{ marginBottom: "5px" }} onClick={() => deleteFolder(folder.id)} variant="danger" size="sm">
              Delete folder
            </Button>
            <Form.Group controlId="folderName">
              <Form.Control value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" placeholder="Your task..."></Form.Control>
              <Button
                onClick={() => {
                  addTask(folder.id, taskName);
                  setTaskName("");
                }}
                style={{ margin: "10px" }}
                variant="success"
                size="sm"
              >
                Add task
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Card.Title>
  );
};

export default Folder;
