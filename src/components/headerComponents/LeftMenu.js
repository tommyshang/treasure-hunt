import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {Menu, Space, Input} from 'antd';

import logo from '../../assets/images/logo.png';

const { Search } = Input;

const onSearch = value => console.log(value);



class LeftMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal" className="Left-menu">

                <Menu.Item key="App-logo">
                        <a href="">
                            <img alt={"app-logo"} src={logo} />
                        </a>
                </Menu.Item>

                <Menu.Item key="/shop">
                    <a href="">Shop</a>
                </Menu.Item>

                <Menu.Item key="/sell">
                    <a href="">Sell</a>
                </Menu.Item>

                <Menu.Item key="/search">
                    <input placeholder="search" type="text" className="ant-input ds-input" onSearch={onSearch}></input>
                </Menu.Item>
            </Menu>
        );
    }
}
export default LeftMenu;
