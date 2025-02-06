import React, { Component } from 'react';
import Loader from '../loader/loader';
import { ErrorLoading } from '../error/error';
import { Empty } from 'antd';

import './movies-list.css';
import MovieItem from '../movie-item/movie-item';

export default class MoviesList extends Component {
  render() {
    const { data, loading, error, empty, hasData, guestId, descriptionLength, width, isMobile } = this.props;
    const emptyBlock = empty ? <Empty /> : null;
    const errorBlock = error ? <ErrorLoading /> : null;
    const loadBlock = loading ? <Loader /> : null;
    const content = hasData ? (
      <CardView data={data} guestId={guestId} descriptionLength={descriptionLength} width={width} isMobile={isMobile} />
    ) : null;
    return (
      <>
        {emptyBlock}
        {errorBlock}
        {loadBlock}
        {content}
      </>
    );
  }
}

const CardView = ({ data, guestId, descriptionLength, width, isMobile }) => {
  const cards = data.map((movie) => {
    const id = movie.id;

    return (
      <MovieItem
        key={id}
        id={id}
        title={movie.title}
        description={movie.overview}
        genresIds={movie.genre_ids}
        date={movie.release_date}
        imagePath={movie.poster_path}
        guestId={guestId}
        rating={movie.vote_average}
        rate={movie.rating ? movie.rating : '0'}
        descriptionLength={descriptionLength}
        width={width}
        isMobile={isMobile}
      />
    );
  });

  return <div className="card-list">{cards}</div>;
};
