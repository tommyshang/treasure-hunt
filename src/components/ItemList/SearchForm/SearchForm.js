import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { CompassOutlined, SearchOutlined } from '@ant-design/icons';
import { getLatLongFromZip } from 'utils';

const SearchForm = ({ setSearchFormData }) => {
  const onFinish = async (values) => {
    const {
      keyword,
      zipcode,
      radius,
      condition,
      min_price,
      max_price,
      time_interval,
    } = values;

    if (zipcode && radius) {
      try {
        const { lat, lng } = await getLatLongFromZip(zipcode);
        values.latitude = lat;
        values.longitude = lng;
      } catch (err) {
        console.error(err);
      }
    }

    Object.entries(values).forEach(([key, val]) => {
      if (typeof val === 'string' && val.trim() === '') {
        values[key] = undefined;
      }
    });

    console.log(values);
    setSearchFormData(values);
  };

  return (
    <>
      <Form
        style={{ margin: '70px 10px' }}
        labelCol={{
          span: 23,
        }}
        wrapperCol={{
          span: 23,
        }}
        layout="vertical"
        size="small"
        colon="false"
        onFinish={onFinish}
        validateTrigger="onBlur"
      >
        <Form.Item label="Search" name="keyword">
          <Input prefix={<SearchOutlined />} placeholder="Search..." />
        </Form.Item>
        <Form.Item
          label="Zipcode"
          name="zipcode"
          rules={[{ pattern: '^[0-9]{5}$', message: 'Valid zipcode only' }]}
        >
          <Input
            prefix={<CompassOutlined />}
            placeholder="Zipcode..."
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Radius"
          name="radius"
          rules={[
            {
              pattern: '^[0-9]+(.[0-9]{1,2})?$',
              message: 'Please input a valid number',
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Item condition" name="condition">
          <Select>
            <Select.Option value="New">New</Select.Option>
            <Select.Option value="Used - Like new">
              Used - Like new
            </Select.Option>
            <Select.Option value="Used - Good">Used - Good</Select.Option>
            <Select.Option value="Used - Fair">Used - Fair</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Min Price"
          name="min_price"
          rules={[
            {
              pattern: '^[0-9]+(.[0-9]{1,2})?$',
              message: 'Please input a valid number',
            },
          ]}
        >
          <Input placeholder="Min" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Max Price"
          name="max_price"
          rules={[
            {
              pattern: '^[0-9]+(.[0-9]{1,2})?$',
              message: 'Please input a valid number',
            },
          ]}
        >
          <Input placeholder="Max" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Date listed" name="time_interval">
          <Select>
            <Select.Option value="365">All</Select.Option>
            <Select.Option value="1">Last 24 hours</Select.Option>
            <Select.Option value="7">Last 7 days</Select.Option>
            <Select.Option value="30">Last 30 days</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SearchForm;
