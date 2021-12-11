import React from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Measurement Assistant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Documents</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Nav.Link href="#sign-in">Sign in</Nav.Link>
              <Nav.Link href="#sign-up">Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SwaggerUI
      url='https://measurment-assistant.herokuapp.com/documentation/json'
      />
    </div>
  );
}

export default App;
