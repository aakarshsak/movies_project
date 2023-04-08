import React, { useState } from "react";
import { useRef } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const userText = useRef();
  const userPass = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userText.current.value;
    const password = userPass.current.value;
    console.log(username, password);
    if (!username || !password) {
      setError("Something is wrong!!!");
      return;
    }
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid User or Password");
      console.log(err);
    }
  };

  return (
    <Container>
      <Form className="mt-5">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Username</Form.Label>
          <Form.Control ref={userText} rows={1} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={userPass} rows={1} />
        </Form.Group>
        <Button variant="outline-info" onClick={(e) => handleSubmit(e)}>
          Login
        </Button>
        <Form.Text style={{ color: "gold", marginLeft: "10px" }}>
          {error}
        </Form.Text>
      </Form>
    </Container>
  );
};

export default Login;
