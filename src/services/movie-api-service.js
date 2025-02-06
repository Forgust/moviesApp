export default class MovApiService {
  _apiBase = 'https://api.themoviedb.org/3';
  _apiImageBase = 'https://image.tmdb.org/t/p/w500';
  _authorizationKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmU4MTVhMWQ5ZGYwODEzMDIyOGZlMWVkNGU1NGE3MiIsIm5iZiI6MTczNjgwMDUzMS4wOTIsInN1YiI6IjY3ODU3OTEzZmUyOTRhMGI0NzRlNTJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.InMNuftx31_iSVzPn8472NeI5mmmYDQEaSMc9heBVSA';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this._authorizationKey}`,
    },
  };
  async createGuestSession() {
    const url = '/authentication/guest_session/new';
    const res = await fetch(`${this._apiBase}${url}`, this.options);
    if (!res.ok) {
      throw new Error(`fetch error, response ${url}`);
    }
    const jsonRes = await res.json();
    return jsonRes;
  }

  async getResource(searchText, page = 1) {
    const movieSearchUrl = `/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`;
    const res = await fetch(`${this._apiBase}${movieSearchUrl}`, this.options);

    if (!res.ok) {
      throw new Error(`fetch error, response ${movieSearchUrl}`);
    }

    const jsonRes = await res.json();
    return jsonRes;
  }

  getImage(imagePath) {
    const res = `${this._apiImageBase}${imagePath}`;
    return res;
  }

  async getGenres() {
    const genresUrl = '/genre/movie/list?language=en';
    const res = await fetch(`${this._apiBase}${genresUrl}`, this.options);

    if (!res.ok) {
      throw new Error(`fetch error, response ${genresUrl}`);
    }

    const jsonRes = await res.json();
    return jsonRes;
  }

  async getRatedMovies(guestId, page = 1) {
    const url = `/guest_session/${guestId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`;
    const res = await fetch(`${this._apiBase}${url}`, this.options);

    const jsonRes = await res.json();
    return jsonRes;
  }
  async postRateMovie(guestId, movieId, rate) {
    fetch(`${this._apiBase}/movie/${movieId}/rating?guest_session_id=${guestId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this._authorizationKey}`,
      },
      body: `{"value":${rate}}`,
    })
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));
  }
}
