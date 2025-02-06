import { Component } from 'react';
import { Pagination } from 'antd';

class PaginationSearch extends Component {
  render() {
    const { totalMovies, page, toNextPage } = this.props;
    return <Pagination align="end" defaultCurrent={1} total={totalMovies} current={page} onChange={toNextPage} />;
  }
}

export default PaginationSearch;
