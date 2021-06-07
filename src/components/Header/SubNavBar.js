import React, { Component } from 'react';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

class SubNavBar extends Component {
  render() {
    return (
      <Header className="Sub-nav-bar">
        <Menu mode="horizontal" className="Sub-nav-bar-menu">
          <Menu.Item key="1">Cars </Menu.Item>
          <Menu.Item key="2">Exercise Equipments</Menu.Item>
          <Menu.Item key="3">Furniture</Menu.Item>
          <Menu.Item key="4">Electronics</Menu.Item>
          <Menu.Item key="5">Books</Menu.Item>
          <Menu.Item key="6">Apparels</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default SubNavBar;
