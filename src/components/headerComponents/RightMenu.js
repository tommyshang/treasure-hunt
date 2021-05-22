import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Menu, Button } from 'antd';

const { Item } = Menu;


class RightMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal" className="Right-menu">
                <Item key="/savedItems">
                    <a href="">Saved Items</a>
                </Item>
                <Item key="/myListings">
                    <a href="">My Listings</a>
                </Item>

                <Item key="/signIn">
                    <a href="">Sign In</a>
                </Item>
                <Item key="/signUp">
                    <Button type="primary">Sign Up</Button>
                </Item>
            </Menu>
        );
    }
}
export default RightMenu;
