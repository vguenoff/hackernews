import React from 'react';

const Search = ({ value, onChange, children }) => (
  <form>
    {/* making input a controlled component by setting value={searchTerm} */}
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>
);

export default Search;
