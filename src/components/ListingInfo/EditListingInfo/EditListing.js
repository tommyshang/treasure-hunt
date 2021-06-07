import React, { useEffect } from 'react';
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

import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { TOKEN_KEY } from 'constants/constants';
import { useHistory, useParams } from 'react-router';
import { checkValidToken } from 'utils';
import { PICTURE_URL_PREFIX } from 'constants/constants';

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

const EditListing = ({ formData }) => {
  const history = useHistory();
  const { listing_id } = useParams();
  const [form] = Form.useForm();

  function onChange(value) {
    console.log('changed', value);
  }

  // prefill the form with the data fetched from api
  useEffect(() => {
    form.setFieldsValue(formData);
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const {
      category,
      title,
      price,
      brand,
      upload,
      item_condition,
      description,
    } = values;

    const formData = new FormData();
    formData.append('seller_user_id', checkValidToken());
    formData.append('title', title);
    formData.append('listing_id', listing_id);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('item_condition', item_condition);
    formData.append('description', description);
    formData.append('price', price);
    for (var i = 0; i < upload.length; ++i) {
      var key = 'picture_' + (i + 1);
      formData.append(key, upload[i].originFileObj);
    }

    console.log(formData.toString());

    axios
      .put('/api/listing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      })
      .then((response) => {
        console.log(response);
        // case1: Pubish success
        if (response.status === 200) {
          message.success('Update successful!');
          history.push(`/listing-detail/${listing_id}`);
        }
      })
      .catch((error) => {
        // case2: Publish failed
        console.log('Update failed: ', error.message);
        message.error('Update failed!');
      });
  };

  return (
    <div>
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        className="form-box"
      >
        <Form.Item
          name="category"
          label="CATEGORY"
          rules={[
            {
              required: true,
              message: 'Please select category!',
            },
          ]}
        >
          <Radio.Group>
            <Row>
              <Col span={7}>
                <Radio value={'Cars'} style={{ lineHeight: '32px' }}>
                  Cars
                </Radio>
              </Col>
              <Col span={10}>
                <Radio
                  value={'Exercise Equipments'}
                  style={{ lineHeight: '32px' }}
                >
                  Exercise Equipments
                </Radio>
              </Col>
              <Col span={7}>
                <Radio value={'Furniture'} style={{ lineHeight: '32px' }}>
                  Furniture
                </Radio>
              </Col>
              <Col span={7}>
                <Radio value={'Books'} style={{ lineHeight: '32px' }}>
                  Books
                </Radio>
              </Col>
              <Col span={10}>
                <Radio value={'Apparels'} style={{ lineHeight: '32px' }}>
                  Apparels
                </Radio>
              </Col>
              <Col span={7}>
                <Radio value={'Electronics'} style={{ lineHeight: '32px' }}>
                  Electronics
                </Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="title"
          label="TITLE"
          rules={[
            {
              required: true,
              message: 'Please input the title!',
            },
          ]}
        >
          <Input className="title-input" />
        </Form.Item>

        <Form.Item
          name="price"
          label="PRICE"
          rules={[
            {
              required: true,
              message: 'Please input the price!',
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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
          <Upload
            name="photo"
            listType="picture"
            className="upload"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} className="upload-btn">
              Click to upload
            </Button>
          </Upload>
        </Form.Item>

        <div>
          {Object.values(formData.picture_urls).map((picture_url) => (
            <img
              style={{ height: '100px', margin: '5px' }}
              src={`${PICTURE_URL_PREFIX}${picture_url}`}
              alt="listing_picture"
            />
          ))}
        </div>

        <Form.Item
          name="item_condition"
          label="CONDITION"
          rules={[
            {
              required: true,
              message: 'Please select condition!',
            },
          ]}
        >
          <Select bordered={false} className="select-input">
            <Option value="New">New</Option>
            <Option value="Used - Like new">Used - Like new</Option>
            <Option value="Used - Good">Used - Good</Option>
            <Option value="Used - Fair">Used - Fair</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="DESCRIPTION">
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
