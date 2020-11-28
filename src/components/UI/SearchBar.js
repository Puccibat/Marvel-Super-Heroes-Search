import React from 'react';

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      <input
        type='text'
        placeholder={`Search a Marvel's Hero`}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
