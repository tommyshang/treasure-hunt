import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Card, Col, Row } from 'antd';

import homepage2 from 'assets/images/homepage2.jpg';

const carouselButtonStyle = {
  marginTop: '8.19px',
  borderColor: '#00a9cd',
  color: '#00a9cd',
};

class CarouselSlideBuy extends Component {
  render() {
    return (
      <Row align="middle">
        <Col span={8} className="carousel-buy-left-side">
          <Card bodyStyle={{ textAlign: 'right' }} bordered={false}>
            <h3 style={{ color: '#ff8300' }}>PAY LESS</h3>
            <h3>For Your Favorites</h3>
            <NavLink
              to="/items"
              activeClassName="items-listings-active-class"
              className="link"
            >
              <Button style={carouselButtonStyle}>Shop Now</Button>
            </NavLink>
          </Card>
        </Col>

        <Col span={16} className="carousel-buy-right-side">
          <Card
            bordered={false}
            cover={<img alt={'carousel-image-for-buyer'} src={homepage2} />}
          ></Card>
        </Col>
      </Row>

      // const listData = [];
      // for (let i = 0; i < 23; i++) {
      //     listData.push({
      //         href: 'https://ant.design',
      //         title: `ant design part ${i}`,
      //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //         description:
      //             'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      //         content:
      //             'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      //     });
      // }
      //
      // const IconText = ({ icon, text }) => (
      //     <Space>
      //         {React.createElement(icon)}
      //         {text}
      //     </Space>
      // );

      // <List
      //     itemLayout="vertical"
      //     size="large"
      //     dataSource={listData}
      //     renderItem={item => (
      //         <List.Item
      //             key={item.title}
      //             extra={
      //                 <img
      //                     width={600}
      //                     alt="logo"
      //                     src={homepage2}
      //                 />
      //             }
      //         >
      //             <List.Item.Meta
      //                 title={item.title}
      //                 description={item.description}
      //             />
      //             <Button className="carousel-buy-now-btn"
      //                     size="large">Buy Now</Button>
      //
      //
      //         </List.Item>
      //     )}
      // />
    );
  }
}

export default CarouselSlideBuy;
