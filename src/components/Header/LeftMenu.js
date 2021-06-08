import React from "react";
import {NavLink} from "react-router-dom";

import {Menu, Input, AutoComplete} from "antd";

import { useHistory } from 'react-router-dom';

import logo from "../../assets/images/logo.png";



const options = [
    {
      value: 'Cars',
    },
    {
      value: 'Exercise Equipments',
    },
    {
      value: 'Furniture',
    },
    {
      value: 'Phone',
    },
    {
      value: 'Electronics',
    },
    {
      value: 'Books',
    },
];




const LeftMenu = () =>  {
   let history = useHistory();
  
    const handleSearch = (para) => {
      history.push(`/items/${para}`)  
    }

   
      return (
          <Menu mode="horizontal" className="Left-menu">
              {/*TODO: if isLoggedIn is false, direct to Login/signup page*/}
              {/*TODO: remove border bottom?*/}
              <Menu.Item key="App-logo">
                  <NavLink  to="/" activeClassName="logo-active-class" className="link">
                      <img alt={"app-logo"} src={logo} />
                  </NavLink>
              </Menu.Item>

              <Menu.Item key="/items">
                  <NavLink  to="/items" activeClassName="items-active-class" className="link">Shop</NavLink>
              </Menu.Item>

              {/*TODO: if isLoggedIn is false, direct to Login/signup page*/}
              <Menu.Item key="/sell">
                  <NavLink  to="/sell" activeClassName="Sell-active-class" className="link">Sell</NavLink>
              </Menu.Item>

              {/*TODO: change search bar style*/}
              <Menu.Item key="/search">
              <AutoComplete
                  dropdownClassName="certain-category-search-dropdown"
                  dropdownMatchSelectWidth={500}
                  style={{ width: 250 }}
                  options={options}
              >
                  <Input.Search 
                      placeholder="Search Something..."
                      onSearch={handleSearch}
                  />
              </AutoComplete>
              </Menu.Item>
          </Menu>
      );
    }

export default LeftMenu;
