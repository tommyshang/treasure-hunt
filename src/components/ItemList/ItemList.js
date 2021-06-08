import React, {useState, useEffect, useCallback} from 'react';
import { Layout, 
         Row, 
         Col, 
         Menu, 
         Dropdown, 
         Button, 
         Space } from 'antd';
import Item from './Item/Item';
import GoogleMap  from './Map/GoogleMap';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import { useSearch } from 'hooks';
import "./ItemList.style.css";
import { FilterOutlined, OrderedListOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const filterMenu = (
  <Menu>
    <Menu.Item>Cars</Menu.Item>
    <Menu.Item>Exercise Equipment</Menu.Item>
    <Menu.Item>Furniture</Menu.Item>
    <Menu.Item>Electronics</Menu.Item>
    <Menu.Item>Books</Menu.Item>
    <Menu.Item>Apparels</Menu.Item>
  </Menu>
);

const ItemList = ({match}) => {
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({});
  const { search } = useSearch();
  const changData = useCallback((para) => setItemData(para), []);

  useEffect(() => {
    const fetchData = async (para) => {
      search(para).then(res=> {
        setItems(res.searchResults)
      })
    }
    fetchData(match.params.parameter)
  }, [])



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
        new Moment(a?.date.substr(0, 10)).format("YYYYMMDD") -
        new Moment(b?.date.substr(0, 10)).format("YYYYMMDD")
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
        <Header>Header</Header>
        <Content className="item-list-row">
          <Row>
            <Col span={14} className="item-list">
              { items.length !== 0 ? 
              (<div>
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
                    <Item Products={items} changeData={changData} itemData ={itemData}/>     
                  </div>
                </div>) : 
                (
               
                  <div style = {{fontSize:'1.2em', textAlign:'center', width:'100%', height:'100vh', marginTop: '10em'}}>
                    No data be created, Please try again... 
                    <Link to ="/">
                      <div>Return to previous page</div>
                    </Link>
                  </div>
                 
                )}
              </Col>
    
            <Col span={10} className="map-container">
              <GoogleMap
                latitude={itemData?.geo_location?.lat}
                longitude={itemData?.geo_location?.lon}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default ItemList;
