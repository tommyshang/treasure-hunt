import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Menu } from 'antd';

import logo from 'assets/images/logo.png';

const onSearch = (value) => console.log(value);

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal" className="Left-menu">
        {/*TODO: if isLoggedIn is false, direct to Login/signup page*/}
        {/*TODO: remove border bottom?*/}
        <Menu.Item key="App-logo">
          <NavLink to="/" activeClassName="logo-active-class" className="link">
            <img alt={'app-logo'} src={logo} />
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/items">
          <NavLink
            to="/items"
            activeClassName="items-active-class"
            className="link"
          >
            Shop
          </NavLink>
        </Menu.Item>

        {/*TODO: if isLoggedIn is false, direct to Login/signup page*/}
        <Menu.Item key="/sell">
          <NavLink
            to="/sell"
            activeClassName="Sell-active-class"
            className="link"
          >
            Sell
          </NavLink>
        </Menu.Item>

        {/*TODO: change search bar style*/}
        <Menu.Item key="/search">
          <input
            placeholder="search"
            type="text"
            className="ant-input ds-input"
            onSearch={onSearch}
          ></input>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
