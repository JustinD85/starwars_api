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
      favorites:[],
      currentFilter: null,
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

  setCurrentFilter = (type) => {
    this.setState({
      currentFilter: type
    })
  }

  componentDidMount() {
    this.setRandomFilm();
  }

  render() {

    return (
      <div className="App">
        <ScrollingText film={this.state.film} />
        <FilterSection getData={this.setCurrentFilter} />
        <CardArea
          currentFilter={this.state.currentFilter}
          getData={this.getData}
        />
      </div>
    );
  }
}

export default App;
