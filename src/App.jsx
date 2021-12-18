import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import { useCookies } from 'react-cookie';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import UserService from './services/user.service';
import './App.css';
import 'swagger-ui-react/swagger-ui.css';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['UserData']);
  const [userData, setUserData] = useState({
    username: cookies.UserData?.username,
    accessKey: cookies.UserData?.accessKey
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userData.accessKey && userData.username) {
      setCookie(
        'UserData',
        { username: userData.username, accessKey: userData.accessKey },
        { maxAge: 1800 }
      );
    }
  }, [userData]);

  const userService = new UserService();

  const onUserLogIn = async (googleResponse) => {
    const { accessKey, username } = await userService.createUser(googleResponse);
    const { tokenId, googleId } = googleResponse;
    setUserData({ accessKey, username, tokenId, googleId });
  };

  const onUpdateAccessKey = async () => {
    const response = await userService.updateAccessKey(
      userData.username,
      userData.tokenId,
      userData.googleId
    );
    if (response.name == 'Error') {
      setShow(true);
    } else {
      const accessKey = response.accessKey;
      setUserData({ ...userData, accessKey });
    }
  };

  const onUserLogOut = () => {
    removeCookie('UserData');
    setUserData({});
  };

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
              {cookies.UserData ? (
                <>
                  <small className={'userName'}>Signed in as {userData.username}</small>
                  <GoogleLogout
                    clientId="759950908416-hdi0alconb3krbcblsmidir074uvafoj.apps.googleusercontent.com"
                    buttonText="Sign out"
                    onLogoutSuccess={onUserLogOut}
                  />
                </>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={'accessKeyContainer'}>
        <div className={'accessKeyInput'}>
          <input
            type="text"
            value={!cookies.UserData ? 'Log in with google to get access key' : userData.accessKey}
          ></input>
          {!cookies.UserData ? (
            <GoogleLogin
              clientId="759950908416-hdi0alconb3krbcblsmidir074uvafoj.apps.googleusercontent.com"
              buttonText="Sign in"
              onSuccess={onUserLogIn}
              onFailure={onUserLogIn}
              cookiePolicy={'single_host_origin'}
            />
          ) : (
            <>
              <button
                className="btnToClipboard"
                onClick={() => {
                  navigator.clipboard.writeText(userData.accessKey);
                }}
              >
                &#x274F;
              </button>
              <button className="btnToClipboard" onClick={onUpdateAccessKey}>
                &#8635;
              </button>
            </>
          )}
        </div>
      </div>
      {show == true ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oops!</Alert.Heading>
          <p>You should sign in again</p>
        </Alert>
      ) : (
        <></>
      )}
      <SwaggerUI
        supportedSubmitMethods={[]}
        url="https://measurment-assistant.herokuapp.com/documentation/json"
      />
    </div>
  );
}

export default App;
