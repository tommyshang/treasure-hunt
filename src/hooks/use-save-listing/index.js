import axios from 'axios';
import { useState } from 'react';

import { TOKEN_KEY } from 'constants/constants';

// SAVE listing
const useSaveListing = () => {
  const [isSaving, setIsSaving] = useState(false);

  const saveListing = async ({ userId, listingId }) => {
    const url = `/api/save`;
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    const data = {
      user_id: userId,
      listing_id: listingId,
    };

    const returnObj = {};
    setIsSaving(true);
    try {
      console.log(data);
      console.log(headers);
      const response = await axios.post(url, data, headers);
      if (response.status === 200) {
        console.log('Save listing successful');
      }
    } catch (err) {
      returnObj.error = err.response.status;
    } finally {
      setIsSaving(false);
      return returnObj;
    }
  };
  return { isSaving, saveListing };
};

export default useSaveListing;
