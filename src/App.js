import React, { Component } from 'react';
import './App.css';

import Clock from './Clock';
import Search from './Search';
import Table from './Table';
import Button from './Button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: {
        searchTerm: DEFAULT_QUERY,
      },
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    // this.setState({ searchKey: searchTerm });
    this.fetchSearchStories(searchTerm);
  }

  fetchSearchStories = (searchTerm, page = 0) => {
    // https://hn.algolia.com/api/v1/search?query=redux&page=1
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  needsToSearchTopStories = searchTerm => !this.state.results[searchTerm];

  onSearchSubmit = (e) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchStories(searchTerm);
    }
    e.preventDefault();
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }


  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <Clock />
        <hr/>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {
          error ?
            <div className="interactions">
              <p>Something went wrong!</p>
            </div>
          :
            <Table
              list={list}
              onDismiss={this.onDismiss}
            />
        }

        <div className="interactions">
          <Button onClick={() => this.fetchSearchStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
