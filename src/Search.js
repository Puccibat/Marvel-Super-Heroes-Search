import React from 'react';
import axios from 'axios';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      loading: false,
      message: ''
    };
    this.cancel = '';
  }

  fetchSearchResults = query => {
    const APIurl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=dbe0038f839406bd1e69416a03e2d67a&hash=fb974711d8b7728c370ddfe09b191981`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(APIurl, {
        cancelToken: this.cancel.token
      })
      .then(res => {
        const resultNotFoundMessage = !res.data.results.length
          ? 'There are no more search results'
          : '';
        this.setState({
          results: res.data.results,
          message: resultNotFoundMessage,
          loading: false
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: 'Failed to fetch results'
          });
        }
      });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    this.setState({ query: query });

    if (!query) {
      this.setState({ query, results: {}, message: '' });
    } else {
      this.setState({ query, loading: true, message: '' }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div>
          {results.map(result => {
            return <h6>{result.data.results.name}</h6>;
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div className='container'>
        <h1 className='title'>MARVEL SUPER-HEROES SEARCH</h1>
        <label className='search-label'>
          <input
            type='text'
            value={query}
            id='search-input'
            onChange={this.handleOnInputChange}
            placeholder='SEARCH HEROES...'
          />
        </label>
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
