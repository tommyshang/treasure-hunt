import React from 'react';

import Details from './Details';
import Overview from './Overview';
import SellerInfo from './SellerInfo';

import '../styles/TextualInfo.css';

const TextualInfo = (props) => {
  const { listingInfo } = props;
  console.log('I am at TextualInfo and I am printing props');
  console.log(props);
  return (
    <div className="textual-info">
      <Overview listingInfo={listingInfo} />
      <Details
        condition={listingInfo.item_condition}
        brand={listingInfo.brand}
        description={listingInfo.description}
      />

      <SellerInfo
        sellerName={listingInfo.seller_name}
        address={listingInfo.city_and_state}
        sellerEmail={listingInfo.seller_email}
        sellerId={listingInfo.seller_id}
      />
    </div>
  );
};

export default TextualInfo;
