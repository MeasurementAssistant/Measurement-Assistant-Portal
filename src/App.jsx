import React from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import GoogleLogin from 'react-google-login';

function responseGoogle(response) {
  console.log(response);
  console.log(response.profileObj);
}

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
              <GoogleLogin
                clientId="759950908416-hdi0alconb3krbcblsmidir074uvafoj.apps.googleusercontent.com"
                buttonText="Sign in"
                // onSuccess={this.responseGoogle}
                // onFailure={this.responseGoogle}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SwaggerUI url="https://measurment-assistant.herokuapp.com/documentation/json" />
    </div>
  );
}

export default App;
