import { Layout, Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

const { Header } = Layout;

const SubNavBar = () => {
  const history = useHistory();

  const categories = [
    'Cars',
    'Exercise Equipments',
    'Furniture',
    'Electronics',
    'Books',
    'Apparels',
  ];

  const handleClick = (category) => {
    history.push({
      pathname: '/items',
      search: `?category=${category}`,
    });
  };
  return (
    <Header className="Sub-nav-bar">
      <Menu mode="horizontal" className="Sub-nav-bar-menu">
        {categories.map((item, index) => (
          <Menu.Item key={index} onClick={() => handleClick(item)}>
            {item}
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default SubNavBar;
