import React from 'react';
import { Carousel, Image } from 'antd';
// import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { PICTURE_URL_PREFIX } from 'constants/constants';
import '../styles/Pictures.css';

const Pictures = (props) => {
  const { pictureUrls } = props;
  const urls = Object.values(pictureUrls);
  const pageName = 'Listing Detail Page: Pictures: ';

  return (
    <div style={{ width: '96%', overflow: 'hidden' }}>
      <Carousel
        className="carousel"
        style={{
          position: 'relative',
          left: '-2px',
        }}
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
            <div className="my-img-container">
              <Image
                style={{
                  objectFit: 'cover',
                  minWidth: '400px',
                  height: '500px',
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
