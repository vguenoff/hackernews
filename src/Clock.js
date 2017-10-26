import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.key = 'time';

    this.state = {
      [this.key]: new Date(), // example computed property
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

  tick() {
    this.setState({ [this.key]: new Date() });
  }

  render() {
    return (
      <h2>{this.state[this.key].toLocaleString()}</h2>
    );
  }
}

export default Clock;
