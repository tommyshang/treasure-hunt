import React, { useEffect, useState } from 'react';
import { Affix, Layout, List, Space, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { PICTURE_URL_PREFIX } from 'constants/constants';
import './MyListings.style.css';
import { useFetchMyListings, useLogin } from 'hooks';
import { useHistory } from 'react-router';
import TopNavBar from 'components/Header/TopNavBar';
import AppFooter from 'components/Footer/AppFooter';

const { Header, Content, Footer } = Layout;

const MyListings = () => {
  // listings stores listings data stored in db
  const history = useHistory();
  const [myListings, setMyListings] = useState([]);
  const { isFetching, fetchMyListings } = useFetchMyListings();

  const fetch = async () => {
    const { listings, error } = await fetchMyListings();
    if (error !== undefined) {
      if (error === 401) {
        message.error('Please login');
        history.push('/login');
      } else {
        message.error('Failed to get my listings');
      }
    } else {
      setMyListings(listings);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const getPictureUrl = (picture_urls) => {
    return `${PICTURE_URL_PREFIX}${Object.values(picture_urls)[0]}`;
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const ListingInfo = ({ item, value }) => (
    <Space>
      {item}
      {value}
    </Space>
  );

  return (
    <div className="my-listings-page">
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
        </Affix>
        <Content className="my-listings-content">
          {isFetching ? (
            <Spin
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              indicator={antIcon}
            />
          ) : (
            <List
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={myListings.reverse()} // Sorted by recency
              renderItem={(item) => (
                <List.Item
                  onClick={() =>
                    history.push(`/listing-detail/${item.listing_id}`)
                  }
                  className="list-item"
                  key={item.listing_id}
                  actions={[
                    <ListingInfo
                      item="Price : "
                      value={item.price}
                      key="listing_price"
                    />,
                    <ListingInfo
                      item="Created At : "
                      value={item.date.slice(0, 10)}
                      key="listing_date"
                    />,
                  ]}
                  extra={
                    <img
                      height={180}
                      alt="logo"
                      src={getPictureUrl(item.picture_urls)}
                    />
                  }
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          )}
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </div>
  );
};

export default MyListings;
