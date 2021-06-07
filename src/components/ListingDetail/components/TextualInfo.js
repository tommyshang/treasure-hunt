import React from 'react';
import Overview from './Overview';
import Details from './Details';
import SellerInfo from './SellerInfo';
import '../styles/TextualInfo.css';

const TextualInfo = (props) => {
  const { listingInfo } = props;
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
      />
    </div>
  );
};

export default TextualInfo;
