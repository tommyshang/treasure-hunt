import React, {Component} from 'react';
import { Link } from "react-router-dom";

import {Col, Row, Layout, Menu, Input, Space, Affix} from 'antd';

import CarouselSlides from './CarouselSlides'
import ShopCategory from './ShopCategory'
import TopNavBar from '../headerComponents/TopNavBar'
import SubNavBar from '../headerComponents/SubNavBar'
import HomeFlaunt from './HomeFlaunt'
import AppFooter from '../footerComponents/AppFooter'


const { Search } = Input;

const { Header, Content, Footer } = Layout;

const onSearch = value => console.log(value);

class Home extends Component {
    render() {
        return (
            <Layout className="Homelayout">

                <Affix offsetTop={0} className="app__affix-header">
                     <TopNavBar/>
                     <SubNavBar/>
                </Affix>

                <Content style={{ padding: '0 50px'}}>
                    <CarouselSlides/>
                    <ShopCategory/>
                    <HomeFlaunt/>
                </Content>
                
                <Footer>
                    <AppFooter/>
                </Footer>

          </Layout>
        );
    }
}

export default Home;
