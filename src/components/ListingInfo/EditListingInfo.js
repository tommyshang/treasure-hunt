import { LoadingOutlined } from '@ant-design/icons';
import { Affix, Col, Layout, message, Row, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import AppFooter from 'components/Footer/AppFooter';
import TopNavBar from 'components/Header/TopNavBar';
import { buildFullPictureUrl, checkValidToken } from 'utils';

import ListingImage from './CreateListingImage/ListingImage';
import EditListing from './EditListingInfo/EditListing';
import Headline from './Headline/Headline';

const { Content, Footer } = Layout;

const EditListingInfo = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({});
  const { listing_id } = useParams();

  const history = useHistory();

  useEffect(() => {
    console.log('fetching data');
    axios
      .get('/api/listing', {
        params: {
          listing_id: listing_id,
        },
      })
      .then((res) => {
        console.log('fetched data');
        console.log(res);

        if (res.data.seller_id !== checkValidToken()) {
          message.error('You cannot edit listings that are not yours');
          history.replace('/');
        } else {
          const rawformData = res.data;
          // convert picture urls
          console.log(rawformData);
          const originalPictures = Object.entries(rawformData.picture_urls).map(
            ([key, value]) => {
              return {
                uid: key,
                name: key.slice(13),
                status: 'done',
                url: buildFullPictureUrl(value),
              };
            }
          );

          console.log(originalPictures);
          rawformData.upload = originalPictures;
          setFormData(rawformData);
          setIsFetching(false);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="EditListingInfo">
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
        </Affix>
        <Content>
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
            <Row className="main">
              <Col span={12} className="left-side">
                <Headline />
                <br />
                <br />
                <EditListing formData={formData} />
              </Col>
              <Col span={12} className="right-side">
                <ListingImage />
              </Col>
            </Row>
          )}
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </div>
  );
};

export default EditListingInfo;
