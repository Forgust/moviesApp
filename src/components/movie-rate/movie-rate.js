import { Rate } from 'antd';
import { Component } from 'react';
import './movie-rate.css';

export default class MovieRate extends Component {
  onRateClick = (rate) => {
    const { onRate } = this.props;
    onRate(rate);
  };
  render() {
    const { rate } = this.props;
    return <Rate count={10} defaultValue={rate} allowHalf onChange={this.onRateClick} />;
  }
}
