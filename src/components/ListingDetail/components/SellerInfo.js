import { Avatar, Button, Col, Divider, Modal, Row } from 'antd';
import React, { useState } from 'react';

import { checkValidToken } from 'utils';

import '../styles/SellerInfo.css';

const SellerInfo = (props) => {
  const { sellerName, address, sellerEmail, sellerId } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getSellerInitials = (sellerName) => {
    return (
      sellerName !== undefined &&
      sellerName
        .split(' ')
        .map((name) => name[0])
        .join('')
    );
  };

  const contactBtnStyle = {
    background: '#00a9cd',
    borderColor: '#00a9cd',
  };

  return (
    <Row span={24} className="seller-section ">
      <Row span={24} className="header">
        Seller Info
      </Row>
      <Divider />
      <Row span={24} className="seller-info" justify="space-between">
        <Col span={3} className="avatar">
          <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>
            {getSellerInitials(sellerName)}
          </Avatar>
        </Col>
        <Col span={21}>
          <Row span={24}>
            <Col span={12}>{sellerName}</Col>
            <Col span={12} align="right">
              {checkValidToken() === sellerId ? (
                <div />
              ) : (
                <Button
                  className="contact-btn"
                  type="primary"
                  shape="round"
                  onClick={showModal}
                  style={contactBtnStyle}
                >
                  Send a message
                </Button>
              )}
            </Col>
          </Row>
          <Row span={24}>Location: {address}</Row>
        </Col>
      </Row>

      <Modal
        title="Here is seller's email"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> {sellerEmail}</p>
      </Modal>
    </Row>
  );
};

SellerInfo.propTypes = {};

export default SellerInfo;

{
  /* <Col span={4} className="avatar">
            <Avatar size={64} icon={<UserOutlined />} />
          </Col>
          <Col span={20}offest ={4} className="seller-info"> */
}
{
  /* <Row span = {24} style={{ fontWeight: 'bold' }}>
              <Col span = {12}>{sellerName}</Col>
              <Col   span = {12}>
                <Button
                  className="contact-btn"
                  type="primary"
                  shape="round"
                  onClick={showModal}
                >
                  Send a message
                </Button>
              </Col>
            </Row>
            <Row span = {24}>Location: {address}</Row>
          </Col> */
}
