import axios from 'axios';
import { useState } from 'react';
import { TOKEN_KEY } from 'constants/constants';

const useFetchSavedListings = () => {
  const [isFetching, setIsFetching] = useState(false);

  const fetchSavedListings = async () => {
    // define the request
    const url = `/api/saved-listings`;
    const opt = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    const returnObj = {};

    setIsFetching(true);
    try {
      const response = await axios.get(url, opt);
      if (response.status === 200) {
        returnObj.listings = response.data;
      }
    } catch (err) {
      returnObj.error = err.response.status;
    } finally {
      setIsFetching(false);
      return returnObj;
    }
  };

  return { isFetching, fetchSavedListings };
};

export default useFetchSavedListings;
