import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Card, Col, Row } from 'antd';

import homepage1 from 'assets/images/homepage1.jpg';
import sell_faster from 'assets/images/sell_faster.png';

const cardBodyStyle = {
  textAlign: 'left',
};

const cardTopHeadingStyle = {
  color: '#ff8300',
};

const carouselButtonStyle = {
  marginTop: '8.19px',
  borderColor: '#00a9cd',
  color: '#00a9cd',
};

class CarouselSlideSell extends Component {
  render() {
    return (
      <Row align="middle">
        <Col span={16} className="carousel-sell-left-side">
          <Card
            bordered={false}
            cover={<img alt={'carousel-image-for-seller'} src={homepage1} />}
          ></Card>
        </Col>
        <Col span={8} className="carousel-sell-right-side">
          <Card bodyStyle={cardBodyStyle} bordered={false}>
            <h3 style={cardTopHeadingStyle}>SELL FASTER</h3>
            <h3> For Your Listings, Boosted by Treasure Hunt</h3>
            <NavLink
              to="/sell"
              activeClassName="sell-listings-active-class"
              className="link"
            >
              <Button style={carouselButtonStyle}>List Now</Button>
            </NavLink>
          </Card>

          {/*<Card*/}
          {/*    bordered={false}*/}
          {/*    cover={<img alt={"carousel-image-for-seller"} src={sell_faster} />}*/}
          {/*>*/}
          {/*</Card>*/}
          {/*<Button>List Now</Button>*/}

          {/*<h3 style={contentStyle}>*/}
          {/*    SELL FASTER*/}
          {/*</h3>*/}
          {/*<h3 style={contentStyle2}>*/}
          {/*    Your Listings, Boosted by Treasure Hunt*/}
          {/*</h3>*/}
          {/*<Button className="c"*/}
          {/*        size="large">List Now*/}
          {/*</Button>*/}
        </Col>
      </Row>
    );
  }
}

export default CarouselSlideSell;
