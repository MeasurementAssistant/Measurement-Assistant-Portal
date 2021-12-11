import React from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Measurement Assistant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#documents">Documents</Nav.Link>
              <Nav.Link href="#sign-in">Sign in</Nav.Link>
              <Nav.Link href="#sign-up">Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
