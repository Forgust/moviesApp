import React, { Component } from 'react';
import { Card, Space, Typography } from 'antd';
import PropTypes from 'prop-types';

import { CardGenres } from '../movie-item/movie-item';
import { MovApiConsumer } from '../mov-api-context';

import RatingBar from '../rating-bar/rating-bar';
import MovieRate from '../movie-rate/movie-rate';

import './mobile-item.css';

const { Title, Text } = Typography;

export default class MobileCard extends Component {
  static propTypes = {
    formatedDate: PropTypes.string,
    cuttedDescription: PropTypes.string,
    imageSrc: PropTypes.string,
    props: PropTypes.object,
    onRate: PropTypes.func,
  };
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
      padding: '0 15px 0 0',
    },
  };
  render() {
    const { formatedDate, cuttedDescription, imageSrc, props, onRate } = this.props;
    const { title, rating, rate, genresIds } = props;
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
