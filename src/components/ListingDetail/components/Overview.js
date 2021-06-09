import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Popconfirm, Row, Col, Button, message } from 'antd';
import {
  StarOutlined,
  StarFilled,
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons';
import {
  useSaveListing,
  useUnsaveListing,
  useFetchSavedListings,
  useDeleteListing,
} from 'hooks';
import '../styles/Overview.css';
import { useHistory } from 'react-router';
import { checkValidToken } from 'utils';

import { TOKEN_KEY } from 'constants/constants';
import { Loading } from 'components';
import { formatPrice } from 'utils';
import axios from 'axios';

const Overview = (props) => {
  const pageName = 'Listing Detail Page: Overview: ';
  const { listingInfo } = props;
  const history = useHistory();

  const listingId = listingInfo.listing_id;
  const sellerId = listingInfo.seller_id;

  const { isSaving, saveListing } = useSaveListing();
  const { isUnsaving, unsaveListing } = useUnsaveListing();
  const { isFetching, fetchSavedListings } = useFetchSavedListings();
  const { isDeleting, deleteListing } = useDeleteListing();

  const [isSave, setIsSave] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    setUserId(checkValidToken());
    if (userId !== null) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
      setIsSeller(false);
    }
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    checkIsSeller();
  }, [isLogIn, sellerId]);

  const checkIsSeller = () => {
    console.log(userId);
    if (userId !== null) {
      console.log(sellerId);
      if (userId === sellerId) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    }
  };

  useEffect(() => {
    checkInSaveListing();
  }, [listingId]);

  // fetch save listings and check if current listing/item is in fetched listings
  const checkInSaveListing = async () => {
    const userId = checkValidToken();
    if (userId === null || listingId === undefined) {
      return;
    }
    const { listings, error } = await fetchSavedListings();
    if (error !== undefined) {
      message.error(`${pageName}Failed to get user saved listings`);
    } else {
      const match = (item) => item.listing_id === listingId;

      // setIsSave(listings.some((item) => item.listing_id === listingId));
      const bool = listings.some(match);
      setIsSave(bool);
    }
  };

  //TODO: link to login page
  const onSaveClick = async () => {
    // check if token is still valid
    if (!isLogIn) {
      localStorage.removeItem(TOKEN_KEY);
      history.push({
        pathname: '/login',
        from: `/listing-detail/${listingId}`,
      });
    } else if (isSave) {
      await unsave();
    } else {
      await save();
    }
  };

  const save = async () => {
    const { error } = await saveListing({
      userId: checkValidToken(),
      listingId,
    });
    if (error !== undefined) {
      message.error(`Save listing failed`);
    } else {
      message.success(`Successfully saved`);
      setIsSave(true);
    }
  };

  const unsave = async () => {
    const { error } = await unsaveListing({
      userId: checkValidToken(),
      listingId,
    });
    if (error !== undefined) {
      message.error(`Unsave listing failed`);
    } else {
      message.success(`Successfully removed from saved`);
      setIsSave(false);
    }
  };

  // TODO: route to edit listing page
  const onEditClick = () => {
    console.log(`${pageName}Edit btn clicked`);
    console.log(`${pageName}Go to edit listing page`);
    history.push(`/edit/${listingId}`);
  };

  const onDeleteClick = async () => {
    //TODO: delete listing and route to previous page
    console.log(`${pageName}Delete btn clicked`);
    const { error } = await deleteListing(userId, listingId);
    if (error !== undefined) {
      message.error(`Delete listing failed`);
    } else {
      message.success(`Delete successful`);
      history.replace('/my-listings');
    }
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Row justify="space-between">
        <Col>
          <Row className="product-name">{listingInfo.title}</Row>
          <Row className="price">
            <div>{formatPrice(listingInfo.price)}</div>
          </Row>
          <Row className="date-location">
            <div>
              Listed {moment(listingInfo.date, 'YYYYMMDD').fromNow()} in{' '}
              {listingInfo.city_and_state}
            </div>
            <Row className="catergries">Category: {listingInfo.category}</Row>
          </Row>
        </Col>
        <Col xs={6} className="btns-container" align="right">
          {isSeller ? (
            <div>
              <Button
                size="large"
                className="edit"
                onClick={onEditClick}
                icon={<EditFilled />}
              />
              <Popconfirm
                title="Are you sure to delete listing?"
                visible={visible}
                onConfirm={onDeleteClick}
                onCancel={handleCancel}
              >
                <Button
                  size="large"
                  className="delete"
                  onClick={showPopconfirm}
                  icon={<DeleteFilled />}
                />
              </Popconfirm>
            </div>
          ) : isLoading || isFetching ? (
            <Loading customStyle={{ paddingTop: '7px', paddingRight: '9px' }} />
          ) : (
            <Button
              size="large"
              loading={isSaving || isUnsaving}
              className="star"
              icon={
                isSave ? (
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
    </div>
  );
};

export default Overview;
