import axios from 'axios';

export default class UserService {
  async createUser(googleResponse) {
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
      console.log(response);
      return response.data.userData;
    } catch (error) {
      return error;
    }
  }
}
