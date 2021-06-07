import React, { Component } from 'react';

import { Carousel } from 'antd';

import CarouselSlideSell from './CarouselSlideSell';
import CarouselSlideBuy from './CarouselSlideBuy';

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
