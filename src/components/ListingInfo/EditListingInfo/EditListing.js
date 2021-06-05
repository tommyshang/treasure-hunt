import {
  Input,
  Form,
  Select,
  InputNumber,
  Radio,
  Button,
  Upload,
  Row,
  Col,
  message,
} from 'antd';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const { TextArea } = Input;

const EditListing = ({ id }) => {
  const [listing, setListing] = useState({});
  const { category, title, price, brand, upload, condition, description } = listing;


  function onChange(value) {
    console.log('changed', value);
  }

  useEffect(() => {
    console.log("fetching data");
    axios.get('/listing', {
      params: {
        listing_id: '1622754560957',
      }
    })
      .then((res) => {
        console.log("fetched data")
        console.log(res);
        setListing(res.data);
      })
      .catch((e) => console.log(e));
  }, []);




  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const { category, title, price, brand, upload, condition, description } = values;

    const formData = new FormData();
    formData.append("seller_user_id", "lichengrao3");
    formData.append("title", title);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("item_condition", condition);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("picture_1", upload[0].originFileObj);
    formData.append("picture_2", upload[1].originFileObj);

    console.log(formData.toString());

    axios.post('/listing', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWNoZW5ncmFvMyIsImF1ZCI6InZpZGVvIGRlbW8iLCJlbWFpbCI6ImxpY2hlbmdyYW9AZ21haWwuY29tIiwiaWF0IjoxNjIyNzg2NzA4LCJleHAiOjE2MjI3OTAzMDh9.5_hX4GZ1Z2YBcgwWHRpWkMrNMliJRUoCRkL0OJ7TVcs`
      }
    })
      .then(response => {
        console.log(response)
        // case1: Pubish success
        if (response.status === 200) {
          message.success('Publish succeed!');
        }
      })
      .catch(error => {
        // case2: Publish failed
        console.log('Publish failed: ', error.message);
        message.success('Publish failed!');
      })
  };


  return (
    <div>{listing.title}
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{ title: 'listing.title', price: '100', brand: 'btw' }}
        className="form-box"
      >

        <Form.Item name="category" label="CATEGORY" rules={[
          {
            required: true,
            message: 'Please select category!',
          }
        ]}>
          <Radio.Group>
            <Row>
              <Col span={7}>
                <Radio value={"Cars"} style={{ lineHeight: '32px' }}>
                  Cars
            </Radio>
              </Col>
              <Col span={10}>
                <Radio value={"Exercise Equipment"} style={{ lineHeight: '32px' }}>
                  Exercise Equipment
            </Radio>
              </Col>
              <Col span={7}>
                <Radio value={"Furniture"} style={{ lineHeight: '32px' }}>
                  Furniture
            </Radio>
              </Col>
              <Col span={7}>
                <Radio value={"Books"} style={{ lineHeight: '32px' }}>
                  Books
            </Radio>
              </Col>
              <Col span={10}>
                <Radio value={"Musical Instruments"} style={{ lineHeight: '32px' }}>
                  Musical Instruments
            </Radio>
              </Col>
              <Col span={7}>
                <Radio value={"Electronics"} style={{ lineHeight: '32px' }}>
                  Electronics
            </Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="title" label="TITLE" rules={[
          {
            required: true,
            message: 'Please input the title!',
          },
        ]}
        >
          <Input className="title-input" />

        </Form.Item>

        <Form.Item name="price" label="PRICE" rules={[
          {
            required: true,
            message: 'Please input the price!',
          },
        ]}>
          <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
            className="input-num"
          />

        </Form.Item>


        <Form.Item name="brand" label="BRAND">
          <Input onChange={onChange} className="brand-input" />
        </Form.Item>

        <Form.Item
          name="upload"
          label="ADD PHOTOS"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please upload the photos!',
            },
          ]}
        >
          <Upload name="photo" listType="picture" className="upload" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />} className="upload-btn">Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="condition"
          label="CONDITION"
          rules={[
            {
              required: true,
              message: 'Please select condition!',
            },
          ]}
        >
          <Select bordered={false} className="select-input">
            <Option value="new">New</Option>
            <Option value="used - like new">Used - Like new</Option>
            <Option value="used - good">Used - Good</Option>
            <Option value="used - fair">Used - Fair</Option>
          </Select>
        </Form.Item>



        <Form.Item name="desctiption" label="DESCRIPTION">
          <TextArea rows={4} className="textarea-input" />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" className="confirm-btn">
            UPDATE
        </Button>
        </Form.Item>
      </Form>
    </div>
  );

};

export default EditListing;
