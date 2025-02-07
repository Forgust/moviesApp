import React from 'react';
import { Alert } from 'antd';

const ErrorLoading = () => {
  return (
    <Alert message="Something went wrong, please check your connection and try again later" type="error" showIcon />
  );
};
const ErrorNetwork = () => {
  return <Alert message="Connection problems" type="error" showIcon />;
};

export { ErrorLoading, ErrorNetwork };
