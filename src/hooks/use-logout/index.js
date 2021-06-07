import axios from 'axios';
import { useState } from 'react';
import { TOKEN_KEY } from 'constants/constants';

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = () => {
    setIsLoggingOut(true);

    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { isLoggingOut, logout };
};

export default useLogout;
