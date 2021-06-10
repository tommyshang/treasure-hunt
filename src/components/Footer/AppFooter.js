import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row, Button } from 'antd';

import './AppFooter.css';

class AppFooter extends Component {
  render() {
    return (
      <Row justify="space-between" className={"App-footer"}>
        <Col
          className="footer-column"
          xs={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
        >
          {/*<a href="" class="footer-links">ABOUT</a>*/}
          <Button type="text">ABOUT</Button>
        </Col>
        <Col
          className="footer-column"
          xs={{ span: 11, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
        >
          <NavLink
            to="/items"
            activeClassName="footer-shop-active-class"
            className="link"
          >
            <Button type="text">SHOP</Button>
          </NavLink>
        </Col>

        <Col
          className="footer-column"
          xs={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
        >
          {/*<a href="" className="footer-links">CONNECT</a>*/}
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
  }
}

export default AppFooter;
