import React from 'react';

import Button from './Button';
import './polyfills';

// higher order function
// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table = ({ list, pattern, onDismiss }) => {
  const largeColumn = { width: '40%' };
  const midColumn = { width: '30%' };
  const smallColumn = { width: '10%' };

  return (
    <div className="table">
      {list.map(item => (
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url} target="_blank">{item.title}</a>
          </span>
          <span style={midColumn} >{item.author}</span>
          <span style={smallColumn} >{item.num_comments}</span>
          <span style={smallColumn} >{item.points}</span>
          <span style={smallColumn} >
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Table;
