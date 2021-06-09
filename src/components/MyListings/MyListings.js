import React, { useEffect, useState } from 'react';
import { Affix, Button, Layout, List, Space, message } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import { PICTURE_URL_PREFIX } from '../../constants/constants';
import './MyListings.style.css';
import { useDeleteListing, useFetchMyListings } from 'hooks';
import { useHistory } from 'react-router-dom';
import TopNavBar from 'components/Header/TopNavBar';
import AppFooter from 'components/Footer/AppFooter';
import { Loading } from 'components';
import { checkValidToken, formatPrice } from 'utils';

const { Content, Footer } = Layout;

const MyListings = () => {
  // listings stores listings data stored in db
  const history = useHistory();
  const [myListings, setMyListings] = useState([]);
  const { isFetching, fetchMyListings } = useFetchMyListings();
  const { isDeleting, deleteListing } = useDeleteListing();


  
  const fetch = async () => {
    const { listings, error } = await fetchMyListings();
    if (error !== undefined) {
      if (error === 401) {
        message.info('Please login to see your listings');
        history.replace({
          pathname: '/login',
          from: '/my-listings',
        });
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

  const ListingInfo = ({ item, value }) => (
    <Space
      style={{
        color: ' rgba(0, 0, 0, 0.45)',
        fontSize: '14px',
        lineHeight: 1.5715,
        marginBottom: '10px',
      }}
    >
      {item}
      {value}
    </Space>
  );

  const handleDelete = async (e, listingId) => {
    e.stopPropagation();
    const { error } = await deleteListing(checkValidToken(), listingId);
    if (error !== undefined) {
      message.error(`Delete listing failed`);
    } else {
      message.success(`Delete successful`);
      setMyListings(
        myListings.filter((myListing) => myListing.listing_id !== listingId)
      );
    }
  };

  const handleEdit = (e, listingId) => {
    e.stopPropagation();
    history.push(`/edit/${listingId}`);
  };

  return (
    <div className="my-listings-page">
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
        </Affix>
        <Content className="my-listings-content">
          {isFetching || isDeleting ? (
            <Loading
              customStyle={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
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
                hideOnSinglePage: true,
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
                    <Button
                      onClick={(e) => handleEdit(e, item.listing_id)}
                      className="edit"
                      icon={<EditFilled />}
                    />,
                    <Button
                      onClick={(e) => handleDelete(e, item.listing_id)}
                      className="delete"
                      icon={<DeleteFilled />}
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
                    description={
                      <div className="listing-description">
                        {item.description}
                      </div>
                    }
                  />
                  <ListingInfo
                    item="Price : "
                    value={formatPrice(item.price)}
                    key="listing_price"
                  />
                  <br />
                  <ListingInfo
                    item="Created At : "
                    value={item.date.slice(0, 10)}
                    key="listing_date"
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
