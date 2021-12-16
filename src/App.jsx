import React from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import UserService from './services/user.service';


function App() {
  const [userData, setUserData] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    console.log(userData);
    if(userData.accessKey && userData.username) {
      setSignedIn(true);
    }
  }, [userData]);

  const userService = new UserService();

  const onUserLogIn = async (googleResponse) => {
    const {accessKey, username} = await userService.createUser(googleResponse);
    setUserData({accessKey, username});
  }

  const onUserLogOut = (googleResponse) => {
    setSignedIn(false);
    setUserData({});
  }

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
              {signedIn ? 
                (
                <>
                <small className={"userName"}>Signed in as {userData.username}</small>  
                <GoogleLogout 
                  clientId="759950908416-hdi0alconb3krbcblsmidir074uvafoj.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={onUserLogOut}
                />
                </>
                ):(
                <GoogleLogin
                  clientId="759950908416-hdi0alconb3krbcblsmidir074uvafoj.apps.googleusercontent.com"
                  buttonText="Sign in"
                  onSuccess={onUserLogIn}
                  onFailure={onUserLogIn}
                  cookiePolicy={'single_host_origin'}
                />)
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={'accessKeyContainer'}>
        <div className={'accessKeyInput'}>
          <input type="text" value={!signedIn ? 'Log in with google to get access key' : userData.accessKey}></input>
          {!signedIn ? (
            <GoogleLogin
              clientId="759950908416-hdi0alconb3krbcblsmidir074uvafoj.apps.googleusercontent.com"
              buttonText="Sign in"
              onSuccess={onUserLogIn}
              onFailure={onUserLogIn}
              cookiePolicy={'single_host_origin'}
            />
          ):(
            <button className="btnToClipboard"
            onClick={() => {navigator.clipboard.writeText(userData.accessKey)}}
            >&#x274F;</button>
          )}
        </div>        
      </div>
      <SwaggerUI url="https://measurment-assistant.herokuapp.com/documentation/json" />
    </div>
  );
}

export default App;
