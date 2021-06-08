import React from 'react';
import { Carousel, Image } from 'antd';
//import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { PICTURE_URL_PREFIX } from 'constants/constants';
import '../styles/Pictures.css';

const Pictures = (props) => {
  const { pictureUrls } = props;
  const urls = Object.values(pictureUrls);
  const pageName = 'Listing Detail Page: Pictures: ';

  return (
    <div>
      <Carousel
        className="carousel"
        // style={{
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}
        // autoplay
        // arrows
        // nextArrow={<ArrowRightOutlined />}
        // prevArrow={<ArrowLeftOutlined />}
        swipeToSlide={true}
      >
        {urls.map((url) => {
          console.log(
            `${pageName}Getting picture from : ${PICTURE_URL_PREFIX}${url}`
          );
          return (
            <div
              className="my-img-container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  display: 'flex',
                  justifySelf: 'center',
                  alignSelf: 'center',
                }}
                src={`${PICTURE_URL_PREFIX}${url}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Pictures;
