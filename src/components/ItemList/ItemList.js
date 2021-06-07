import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Row, Col, Menu, Dropdown, Button, Space, Affix } from 'antd';
import Item from './Item/Item';
import GoogleMap from './Map/GoogleMap';
import Axios from 'axios';
import Moment from 'moment';

import './ItemList.style.css';
import { FilterOutlined, OrderedListOutlined } from '@ant-design/icons';
import TopNavBar from 'components/Header/TopNavBar';

const { Header, Content } = Layout;

const filterMenu = (
  <Menu>
    <Menu.Item>Cars</Menu.Item>
    <Menu.Item>Exercise Equipments</Menu.Item>
    <Menu.Item>Furniture</Menu.Item>
    <Menu.Item>Electronics</Menu.Item>
    <Menu.Item>Books</Menu.Item>
    <Menu.Item>Apparels</Menu.Item>
  </Menu>
);

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({});
  const changData = useCallback((para) => setItemData(para), []);

  useEffect(() => {
    Axios.get('https://mocki.io/v1/309b90ed-ae4d-4ac5-9636-1e89777c8644')
      .then((res) => {
        setItems(res.data.product);
      })
      .catch((e) => console.log(e));
  }, []);

  const sortLowToHigh = () => {
    const sorted = [...items].sort((a, b) => {
      return a.price - b.price;
    });

    setItems(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...items].sort((a, b) => {
      return b.price - a.price;
    });

    setItems(sorted);
  };

  const sortNewest = () => {
    const sorted = [...items].sort((a, b) => {
      return (
        new Moment(a.create.substr(0, 10)).format('YYYYMMDD') -
        new Moment(b.create.substr(0, 10)).format('YYYYMMDD')
      );
    });

    setItems(sorted);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => sortHighToLow()} visible type="button">
        Price: High-Low
      </Menu.Item>
      <Menu.Item onClick={() => sortLowToHigh()} visible type="button">
        Price: Low-High
      </Menu.Item>
      <Menu.Item onClick={() => sortNewest()} visible type="button">
        Newest
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="items-page">
      <Layout>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
        </Affix>
        <Content className="item-list-row">
          <Row>
            <Col span={14} className="item-list">
              <h1>Item near you</h1>
              <div className="item-icons">
                <Space direction="vertical" className="filter">
                  <Space wrap>
                    <Dropdown overlay={menu} placement="bottomCenter">
                      <Button icon={<OrderedListOutlined />}>Sort by</Button>
                    </Dropdown>
                    <Dropdown overlay={filterMenu} placement="bottomCenter">
                      <Button icon={<FilterOutlined />}>Filter</Button>
                    </Dropdown>
                  </Space>
                </Space>
              </div>

              <div className="items">
                <Item Products={items} changeData={changData} />
              </div>
            </Col>
            <Col span={10} className="map-container">
              <GoogleMap
                latitude={itemData.latitude}
                longitude={itemData.longitude}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default ItemList;
