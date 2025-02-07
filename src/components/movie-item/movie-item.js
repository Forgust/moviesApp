import React, { Component } from 'react';
import { Typography, Card, Tag, Space, Image } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { MovApiConsumer } from '../mov-api-context';

import MovApiService from '../../services/movie-api-service';
import MovieRate from '../movie-rate/movie-rate';
import RatingBar from '../rating-bar/rating-bar';
import MobileCard from '../mobile-item/mobile-item';

import './movie-item.css';

import noPoster from './generic-movie-poster.jpg';

const { Title, Text } = Typography;

export default class MovieItem extends Component {
  static propTypes = {
    descriptionLength: PropTypes.number,
    id: PropTypes.number,
    guestId: PropTypes.string,
    isMobile: PropTypes.bool,
    description: PropTypes.string,
    date: PropTypes.string,
    imagePath: PropTypes.string,
    style: PropTypes.object,
  };

  movApi = new MovApiService();

  state = {
    noPoster: noPoster,
  };

  cardStyle = {
    main: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      padding: '0',
      margin: '0',
    },
    image: {
      width: '183px',
      height: '281px',
    },
    title: {
      margin: '0',
      fontSize: '20px',
      padding: '0 40px 0 0',
    },
    date: {
      fontSize: '14px',
      opacity: '0.5',
      letterSpacing: '0.04em',
    },
    body: {},
    genre: {
      opacity: '0.8',
    },
    description: {
      ellipsis: {
        width: '180px',
      },
    },
  };

  cutDescription(text, descriptionLength = this.props.descriptionLength) {
    const cuttedText = text.split('');

    if (text.length >= descriptionLength) {
      if (cuttedText[descriptionLength] !== ' ') {
        return this.cutDescription(text, descriptionLength + 1);
      }
      const currentText = `${cuttedText.slice(0, descriptionLength).join('')}...`;
      return currentText;
    }
    return text;
  }

  formatDate(date) {
    try {
      const clearDate = date.split('-').join(' ');
      const parsDate = Date.parse(clearDate);
      const currentDate = new Date(parsDate);

      return format(currentDate, 'MMMM d, y');
    } catch (err) {
      return err.name;
    }
  }

  updatePathImage(path) {
    const currentPath = this.movApi.getImage(path);
    return path ? currentPath : this.state.noPoster;
  }

  onRate = (rate) => {
    this.setState({
      rate: rate,
    });
    const { id, guestId } = this.props;
    this.movApi.postRateMovie(guestId, id, rate);
  };

  render() {
    const { isMobile, description, date, imagePath, ...props } = this.props;
    const formatedDate = this.formatDate(date);
    const style = this.cardStyle;
    const cuttedDescription = this.cutDescription(description);
    const imageSrc = this.updatePathImage(imagePath);
    const currentCard = isMobile ? (
      <MobileCard
        style={style}
        formatedDate={formatedDate}
        cuttedDescription={cuttedDescription}
        imageSrc={imageSrc}
        props={props}
        onRate={this.onRate}
      ></MobileCard>
    ) : (
      <DesktopCard
        style={style}
        formatedDate={formatedDate}
        cuttedDescription={cuttedDescription}
        imageSrc={imageSrc}
        props={props}
        onRate={this.onRate}
      ></DesktopCard>
    );
    return <>{currentCard}</>;
  }
}

const DesktopCard = ({ style, formatedDate, cuttedDescription, imageSrc, props, onRate }) => {
  const { title, rating, rate, genresIds } = props;
  return (
    <Card hoverable style={style.main} cover={<CardImage src={imageSrc} style={style.image} />}>
      <Space className="card-body">
        <RatingBar rating={rating}></RatingBar>
        <Title style={style.title}>{title}</Title>
        <Text level={5} style={style.date} strong>
          {formatedDate}
        </Text>

        <MovApiConsumer>
          {(genres) => {
            return (
              <Space className="card-genres">
                <CardGenres genres={genres} genresIds={genresIds} />
              </Space>
            );
          }}
        </MovApiConsumer>

        <Text style={style.description}>{cuttedDescription}</Text>
        <Space className="card-rate">
          <MovieRate onRate={onRate} rate={rate}></MovieRate>
        </Space>
      </Space>
    </Card>
  );
};
DesktopCard.propTypes = {
  style: PropTypes.object,
  formatedDate: PropTypes.string,
  cuttedDescription: PropTypes.string,
  imageSrc: PropTypes.string,
  props: PropTypes.object,
  onRate: PropTypes.func,
  title: PropTypes.string,
  rating: PropTypes.number,
  rate: PropTypes.number,
  genresIds: PropTypes.array,
};

const CardGenres = ({ genres, genresIds }) => {
  let currentGenres = genres.filter((item) => {
    for (let id of genresIds) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  });
  if (currentGenres.length > 3) {
    currentGenres = currentGenres.slice(0, 3);
  }
  return currentGenres.map((genre) => {
    return (
      <Tag key={genre.id} color="default">
        {genre.name}
      </Tag>
    );
  });
};

const CardImage = ({ src, style }) => {
  return <Image preview={false} src={src} alt="movie image" style={style} />;
};
CardImage.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
};

export { CardGenres };
