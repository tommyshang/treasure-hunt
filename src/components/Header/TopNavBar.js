import React, { Component } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

import { Layout, Col, Row, Input } from 'antd';

const { Header } = Layout;

const { Search } = Input;
const onSearch = (value) => console.log(value);

function TopNavBar(props) {
  const { isLoggedIn, handleLogout } = props;
  return (
    <Header className="Top-nav-bar">
      {/*TODO: cannot change text color (unlike for sub nav bar). Would <Link to="/savedItems"> vs. <NavLink vs. <a href make a difference in customizing the menu item theme? */}
      <Row align="bottom">
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          <LeftMenu />
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <RightMenu />
        </Col>
      </Row>

      {/*<div className="space-align-container">*/}

      {/*<Space className="space-align" size="large" direction="horizontal">*/}

      {/*    <LeftMenu></LeftMenu>*/}

      {/*    /!*<Search placeholder="input search text" onSearch={onSearch} enterButton className="nav-list-search"/>*!/*/}
      {/*    <input placeholder="search" type="text" className="ant-input ds-input" onSearch={onSearch}>*/}

      {/*        /!*autoComplete="off" spellCheck="false" role="combobox" aria-autocomplete="list"*!/*/}
      {/*        /!*aria-expanded="false" aria-label="search input" aria-owns="algolia-autocomplete-listbox-0"*!/*/}
      {/*        /!*dir="auto" style="position: relative; vertical-align: top;"*!/*/}
      {/*    </input>*/}

      {/*    <RightMenu></RightMenu>*/}

      {/*</Space>*/}

      {/*</div>*/}

      {/*<Row>*/}
      {/*    <Col xs={20} sm={16} md={12} lg={8} xl={4}>*/}
      {/*                <a href="/">*/}
      {/*                    <img id="header-logo" alt={"app-logo"} src={logo} />*/}
      {/*                </a>*/}
      {/*    </Col>*/}

      {/*    <Col xs={2} sm={4} md={6} lg={8} xl={10}>*/}
      {/*                <LeftMenu></LeftMenu>*/}
      {/*    </Col>*/}
      {/*    <Col xs={2} sm={4} md={6} lg={8} xl={10}>*/}
      {/*                <RightMenu></RightMenu>*/}
      {/*    </Col>*/}
      {/*</Row>*/}
    </Header>
  );
}

export default TopNavBar;
