import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: []
    }
  }

  async getFilms() {
    const response = await fetch('https://swapi.co/api/films/');
    const films = await response.json().then(data => data.results);
    this.setState({ films });
  }

  componentDidMount() {
    this.getFilms();

  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
