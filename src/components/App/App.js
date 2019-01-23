import React, { Component } from 'react';
import './App.scss';
import ScrollingText from '../ScrollingText/ScrollingText'

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: []
    }
  }

  getFilms = async () => {
    const response = await fetch('https://swapi.co/api/films/');
    const unfilteredResult = await response.json();
    const films = await unfilteredResult.results;
    this.setState({ films });
  }

  getRandomScrollText() {
    const { length } = this.state.films;
    const randomNumber = Math.floor(Math.random() * length);
    return this.state.films[randomNumber]
  }

  componentDidMount() {
    this.getFilms();

  }

  render() {
    return (
      <div className="App">
        <ScrollingText film={this.getRandomScrollText()} />
        <section className="filter-buttons">
          <button>People</button>
          <button>Vehicle</button>
          <button>Planet</button>
        </section>
        <section className="card-area">
          <div>card</div>
          <div>card</div>
          <div>card</div>
          <div>card</div>
          <div>card</div>
        </section>
      </div>
    );
  }
}

export default App;
