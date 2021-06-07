import axios from 'axios';
import { useState } from 'react';
import { TOKEN_KEY } from 'constants/constants';

// SAVE listing
const useUnsaveListing = () => {
  const [isUnsaving, setIsUnsaving] = useState(false);

  const unsaveListing = async ({ userId, listingId }) => {
    const url = `/api/save`;
    const opt = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      data: {
        user_id: userId,
        listing_id: listingId,
      },
    };

    const returnObj = {};
    setIsUnsaving(true);
    try {
      const response = await axios.delete(url, opt);
      if (response.status === 200) {
        console.log('Save listing successful');
      }
    } catch (err) {
      returnObj.error = err.response.status;
    } finally {
      setIsUnsaving(false);
      return returnObj;
    }
  };
  return { isUnsaving, unsaveListing };
};

export default useUnsaveListing;
