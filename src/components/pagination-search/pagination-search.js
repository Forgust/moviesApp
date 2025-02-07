import React, { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

class PaginationSearch extends Component {
  static propTypes = {
    totalMovies: PropTypes.number,
    page: PropTypes.number,
    toNextPage: PropTypes.func,
  };
  render() {
    const { totalMovies, page, toNextPage } = this.props;
    return <Pagination align="end" defaultCurrent={1} total={totalMovies} current={page} onChange={toNextPage} />;
  }
}

export default PaginationSearch;
