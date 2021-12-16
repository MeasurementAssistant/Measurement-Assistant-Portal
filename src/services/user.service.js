import axios from 'axios';

export default class UserService {
  async createUser(googleResponse) {
    console.log(googleResponse);
    const googleId = googleResponse.googleId;
    const email = googleResponse.profileObj.email;
    const idToken = googleResponse.tokenId;
    try {
      const response = await axios({
        url: 'https://measurment-assistant.herokuapp.com/api/user',
        method: 'POST',
        headers: {
          Authorization: idToken
        },
        data: {
          googleId,
          email
        }
      });
      return response.data.userData;
    } catch (error) {
      return error;
    }
  }

  async updateAccessKey(email, idToken, googleId) {
    try {
      const response = await axios({
        url: 'https://measurment-assistant.herokuapp.com/api/user/accesskey',
        method: 'PUT',
        headers: {
          Authorization: idToken
        },
        data: {
          googleId,
          email
        }
      });
      return response.data.userData;
    } catch (error) {
      return error;
    }
  }
}
