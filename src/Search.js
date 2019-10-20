import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {}
    };
  }

  handleOnInputChange = event => {
    const query = event.target.value;
    this.setState({ query: query });
  };

  render() {
    const { query } = this.state;
    return (
      <div className='container'>
        <h1>Marvel Super-Heroes Search</h1>
        <label className='search-label'>
          <input
            type='text'
            name='query'
            value={query}
            id='search-input'
            onChange={this.handleOnInputChange}
            placeholder='Search heroes...'
          />
        </label>
      </div>
    );
  }
}

export default Search;
