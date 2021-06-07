import React from 'react';
import { Carousel } from 'antd';
//import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { PICTURE_URL_PREFIX } from '../../../constants/constants';
import '../styles/Pictures.css';



const Pictures = (props) => {
  const { pictureUrls } = props;
  const urls = Object.values(pictureUrls);
  const pageName = 'Listing Detail Page: Pictures: ';
  return (
    <div>
      <Carousel
        className="carousel"
        autoplay
        // arrows
        // nextArrow={<ArrowRightOutlined />}
        // prevArrow={<ArrowLeftOutlined />}
        swipeToSlide={true}
      >
        {urls.map((url) => {
          console.log(`${pageName}Getting picture from : ${PICTURE_URL_PREFIX}${url}`);
          return <img src={`${PICTURE_URL_PREFIX}${url}`} />;
        })}
      </Carousel>
    </div>
  );
};

export default Pictures;