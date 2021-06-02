import React from 'react';
import { Row, Col } from "antd";



import CreateListing from './CreateListingInfo/CreateListing';
import ListingImage from './CreateListingImage/ListingImage';
import Headline from './Headline/Headline';

function CreateListingInfo() {
  return (
    <div className="CreateListingInfo">
      <Row className="main">
        <Col span={12} className="left-side">
          <Headline />
          <br />
          <br />
          <CreateListing />
        </Col>
        <Col span={12} className="right-side">
          <ListingImage />
        </Col>
      </Row>
    </div>
  );
}

export default CreateListingInfo;
