import { Card, Space, Typography } from 'antd';
import { MovApiConsumer } from '../mov-api-context';
import { Component } from 'react';
import { CardGenres } from '../movie-item/movie-item';

import RatingBar from '../rating-bar/rating-bar';
import MovieRate from '../movie-rate/movie-rate';

import './mobile-item.css';

const { Title, Text } = Typography;

export default class MobileCard extends Component {
  style = {
    card: {
      height: '100%',
      width: '100%',
      padding: '10px 0',
    },
    image: {
      width: '100px',
    },
    titleText: {
      fontSize: '20px',
      margin: '0',
    },
  };
  render() {
    const { formatedDate, cuttedDescription, imageSrc, props, onRate } = this.props;
    const { title, loading, rating, rate, genresIds } = props;
    const { card, image, titleText } = this.style;
    return (
      <Card className="mobile-card" hoverable style={card}>
        <Space className="mobile-card__top-container">
          <RatingBar rating={rating}></RatingBar>
          <img style={image} className="mobile-card__img" alt="card image" src={imageSrc} />
          <Space className="mobile-card__info">
            <Title style={titleText}>{title}</Title>
            <Text>{formatedDate}</Text>
            <MovApiConsumer>
              {(genres) => {
                return (
                  <Space className="card-genres">
                    <CardGenres genres={genres} genresIds={genresIds} />
                  </Space>
                );
              }}
            </MovApiConsumer>
          </Space>
        </Space>
        <Space className="mobile-card__description">
          <Text>{cuttedDescription}</Text>
        </Space>
        <Space className="mobile-card__rate">
          <MovieRate rate={rate} onRate={onRate}></MovieRate>
        </Space>
      </Card>
    );
  }
}
