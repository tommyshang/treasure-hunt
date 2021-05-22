import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Menu, Button } from 'antd';

const { Item } = Menu;

const navBarSignUpButtonStyle={
    background: '#00a9cd',
    borderColor: '#00a9cd',
}
class RightMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal" activeClassName="Right-menu-active" className="Right-menu">
                <Item key="/savedItems" className="customMenuTheme">
                    {/*TODO: change to using <Link to="/savedItems">*/}
                    {/*<NavLink  to="/portoflio" activeClassName="your-active-class" className="link">Portoflio</NavLink>*/}
                    <a href="">Saved Items</a>
                </Item>
                <Item key="/myListings">
                    <a href="">My Listings</a>
                </Item>

                <Item key="/signIn">
                    <a href="">Sign In</a>
                </Item>
                <Item key="/signUp">
                    <Button type="primary" style={navBarSignUpButtonStyle}>Sign Up</Button>
                </Item>
            </Menu>
        );
    }
}
export default RightMenu;
