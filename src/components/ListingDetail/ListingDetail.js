import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Affix, Row, Col, Button, Layout, message, Spin } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import Pictures from './components/Pictures';
import TextualInfo from './components/TextualInfo';
import './ListingDetail.css';
import { useFetchListingDetail } from 'hooks';
import TopNavBar from 'components/Header/TopNavBar';

const { Header, Content } = Layout;

const ListingDetail = () => {
  const { listing_id } = useParams();
  const [listingDetail, setListingDetail] = useState({
    picture_urls: {},
  });

  const { isFetching, fetchListingDetail } = useFetchListingDetail();

  const fetch = async () => {
    const { fetchedListingDetail, error } = await fetchListingDetail(
      listing_id
    );
    if (error !== undefined) {
      message.error('Fetch listing detail failed');
    } else {
      setListingDetail(fetchedListingDetail);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <Layout>
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
            <Col span={20} offset={2}>
              <Row
                span={24}
                onClick={() => {
                  history.goBack();
                }}
              >
                <Button className="back-btn" icon={<ArrowLeftOutlined />}>
                  Back
                </Button>
              </Row>
              <Row className="content">
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 24 }}
                  xl={{ span: 24 }}
                  xxl={{ span: 10, gutter: 2 }}
                >
                  <Pictures pictureUrls={listingDetail.picture_urls} />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 24 }}
                  xl={{ span: 24 }}
                  xxl={{ offset: 2, span: 10 }}
                >
                  <TextualInfo listingInfo={listingDetail} />
                </Col>
              </Row>
            </Col>
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default ListingDetail;
