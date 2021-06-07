import axios from 'axios';
import { useState } from 'react';
import { TOKEN_KEY } from 'constants/constants';

const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async ({ username, password }) => {
    setIsLoggingIn(true);

    try {
      console.log('logging');
      const response = await axios.post('/api/login', {
        user_id: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        return response.data.name;
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { isLoggingIn, login };
};

export default useLogin;
