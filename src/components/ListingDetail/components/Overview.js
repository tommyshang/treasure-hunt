import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Button, message } from 'antd';
import { StarOutlined, StarFilled, FastForwardFilled } from '@ant-design/icons';
import { useSaveListing } from 'hooks';
import { useFetchMyListings } from 'hooks';
import { TOKEN_KEY } from '../../../constants/constants';
import '../styles/Overview.css';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';

const Overview = (props) => {
  const pageName = 'Listing Detail Page: Overview: ';
  const { listingInfo } = props;

  const history = useHistory();

  const listingId = listingInfo.listing_id;
  const sellerId = listingInfo.seller_id;

  const { isSaving, saveListing } = useSaveListing();
  const { isFetching, fetchMyListings } = useFetchMyListings();

  const [isSave, setIsSave] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [decodedToken, setDecodedToken] = useState(undefined);

  useEffect(() => {
    checkInSaveListing();
  }, []);

  useEffect(() => {
    checkIsSeller();
  }, [isSeller]);

  const checkIsSeller = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      console.log(token);
      console.log('Trying to decode token');
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
      const userId = decoded.sub;
      if (userId === sellerId) {
        setIsSeller(true);
      }
    }
  };

  // fetch save listings and check if current listing/item is in fetched listings
  const checkInSaveListing = async () => {
    if (decodedToken === undefined) {
      return;
    }
    const { listings, error } = await fetchMyListings();
    if (error !== undefined) {
      console.log(`${pageName}Failed to get user saved listings`);
      message.error(`${pageName}Failed to get user saved listings`);
    } else {
      for (const item in listings) {
        if (listingId === item.listing_id) {
          setIsSave(true);
        }
      }
    }
  };

  //TODO: link to login page
  const onSaveClick = async () => {
    // check if token is still valid
    const tokenStillValid =
      decodedToken !== undefined && decodedToken.exp * 1000 >= Date.now();
    if (!tokenStillValid) {
      localStorage.removeItem(TOKEN_KEY);
      history.push('/login');
    } else if (isSave) {
      await save(false);
    } else {
      await save(true);
    }
  };

  const save = async (save) => {
    const { listings, error } = await saveListing(
      save,
      decodedToken.sub,
      listingId
    );
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
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xl={24} xxl={16}>
          <Row className="product-name">{listingInfo.title}</Row>
          <Row className="date-location">
            <div>
              Listed {moment(listingInfo.date, 'YYYYMMDD').fromNow()} in{' '}
              {listingInfo.city_and_state}
            </div>
          </Row>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={8}
          className="btn"
          align="right"
        >
          {isSeller ? (
            <Button className="edit" onClick={onEditClick}>
              Edit
            </Button>
          ) : (
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
