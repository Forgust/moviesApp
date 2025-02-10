import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import { MovApiProvider } from '../components/mov-api-context';

import MovApiService from '../services/movie-api-service';
import MoviesList from '../components/movies-list/movies-list';
import SearchPanel from '../components/search-panel/search-panel';
import PaginationSearch from '../components/pagination-search/pagination-search';
import Tab from '../components/tab/tab';

import './App.css';
/* eslint-disable */
const debounce = require('lodash.debounce');
/* eslint-enable */
export default class App extends Component {
  movApi = new MovApiService();

  state = {
    data: [],
    ratedData: [],
    isRated: false,
    loading: false,
    error: false,
    empty: true,
    text: '',
    currentPage: 'Search',
    guestId: '',
    genres: [],
    width: window.innerWidth,
    descriptionLength: this.onLengthInit(),
    isMobile: innerWidth <= 970 ? true : false,
  };

  appStyle = {
    extends: {
      components: {
        Card: {
          borderRadiusLG: '0',
          bodyPadding: '0px 20px;',
        },
        Tag: {
          borderRadiusSM: '6px',
          marginXS: '2px',
        },
        List: {
          innerWidth: 'auto',
          margin: '0',
        },
        Rate: {
          marginXS: '5px',
        },
      },
    },
  };

  onResize = debounce(() => {
    this.setState({
      width: window.innerWidth,
    });
  }, 100);
  onLengthInit() {
    const width = window.innerWidth;
    let currentLength = 200;
    if (width > 970 && width <= 1070) {
      currentLength = 100;
    } else if (width <= 970) {
      currentLength = 200;
    }
    return currentLength;
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.movApi
      .createGuestSession()
      .then((session) => {
        const guestId = session.guest_session_id;
        this.setState({
          guestId: guestId,
        });
      })
      .catch((err) => {
        console.error(err);
        this.onError(err);
      });
    this.movApi
      .getGenres()
      .then((res) => {
        this.setState({
          genres: res.genres,
        });
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { width } = this.state;
    if (prevState.width !== width) {
      if (width <= 1170 && width > 970) {
        this.setState({
          descriptionLength: 100,
          isMobile: false,
        });
      } else if (width <= 970) {
        this.setState({
          descriptionLength: 200,
          isMobile: true,
        });
      } else {
        this.setState({
          descriptionLength: 180,
          isMobile: false,
        });
      }
    }
  }

  sortData(data, ratedData) {
    if (data.length === 0 || ratedData.length === 0) {
      return;
    }
    let filteredData = data.map((searchMovie) => {
      for (let ratedMovie of ratedData) {
        if (searchMovie.id === ratedMovie.id) {
          return ratedMovie;
        } else {
          return searchMovie;
        }
      }
    });
    return filteredData;
  }

  updateData = (text = this.state.text, page = 1) => {
    this.onLoading();
    this.setState({
      currentPage: 'Search',
      isRated: false,
      error: false,
    });
    this.movApi
      .getResource(text, page)
      .then((movies) => {
        this.onDataLoad(text, movies, page);
      })
      .catch((err) => {
        this.onError(err);
      });
  };

  updateDataRated = (text = this.state.text, page = 1) => {
    const { guestId } = this.state;
    this.onLoading();
    this.setState({
      currentPage: 'Rated',
      isRated: true,
      error: false,
    });
    this.movApi
      .getRatedMovies(guestId, page)
      .then((movies) => {
        this.onDataLoad(text, movies, page);
      })
      .catch((err) => {
        this.onError(err);
      });
  };

  onDataLoad(text, movies, page) {
    const { results, total_results } = movies;
    let currentData = results;
    const ratedData = this.state.ratedData;
    const { isRated } = this.state;
    const hasRatedData = ratedData.length !== 0;
    if (!results || results.length === 0) {
      this.setState({
        loading: false,
        empty: true,
      });
      return;
    }
    if (!isRated) {
      if (hasRatedData) {
        currentData = this.sortData(results, ratedData);
      }
      this.setState({
        empty: false,
        data: currentData,
        loading: false,
        totalMovies: total_results,
        page: page,
        text: text,
      });
    } else {
      this.setState({
        empty: false,
        ratedData: currentData,
        loading: false,
        totalMovies: total_results,
        page: page,
        text: text,
      });
    }
  }

  onLoading() {
    this.setState({
      empty: false,
      loading: true,
    });
  }

  onEmpty() {
    this.setState({
      loading: false,
      empty: true,
    });
  }

  onError(err) {
    console.error(err);
    this.setState({
      empty: false,
      loading: false,
      error: true,
    });
  }

  toNextPage = (page) => {
    const { currentPage, text } = this.state;
    if (currentPage === 'Search') {
      this.updateData(text, page);
    } else if (currentPage === 'Rated') {
      this.updateDataRated(text, page);
    }
  };

  render() {
    const {
      loading,
      error,
      empty,
      totalMovies,
      page,
      currentPage,
      data,
      ratedData,
      text,
      guestId,
      isRated,
      genres,
      descriptionLength,
      width,
      isMobile,
    } = this.state;
    const currentData = isRated ? ratedData : data;
    const style = this.appStyle;
    const debounceUpdateData = debounce(this.updateData, 400);
    const isSearchPage = currentPage === 'Search';
    const searchBlock = isSearchPage ? <SearchPanel updateData={debounceUpdateData} text={text} /> : null;
    const hasData = !(loading || error || empty);
    const paginationBlock = hasData ? (
      <PaginationSearch totalMovies={totalMovies} page={page} toNextPage={this.toNextPage} />
    ) : null;

    return (
      <ConfigProvider theme={style.extends}>
        <MovApiProvider value={genres}>
          <div className="app">
            <div className="tab">
              <Tab updateData={this.updateData} updateDataRated={this.updateDataRated}></Tab>
            </div>
            <div className="search-panel">{searchBlock}</div>
            <div className="movies-list">
              <MoviesList
                data={currentData}
                loading={loading}
                error={error}
                empty={empty}
                hasData={hasData}
                currentPage={currentPage}
                guestId={guestId}
                descriptionLength={descriptionLength}
                width={width}
                isMobile={isMobile}
              />
            </div>
            <div className="pagination">{paginationBlock}</div>
          </div>
        </MovApiProvider>
      </ConfigProvider>
    );
  }
}
