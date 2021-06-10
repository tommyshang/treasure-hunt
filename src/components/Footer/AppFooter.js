import { Button, Col, Row } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './AppFooter.css';

const AppFooter = () => {
  return (
    <Row justify="space-around">
      <Col className="footer-column">
        <Button type="text">ABOUT</Button>
      </Col>
      <Col className="footer-column">
        <NavLink
          to="/items"
          activeClassName="footer-shop-active-class"
          className="link"
        >
          <Button type="text">SHOP</Button>
        </NavLink>
      </Col>

      <Col className="footer-column">
        <Button
          type="text"
          href="https://github.com/tommyshang/treasure-hunt"
          target="_blank"
        >
          GitHub
        </Button>
      </Col>
    </Row>
  );
};

export default AppFooter;
