import React, { Component } from 'react';
import './App.scss';
import ScrollingText from '../ScrollingText/ScrollingText';
import FilterSection from '../FilterSection/FilterSection';
import CardArea from '../CardArea/CardArea';
class App extends Component {
  constructor() {
    super();
    this.state = {
      film: {},
      favorites: 0,
      currentFilter: null,
      min: 0,
      max: 10,
    }
  }

  getData = async (type, options = '') => {
    const response = await fetch(`https://swapi.co/api/${type}${options}`);
    return await response.json();
  }

  setRandomFilm = async () => {
    const unfilteredData = await this.getData('films');
    const films = unfilteredData.results;
    const { length } = films;
    const index = Math.floor(Math.random() * length);;
    this.setState({ film: { ...films[index] } });
  }

  toggleFavorite = (url) => {
    const { favorites } = this.state;
    let favCopy = favorites.slice();
    if (favCopy.includes(url)) {
      favCopy.splice(favCopy.indexOf(url), 1);
    } else {
      favCopy.push(url)
    }
    this.setState({ favorites: favCopy })
  }

  setCurrentFilter = (type) => {
    this.setState({
      currentFilter: type,
      min: 0,
      max: 10
    })
  }

  changeNumber = (change) => {
    this.setState({
      min: this.state.min + change,
      max: this.state.max + change,
    });
  }

  componentDidMount() {
    this.setRandomFilm();
  }

  render() {

    return (
      <div className="App">
        <ScrollingText film={this.state.film} />
        <FilterSection
          setCurrentFilter={this.setCurrentFilter}
          favoriteCount={this.state.favorites.length}
        />
        <CardArea
          currentFilter={this.state.currentFilter}
          getData={this.getData}
          min={this.state.min}
          max={this.state.max}
          favorites={[...this.state.favorites]}
          changeNumber={this.changeNumber}
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    );
  }
}

export default App;
