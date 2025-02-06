import { Component } from 'react';
import './rating-bar.css';

export default class RatingBar extends Component {
  round(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
  }
  rateCase(rating) {
    let res = 'rating-bar ';
    if (rating <= 3) {
      return (res += 'low');
    } else if (rating > 3 && rating <= 5) {
      return (res += 'middle');
    } else if (rating > 5 && rating <= 7) {
      return (res += 'hight');
    } else {
      return (res += 'very');
    }
  }

  render() {
    const { rating } = this.props;
    const roundRating = this.round(rating, 1);
    const currentClass = this.rateCase(rating);

    return <div className={currentClass}>{roundRating}</div>;
  }
}
