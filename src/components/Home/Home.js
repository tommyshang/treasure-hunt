import { Affix, Input, Layout } from 'antd';
import React, { Component } from 'react';

import AppFooter from '../Footer/AppFooter';
import SubNavBar from '../Header/SubNavBar';
import TopNavBar from '../Header/TopNavBar';
import CarouselSlides from './CarouselSlides';
import HomeFlaunt from './HomeFlaunt';
import ShopCategory from './ShopCategory';

const { Content, Footer } = Layout;

const { Search } = Input;
const onSearch = (value) => console.log(value);

const homeLayoutStyle = {
  background: 'white',
};

class Home extends Component {
  render() {
    return (
      // <Layout style={homeLayoutStyle}>
      <Layout className="Homelayout">
        <Affix offsetTop={0} className="app__affix-header">
          <TopNavBar />
          <SubNavBar />
        </Affix>

        <Content style={{ padding: '0 50px' }}>
          <CarouselSlides />
          <ShopCategory />
          <HomeFlaunt />
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

export default Home;
