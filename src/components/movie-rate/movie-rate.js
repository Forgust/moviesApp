import { Rate } from 'antd';
import React, { Component } from 'react';
import './movie-rate.css';
import PropTypes from 'prop-types';

export default class MovieRate extends Component {
  static propTypes = {
    onRate: PropTypes.func,
    rate: PropTypes.number,
  };

  static defaultProps = {
    rate: 0,
  };

  onRateClick = (rate) => {
    const { onRate } = this.props;
    onRate(rate);
  };
  render() {
    const { rate } = this.props;
    return <Rate count={10} defaultValue={rate} allowHalf onChange={this.onRateClick} />;
  }
}
