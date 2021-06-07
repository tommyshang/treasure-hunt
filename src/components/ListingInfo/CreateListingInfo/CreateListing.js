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
import { checkValidToken } from 'utils';
import { useHistory } from 'react-router';

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

const CreateListing = (props) => {
  const history = useHistory();
  function onChange(value) {
    console.log('changed', value);
  }

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
      .post('/api/listing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      })
      .then((response) => {
        console.log(response);
        // case1: Pubish success
        if (response.status === 201) {
          message.success('Publish successful!');
          console.log(`Bring me to ${response.data}`);
          history.push(`/listing-detail/${response.data}`);
        }
      })
      .catch((error) => {
        // case2: Publish failed
        console.log('Publish failed: ', error.message);
        message.error('Publish failed!');
      });
  };

  return (
    <Form
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
          beforeUpload={() => false}
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
        <Button type="primary" htmlType="submit" className="confirm-btn">
          PUBLISH
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateListing;
