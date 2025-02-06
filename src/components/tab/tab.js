import { Component } from 'react';
import { Tabs } from 'antd';

export default class Tab extends Component {
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
