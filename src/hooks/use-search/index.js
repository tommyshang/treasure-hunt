import axios from 'axios';
import { useState } from 'react';

const useSearch = () => {
  const [isSearching, setIsSearching] = useState(false);

  const search = async (parameters) => {
    // define the request
    const url = `/api/search`;

    console.log(parameters);

    const returnObj = {};

    setIsSearching(true);
    try {
      const response = await axios.get(url, {
        params: parameters,
      });
      if (response.status === 200) {
        returnObj.searchResults = response.data;
      }
    } catch (err) {
      returnObj.error = err.response.status;
    } finally {
      setIsSearching(false);
      return returnObj;
    }
  };

  return { isSearching, search };
};

export default useSearch;
