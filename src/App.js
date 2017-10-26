import React, { Component } from 'react';
import './App.css';

import Clock from './Clock';
import Search from './Search';
import Table from './Table';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_QUERY = 'redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchStories(searchTerm);
  }

  // setSearchTopStories = result => this.setState({ result });

  fetchSearchStories = (searchTerm) => {
    // https://hn.algolia.com/api/v1/search?query=redux
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setState({ result }))
      .catch(e => console.log(e));
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);

    this.setState({ 
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  render() {
    const { searchTerm, result } = this.state; // obj destruction example

    return (
      <div className="page">
        <Clock />
        <hr/>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search:
            <span>&nbsp;</span>
          </Search>
        </div>
        {
          result &&
            <Table
              list={result.hits}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
            />
        }
      </div>
    );
  }
}

export default App;
