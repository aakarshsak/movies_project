import React from "react";
import { useRef, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = ({ register }) => {
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const password = useRef();
  const emailId = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const first = firstName.current.value;
    const last = lastName.current.value;
    const email = emailId.current.value;
    const user = userName.current.value;
    const pass = password.current.value;
    console.log(user, pass);
    if (!first || !last || !email || !user || !pass) {
      setError("Something is wrong!!!");
      return;
    }
    setError("");
    try {
      await register(user, pass, first, last, email);
      navigate("/");
    } catch (err) {
      setError("Something is wrong!!!");
      console.log(err);
    }
  };

  return (
    <Container>
      <Form className="mt-5">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>First Name</Form.Label>
          <Form.Control ref={firstName} rows={1} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control ref={lastName} rows={1} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
          <Form.Label>Username</Form.Label>
          <Form.Control ref={userName} rows={1} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={password} rows={1} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea5">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailId} rows={1} />
        </Form.Group>
        <Button variant="outline-info" onClick={(e) => handleSubmit(e)}>
          Register
        </Button>
        {error && (
          <Form.Text style={{ color: "gold", marginLeft: "10px" }}>
            {error}
          </Form.Text>
        )}
      </Form>
    </Container>
  );
};

export default Register;
