import React from 'react';
import { Row, Col, Divider } from 'antd';
import '../styles/Details.css';
const Details = (props) => {
  const { condition, brand, description } = props;

  return (
    <div>
      <Row className="details">
        <Row className="detail-text"> Details</Row>
        <Divider />
        <Row className="condition">
          <Col span={16} className="title">
            Condition
          </Col>
          <Col span={8} className="value">
            {condition}
          </Col>
        </Row>
        <Row className="brand">
          <Col span={16} className="title">
            Brand
          </Col>
          <Col span={8} className="value">
            {brand}
          </Col>
        </Row>
        <Row className="description">{description}</Row>
      </Row>
    </div>
  );
};

export default Details;
