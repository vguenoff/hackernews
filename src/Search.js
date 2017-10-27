import React from 'react';

const Search = ({
  children,
  value,
  onChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    {/* making input a controlled component by setting value={searchTerm} */}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>
);

export default Search;
