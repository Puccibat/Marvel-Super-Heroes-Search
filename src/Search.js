import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      loading: false,
      message: ''
    };
  }

  render() {
    return (
      <div className='container'>
        <h1>Marvel Super-Heroes Search</h1>
        <label className='search-label'>
          <input
            type='text'
            value=''
            id='search-input'
            placeholder='Search heroes...'
          />
        </label>
      </div>
    );
  }
}

export default Search;
