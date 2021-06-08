import React, { useState } from 'react';
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
  Modal,
} from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router';

import { UploadOutlined } from '@ant-design/icons';
import { TOKEN_KEY } from 'constants/constants';
import { checkValidToken } from 'utils';
import { getBase64 } from 'utils';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const { TextArea } = Input;

const CreateListing = () => {
  const history = useHistory();
  const [isCreating, setIsCreating] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onFinish = async (values) => {
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
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('item_condition', item_condition);
    formData.append('description', description);
    formData.append('price', price);
    for (var i = 0; i < upload.length; ++i) {
      var key = 'picture_' + (i + 1);
      formData.append(key, upload[i].originFileObj);
    }

    setIsCreating(true);

    try {
      const response = await axios.post('/api/listing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      console.log(response);
      if (response.status === 201) {
        message.success('Successfully created new listing!');
        console.log(`Bring me to ${response.data}`);
        history.push(`/listing-detail/${response.data}`);
      }
    } catch (err) {
      console.log('Failed to create new listing', err.message);
      message.error('Failed to create new listing');
    } finally {
      setIsCreating(false);
    }
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        className="form-box"
        scrollToFirstError
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
            className="input-num"
            formNoValidate
          />
        </Form.Item>

        <Form.Item name="brand" label="BRAND">
          <Input className="brand-input" />
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
            onPreview={handlePreview}
            accept={'image/*'}
          >
            <Button icon={<UploadOutlined />} className="upload-btn">
              Click to upload
            </Button>
          </Upload>
        </Form.Item>

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
          <Button
            loading={isCreating}
            type="primary"
            htmlType="submit"
            className="confirm-btn"
          >
            {!isCreating && 'CREATE'}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="upload" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CreateListing;
