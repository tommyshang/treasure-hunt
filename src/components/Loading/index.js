import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading = ({ customStyle }) => {
  return <Spin style={customStyle} indicator={antIcon} />;
};

export default Loading;
