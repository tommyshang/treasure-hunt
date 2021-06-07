import jwt_decode from 'jwt-decode';

const { TOKEN_KEY } = require('constants/constants');

const checkValidToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  // if no token, return null
  if (token === null) {
    return null;
  }

  // decode token, return userId if token is valid
  const decoded = jwt_decode(token);
  if (decoded.exp * 1000 >= Date.now()) {
    return decoded.sub;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

export default checkValidToken;
