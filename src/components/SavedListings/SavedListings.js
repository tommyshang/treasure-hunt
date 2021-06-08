import React, { useEffect, useState } from 'react';
import { Affix, Card, Col, Layout, List, Row, message } from 'antd';

import { PICTURE_URL_PREFIX } from '../../constants/constants';
import './SavedListings.style.css';
import { useFetchSavedListings } from 'hooks';
import { useHistory } from 'react-router';
import TopNavBar from 'components/Header/TopNavBar';
import AppFooter from 'components/Footer/AppFooter';
import { Loading } from 'components';
import { formatPrice } from 'utils';

const { Content, Footer } = Layout;
const { Meta } = Card;

const SavedListings = () => {
  // listings stores listings data stored in db
  const history = useHistory();
  const [savedListings, setSavedListings] = useState([]);
  const { isFetching, fetchSavedListings } = useFetchSavedListings();

  const fetch = async () => {
    const { listings, error } = await fetchSavedListings();
    if (error !== undefined) {
      if (error === 401) {
        message.info('Please login to see your saved listings');
        history.replace({
          pathname: '/login',
          from: '/saved-listings',
        });
      } else {
        message.error('Failed to get saved listings');
      }
    } else {
      setSavedListings(listings);
    }
  };

  useEffect(() => {
    fetch();
    console.log(savedListings);
  }, []);

  const getPictureUrl = (picture_urls) => {
    return `${PICTURE_URL_PREFIX}${Object.values(picture_urls)[0]}`;
  };

  return (
    <div className="saved-listings-page">
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
        </Affix>
        <Content className="saved-listings-content">
          {isFetching ? (
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
              grid={{
                gutter: 48,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 5,
              }}
              dataSource={savedListings}
              renderItem={(item) => (
                <List.Item
                  key={item.listing_id}
                  onClick={() =>
                    history.push(`/listing-detail/${item.listing_id}`)
                  }
                >
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={
                      <img
                        style={{ padding: '1px' }}
                        alt="pic"
                        src={getPictureUrl(item.picture_urls)}
                      />
                    }
                  >
                    <Meta title={item.title} className="listing-info" />
                    <Row gutter={[16, 24]} className="listing-info">
                      <Col>
                        <div className="saved-listing-info-text">
                          {item.description}
                        </div>
                      </Col>
                    </Row>
                    <Row
                      gutter={[16, 24]}
                      justify="space-between"
                      className="listing-info"
                    >
                      <Col>
                        <div className="saved-listing-info-sub-text">
                          {formatPrice(item.price)}
                        </div>
                      </Col>
                      <Col>
                        <div className="saved-listing-info-sub-text">
                          {item.city_and_state}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Content>

        <Footer>
          {/* TODO make this at the bottom */}
          <AppFooter />
        </Footer>
      </Layout>
    </div>
  );
};

export default SavedListings;
