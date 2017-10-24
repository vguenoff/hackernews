import React, { Component } from 'react';
import './App.css';

const externalList = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// higher order function
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.key = 'time';

    this.state = {
      list: externalList,
      [this.key]: new Date(), // computed property for the example
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({ list: updatedList });
  }

  tick() {
    this.setState({ [this.key]: new Date() });
  }

  render() {
    const { list, searchTerm } = this.state; // obj destruction example

    return (
      <div className="App">
        <h2>{this.state[this.key].toLocaleString()}</h2>
        <form>
          {/* making input a controlled component by setting value={searchTerm}  */}
          <input
            type="text"
            value={searchTerm}
            onChange={this.onSearchChange}
          />
        </form>
        <hr/>
        {list.filter(isSearched(searchTerm)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url} target="_blank">{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
              >
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
