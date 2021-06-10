import { Carousel } from 'antd';
import React, { Component } from 'react';

import CarouselSlideBuy from './CarouselSlideBuy';
import CarouselSlideSell from './CarouselSlideSell';

function onChange(a, b) {
  console.log(a, b);
}

class CarouselSlides extends Component {
  render() {
    return (
      <Carousel afterChange={onChange}>
        <div>
          <CarouselSlideSell />
        </div>
        <div>
          <CarouselSlideBuy />
        </div>
      </Carousel>
    );
  }
}

export default CarouselSlides;
