import React, { Component } from 'react';
import './App.scss';
import ScrollingText from '../ScrollingText/ScrollingText';
import FilterSection from '../FilterSection/FilterSection';
import CardArea from '../CardArea/CardArea';
class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      people: [],
      vehicles: [],
      planets: [],
      randomFilmNumber: null,
      currentFilter: null
    }
  }

  getData = async (type, options = '') => {
    if (!this.state[type]) return;
    const response = await fetch(`https://swapi.co/api/${type}${options}`);
    const unfilteredResult = await response.json();
    const data = unfilteredResult.results;
    const currentFilter = type === 'films' ? null : type;
    await this.setState({ [type]: [...data], currentFilter });

    // if (unfilteredResult.next) {
    //   const nextUrl = unfilteredResult.next;
    //   const index = nextUrl.search(/\?/);
    //   const options = nextUrl.substring(index);
    //   console.log(type, options);
    //   this.getData(type, options);
    // }
  }


  getRandomNumber() {
    const { length } = this.state.films;
    return Math.floor(Math.random() * length);
  }

  async componentDidMount() {
    await this.getData('films')
    this.setState((oldState => {
      return { randomFilm: oldState.films[this.getRandomNumber()] }
    }))
  }

  render() {
    const { people, vehicles, planets } = this.state;
    return (
      <div className="App">
        <ScrollingText film={this.state.randomFilm} />
        <FilterSection getData={this.getData} />
        <CardArea
          currentFilter={this.state.currentFilter}
          people={people}
          vehicles={vehicles}
          planets={planets}
        />
      </div>
    );
  }
}

export default App;
