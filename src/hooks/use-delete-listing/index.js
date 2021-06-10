import axios from 'axios';
import { useState } from 'react';

import { TOKEN_KEY } from 'constants/constants';

const useDeleteListing = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteListing = async (userId, listingId) => {
    const url = `/api/listing`;
    const returnObj = {};
    setIsDeleting(true);

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          //Authorization: `Bearer ${TOKEN_KEY}`,
        },
        data: {
          user_id: userId,
          listing_id: listingId,
        },
      });
      if (response.status === 200) {
        console.log('Delete Listing successfully');
      }
    } catch (err) {
      returnObj.error = err.response.status;
    } finally {
      setIsDeleting(false);
      return returnObj;
    }
  };

  return { isDeleting, deleteListing };
};

export default useDeleteListing;
