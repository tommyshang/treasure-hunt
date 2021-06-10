import { Col, Divider, Row } from 'antd';
import React from 'react';

import '../styles/Details.css';

const Details = (props) => {
  const { condition, brand, description } = props;

  return (
    <div>
      <Row className="details">
        <Row className="detail-text"> Details</Row>
        <Divider />
        <Row className="condition">
          <Col span={8} className="details-title">
            Condition
          </Col>
          <Col span={16} className="value">
            {condition}
          </Col>
        </Row>
        <Row className="brand">
          <Col span={8} className="details-title">
            Brand
          </Col>
          <Col span={16} className="value">
            {brand}
          </Col>
        </Row>
        <Row className="description">
          <Col span={8} className="details-title">
            Description
          </Col>
          <Col span={16} className="value">
            {description}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Details;
