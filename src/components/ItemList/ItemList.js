import React, { useState, useEffect, useCallback } from 'react';
import {
  Layout,
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  Space,
  Affix,
  message,
} from 'antd';
import Item from './Item/Item';
import GoogleMap from './Map/GoogleMap';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { useSearch } from 'hooks';
import './ItemList.style.css';
import { OrderedListOutlined, SecurityScanTwoTone } from '@ant-design/icons';
import TopNavBar from 'components/Header/TopNavBar';
import AppFooter from 'components/Footer/AppFooter';
import { Loading } from 'components';
import SearchForm from './SearchForm/SearchForm';
import { getHaversineDistance } from 'utils';
import SubNavBar from 'components/Header/SubNavBar';

const { Content, Footer, Sider } = Layout;

const ItemList = ({ location }) => {
  const history = useHistory();
  const [items, setItems] = useState(undefined);
  const [collapsed, setCollapsed] = useState(true);
  const [itemData, setItemData] = useState({});
  const [centerLatitude, setCenterLatitude] = useState(40.75);
  const [centerLongitude, setCenterLongitude] = useState(-73.94);
  const { isSearching, search } = useSearch();
  const [searchFormData, setSearchFormData] = useState(undefined);
  const changeData = useCallback((para) => setItemData(para), []);
  const [mapContainer, setMapContainer] = useState(null);
  const goToDetail = useCallback((listingId) =>
    history.push(`/listing-detail/${listingId}`)
  );

  // Scroll window to top when mount
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  const getSearchParams = () => {
    return queryString.parse(location.search);
  };

  const fetch = async (parameters) => {
    const { searchResults, error } = await search(parameters);

    if (error !== undefined) {
      message.error('Search failed!');
    } else {
      console.log(searchResults);
      // If parameters has lat/long, set map center to lat/long
      if (parameters.latitude && parameters.longitude) {
        console.log(
          `Setting map lat to ${parameters.latitude}and map long to ${parameters.longitude}`
        );
        setCenterLatitude(parameters.latitude);
        setCenterLongitude(parameters.longitude);
      }
      setItems(searchResults);
    }
  };

  useEffect(() => {
    const parameters = getSearchParams();
    console.log(parameters);
    if (Object.values(parameters).length === 0) {
      return;
    }
    fetch(parameters);
  }, [location.search]);

  useEffect(() => {
    if (searchFormData === undefined) {
      return;
    }

    history.push({
      pathname: '/items',
      search: queryString.stringify(searchFormData),
    });
    // fetch(searchFormData);
  }, [searchFormData]);

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
      return new Moment(b?.date) - new Moment(a?.date);
    });

    setItems(sorted);
  };

  const sortNearest = () => {
    const sorted = [...items].sort((a, b) => {
      const distA = getHaversineDistance(
        centerLatitude,
        centerLongitude,
        a?.geo_location.lat,
        a?.geo_location.lon
      );
      const distB = getHaversineDistance(
        centerLatitude,
        centerLongitude,
        b?.geo_location.lat,
        b?.geo_location.lon
      );
      return distA - distB;
    });

    setItems(sorted);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => sortHighToLow()} visible type="button">
        Price: Highest first
      </Menu.Item>
      <Menu.Item onClick={() => sortLowToHigh()} visible type="button">
        Price: Lowest first
      </Menu.Item>
      <Menu.Item onClick={() => sortNewest()} visible type="button">
        Date listed: Newest First
      </Menu.Item>
      <Menu.Item onClick={() => sortNearest()} visible type="button">
        Distance: Nearest First
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="items-page">
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
          <SubNavBar />
        </Affix>
        <Layout style={{ minHeight: '100vh' }}>
          <Affix offsetTop={136}>
            <Sider
              collapsedWidth="0"
              defaultCollapsed={Object.values(getSearchParams()).length !== 0}
              theme="light"
              collapsible
              style={{ borderRight: '1px solid #f0f0f0' }}
            >
              <SearchForm setSearchFormData={setSearchFormData} />
            </Sider>
          </Affix>
          <Content className="item-list-row">
            {isSearching ? (
              <Loading
                customStyle={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ) : (
              <Row justify="space-between" height="100%">
                <Col span={15} className="item-list">
                  {!items ? (
                    <div
                      style={{
                        fontSize: '1.2em',
                        textAlign: 'center',
                        width: '100%',
                        height: '100vh',
                        marginTop: '10em',
                      }}
                    >
                      Try Our Search!
                    </div>
                  ) : items.length !== 0 ? (
                    <div>
                      <h1>Listings Near You</h1>
                      <div className="item-icons">
                        <Space direction="vertical" className="filter">
                          <Space wrap>
                            <Dropdown overlay={menu} placement="bottomCenter">
                              <Button icon={<OrderedListOutlined />}>
                                Sort by
                              </Button>
                            </Dropdown>
                          </Space>
                        </Space>
                      </div>

                      <div className="items">
                        <Item
                          Products={items}
                          changeData={changeData}
                          itemData={itemData}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: '1.2em',
                        textAlign: 'center',
                        width: '100%',
                        height: '100vh',
                        marginTop: '10em',
                      }}
                    >
                      No matching results found, Please try again...
                      <a onClick={() => history.goBack()}>
                        <div>Return to previous page</div>
                      </a>
                    </div>
                  )}
                </Col>

                <Col span={9} className="map-container">
                  <Affix offsetTop={136}>
                    <GoogleMap
                      centerLatitude={centerLatitude}
                      centerLongitude={centerLongitude}
                      latitude={itemData?.geo_location?.lat}
                      longitude={itemData?.geo_location?.lon}
                      goToDetail={goToDetail}
                      listingId={itemData?.listing_id}
                    />
                  </Affix>
                </Col>
              </Row>
            )}
          </Content>
        </Layout>
        <Layout>
          <Footer style={{ zIndex: 15 }}>
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default ItemList;
