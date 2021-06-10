import { Affix, Col, Layout, message, Row } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import AppFooter from 'components/Footer/AppFooter';
import TopNavBar from 'components/Header/TopNavBar';
import { checkValidToken } from 'utils';

import ListingImage from './CreateListingImage/ListingImage';
import CreateListing from './CreateListingInfo/CreateListing';
import Headline from './Headline/Headline';

const { Content, Footer } = Layout;

function CreateListingInfo() {
  const history = useHistory();

  useEffect(() => {
    if (checkValidToken() === null) {
      message.info('Please login before you create a listing');
      history.replace({
        pathname: '/login',
        from: '/sell',
      });
    }
  }, []);

  return (
    <div className="CreateListingInfo">
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
        </Affix>
        <Content>
          <Row className="main">
            <Col span={12} className="left-side">
              <Headline />
              <br />
              <br />
              <CreateListing />
            </Col>
            <Col span={12} className="right-side">
              <ListingImage />
            </Col>
          </Row>
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </div>
  );
}

export default CreateListingInfo;
