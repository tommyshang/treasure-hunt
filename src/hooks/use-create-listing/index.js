import axios from 'axios';
import { useState } from 'react';

// const parameters = {
//     category : undefined,
//     keyword : phone,
//     latitude : 70.01,
//     longititude : -40.00,
//  }

const useCreateListing = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createListing = async (parameters) => {
    // define the request
    const url = `/api/listing`;

    const formData = new FormData();
    formData.append('id', 1);
    formData.append('string');
    formData.append('yinyang.png', fs.createReadStream('./yinyang.png'));

    const returnObj = {};

    setIsCreating(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        returnObj.ListingId = response.data;
      }
    } catch (err) {
      returnObj.error = err;
    } finally {
      setIsCreating(false);
      return returnObj;
    }
  };

  return { isCreating, creating };
};

export default useCreateListing;
