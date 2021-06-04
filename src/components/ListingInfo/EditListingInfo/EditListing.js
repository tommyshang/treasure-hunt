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

const EditListing = ({id}) => {
  const [listing, setListing] = useState({});
 

  function onChange(value) {
    console.log('changed', value);
  }

  useEffect(() => {
   console.log("fetching data");
   axios.get('/listing', {params: {
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
  };

  return (
    <Form
      name="validate_other"
      initialValues	= {listing}
      {...formItemLayout}
      onFinish={onFinish}
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
        ]}>
        <Input  className="title-input"/>
      </Form.Item>

      <Form.Item  name="price" label="PRICE"  rules={[
          {
            required: true,
            message: 'Please input the price!',
          },
        ]}>
        <InputNumber 
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
            value={listing.price}
            className="input-num"
        />

      </Form.Item>
      

      <Form.Item  label="BRAND">
        <Input value={listing.brand} onChange={onChange} className="brand-input"/>
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
        <Upload name="photo"  listType="picture" className= "upload" beforeUpload={() => false}>
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
      <TextArea rows={4} className="textarea-input"/>
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit" className="confirm-btn">
          UPDATE
        </Button>
      </Form.Item>
    </Form>
  );

};

export default EditListing;
