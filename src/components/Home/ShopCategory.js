import React, { Component } from 'react';

import { List, Card, Typography } from 'antd';

import furniture1 from 'assets/images/furniture1.jpg';
import car1 from 'assets/images/car1.jpg';
import electronics1 from 'assets/images/electronics1.jpg';
import apparels from 'assets/images/apparels.jpg';
import book from 'assets/images/book.jpg';
import exercise_equipments from 'assets/images/exercise_equipment.jpg';

const { Meta } = Card;
const { Title } = Typography;

const data = [
  {
    title: 'Furniture',
    alt: 'furniture',
    src: furniture1,
  },
  {
    title: 'Electronics',
    alt: 'electronics',
    src: electronics1,
  },
  {
    title: 'Apparels',
    alt: 'apparels',
    src: apparels,
  },
  {
    title: 'Cars',
    alt: 'cars',
    src: car1,
  },
  {
    title: 'Books',
    alt: 'books',
    src: book,
  },
  {
    title: 'Exercise Equipments',
    alt: 'exercise-equipments',
    src: exercise_equipments,
  },
];

const shopCategoryHeadStyle = {
  textAlign: 'left',
  borderBottom: '0px',
};

class ShopCategory extends Component {
  render() {
    return (
      <Card
        headStyle={shopCategoryHeadStyle}
        title={
          <Title level={2} style={{ color: '#142264' }}>
            SHOP CATEGORY
          </Title>
        }
        bordered={false}
      >
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                bordered={false}
                hoverable
                cover={<img alt={item.alt} src={item.src} />}
              >
                <Meta title={item.title} />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default ShopCategory;
