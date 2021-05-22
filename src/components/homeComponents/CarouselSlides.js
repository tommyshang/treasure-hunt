import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { Carousel } from 'antd';

import CarouselSlideSell from './CarouselSlideSell';
import CarouselSlideBuy from './CarouselSlideBuy';


function onChange(a, b, c) {
    console.log(a, b, c);
}




class CarouselSlides extends Component {

    render() {
        return (
            <Carousel afterChange={onChange}
            >
                <div>
                    <CarouselSlideSell/>
                </div>
                <div>
                    <CarouselSlideBuy/>
                </div>
            </Carousel>
        );
    }
}

export default CarouselSlides;
