import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Layout, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Pictures from './components/Pictures';
import TextualInfo from './components/TextualInfo';
import './ListingDetail.css';
import { useFetchListingDetail } from 'hooks';
const { Header, Content } = Layout;

const ListingDetail = (props) => {
  const [listingDetail, setListingDetail] = useState({
    picture_urls: {},
  });

  const { isFetching, fetchListingDetail } = useFetchListingDetail();

  //TODO: product_id and userID is passed from pervious page
  const testMode = false;//use fake data when is true
  const productId = '1622912913813';
  const userID = 'lichengrao3';
  const fakeData = {
    listing_id: '1622614549717',
    title: "Frankie's Bicycle",
    price: 149.99,
    category: 'Bicycle',
    seller_id: 'lichengrao3',
    seller_name: 'Chan Rao',
    description: 'This is a Cannondale CAAD 10 from 2031',
    item_condition: 'Like New',
    brand: 'Cannondale',
    address: '2922 Northern Blvd #2104, Long Island City, NY 11101, USA',
    picture_urls: {
      a: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      b: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      c: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    date: '2021-06-02T17:01:14.421Z',
    geo_location: {
      lat: 40.7493004,
      lon: -73.9364811,
    },
    city_and_state: 'Long Island City, NY',
  };

  const fetch = async () => {
    console.log("fetching...")
    const { fetchedListingDetail, error } = await fetchListingDetail(productId);
    if (error !== undefined) {
      message.error('Fetch listing detail failed');
    } else {
      setListingDetail(fetchedListingDetail);
      console.log("fetch listing detail: ")
      console.log(fetchedListingDetail)
    }
  };

  useEffect(() => {
    fetch();
    if (testMode) {
      setListingDetail(fakeData);
    }
  }, []);

  const history = useHistory();
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>
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
              <Col xs={{ span: 24 }} lg={{ span: 10, gutter: 2 }}>
                {/* <Pictures pictureUrls={listingDetail.picture_urls} /> */}
              </Col>
              <Col xs={{ span: 24 }} lg={{ offset: 2, span: 10 }}>
                <TextualInfo listingInfo={listingDetail} userID={userID} />
              </Col>
            </Row>
          </Col>
        </Content>
      </Layout>
    </div>
  );
};

export default ListingDetail;
