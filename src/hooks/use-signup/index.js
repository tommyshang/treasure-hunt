import axios from 'axios';
import { useState } from 'react';

const useSignup = () => {
  const [isSigningup, setIsSigningup] = useState(false);

  const signup = async ({
    address_line_1,
    city,
    email,
    first_name,
    last_name,
    password,
    state,
    username,
    zipcode,
  }) => {
    setIsSigningup(true);

    try {
      const response = await axios.post('/api/signup', {
        email,
        user_id: username,
        password,
        first_name,
        last_name,
        address: `${address_line_1}, ${city}, ${state} ${zipcode}`,
      });

      if (response.status === 201) {
        return 201;
      }
    } catch (err) {
      console.log(err.message);
      return err.response.status;
    } finally {
      setIsSigningup(false);
    }
  };

  return { isSigningup, signup };

};

export default useSignup;
