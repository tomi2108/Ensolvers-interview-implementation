import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import loginService from "./services/tasks";

const Login = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    loginService
      .login(username, password)
      .then((res) => {
        if (res.length !== 0) {
          setLogin(true);
        } else {
          setPassError(true);
          setTimeout(() => setPassError(false), 4000);
        }
        setUsername("");
        setPassword("");
      })
      .catch(() => {});
  };

  return (
    <Container style={{ fontFamily: "Poppins, Sans-serif" }}>
      <h1>Ensolvers Login Page</h1>
      {passError ? (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! </Alert.Heading>
          <p>You entered an invalid username or password, try again.</p>
        </Alert>
      ) : (
        ""
      )}
      <Form onSubmit={loginHandler}>
        <Row>
          <Col xs={3}>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={3} style={{ textAlign: "right" }}>
            <Button type="submit" style={{ marginTop: "5px" }} className="orange-btn" variant="info">
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
