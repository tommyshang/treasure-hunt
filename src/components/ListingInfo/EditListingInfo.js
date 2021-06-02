import React from 'react';
import { Row, Col } from "antd";


import EditListing from './EditListingInfo/EditListing';
import ListingImage from './CreateListingImage/ListingImage';
import Headline from './Headline/Headline';

function EditListingInfo() {
  return (
    <div className="EditListingInfo">
      <Row className="main">
        <Col span={12} className="left-side">
          <Headline />
          <br />
          <br />
          <EditListing />
        </Col>
        <Col span={12} className="right-side">
          <ListingImage />
        </Col>
      </Row>
    </div>
  );
}

export default EditListingInfo;
