import React, { Component } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

export default class Tab extends Component {
  static propTypes = {
    updateData: PropTypes.func,
    updateDataRated: PropTypes.func,
  };

  swapCurrentPage = (page) => {
    const { updateData, updateDataRated } = this.props;
    if (page === '1') {
      updateData();
    } else if (page === '2') {
      updateDataRated();
    }
  };
  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
      },
      {
        key: '2',
        label: 'Rated',
      },
    ];
    return <Tabs defaultActiveKey="1" items={items} onChange={this.swapCurrentPage} centered />;
  }
}
