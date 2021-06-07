import React from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const Item = (props) => {
  const { Products, changeData } = props;
  return (
    <Row>
      {Products?.map((item) => (
        <Col span={8}>
          <Card
            hoverable
            onClick={() => changeData(item)}
            key={item?.id}
            style={{ width: 250, marginBottom: 50 }}
            cover={<img alt="item" src={item?.image} />}
          >
            <Meta title={item?.title} description={`$${item?.price}`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Item;
