import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Button, message } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useSaveListing } from 'hooks';
import { useFetchMyListings } from 'hooks';
import '../styles/Overview.css';

const Overview = (props) => {
  const pageName = 'Listing Detail Page: Overview: ';
  const { listingInfo, userId } = props;
  const listingId = listingInfo.listing_id;
  const sellerId = listingInfo.seller_id;
  const { isSaving, saveListing } = useSaveListing();
  const { isFetching, fetchMyListings } = useFetchMyListings();

  const [isSave, setIsSave] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const testMode = false;
  const test = () => {
    setIsSeller(false); //check if user is seller
    setIsSave(false); //check if this is saved by buyer
    setIsLogIn(true); //check if user is login
  };

  const url = useEffect(() => {
    initState();
    if (testMode) {
      test();
    }
  }, []);

  const initState = () => {
    //TODO: init isSave isLogIn isSeller
    if (sellerId === userId) {
      setIsSeller(true);
    } else {
      //use is buyer
      setIsSeller(false);
      //check if buyer has saved listings
      checkInSaveListing();
    }
  };

  // fetch save listings and check if current listing/item is in fetched listings
  const checkInSaveListing = async () => {
    const { listings, error } = await fetchMyListings();
    if (error !== undefined) {
      message.error(`${pageName}Failed to get saved listings`);
    } else {
      for (const item in listings) {
        if (listingId == item.listing_id) {
          setIsSave(true);
        }
      }
    }
  };

  //TODO: link to login page
  const onSaveClick = () => {
    console.log('Save btn clicked');
    if (!isLogIn) {
      //TODO: link to login page
      console.log(`${pageName}Buyer save without login. Go to login page`);
    } else {
      save(!isSave);
      console.log(`${pageName}negate save star`);
    }
  };

  const save = async (save) => {
    const { listings, error } = await saveListing(save, userId, listingId);
    if (error !== undefined) {
      const action = save ? 'Save' : 'Unsave';
      message.error(`${pageName}${action} listing failed`);
    } else {
      setIsSave(!isSave);
    }
  };

  // TODO: route to edit listing page
  const onEditClick = () => {
    console.log(`${pageName}Edit btn clicked`);
    console.log(`${pageName}Go to edit listing page`);
  };

  return (
    <div>
      <Row>
        <Row className="catergries">Catergries / {listingInfo.category}</Row>
        <Col xs={24} sm={24} md={16} lg={16} xl={24} xl={24} xxl={16}>
          <Row className="product-name">{listingInfo.title}</Row>
          <Row className="date-location">
            <div>
              Listed {moment(listingInfo.date, 'YYYYMMDD').fromNow()} in{' '}
              {listingInfo.city_and_state}
            </div>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8} className="btn">
          {isSeller === false ? ( //isSeller for testing
            <Button
              size="large"
              className="star"
              icon={
                isSave === true ? ( //isSave for testing
                  <StarFilled style={{ color: 'black' }} />
                ) : (
                  <StarOutlined style={{ color: 'black' }} />
                )
              }
              onClick={onSaveClick}
            />
          ) : (
            <Button onClick={onEditClick}>Edit</Button>
          )}
        </Col>
      </Row>
      <Row className="price">
        <div>${listingInfo.price}</div>
      </Row>
    </div>
  );
};

export default Overview;
