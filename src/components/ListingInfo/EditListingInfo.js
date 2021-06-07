import React, { useEffect, useState } from 'react';
import { Affix, Row, Col, Layout, message, Spin } from 'antd';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

import EditListing from './EditListingInfo/EditListing';
import ListingImage from './CreateListingImage/ListingImage';
import Headline from './Headline/Headline';
import TopNavBar from 'components/Header/TopNavBar';
import { useHistory, useParams } from 'react-router';
import { checkValidToken } from 'utils';
import AppFooter from 'components/Footer/AppFooter';

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
          setFormData(res.data);
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
