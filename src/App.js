import React, { Component } from 'react';
import './App.css';

const list = [
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

class App extends Component {
  constructor(props) {
    super(props);
    this.key = 'time';

    this.state = { 
      list,
      [this.key]: new Date() // computed property for the example
    };

    this.onDismiss = this.onDismiss.bind(this);
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

  tick() {
    this.setState({ [this.key]: new Date() });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({ list: updatedList });
  }

  render() {
    const key = 'time';

    return (
      <div className="App">
        <h2>{this.state[key].toLocaleString()}</h2>
        {this.state.list.map(item => (
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
