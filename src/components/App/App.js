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
      people: [],
      vehicles: [],
      planets: [],
      currentFilter: null
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



  getCardAreaData = async (type) => {
    // const hasBeenCalledBefore = this.state.people.length;
    // if (hasBeenCalledBefore) return
    const unfilteredData = await this.getData(type)
    console.log(unfilteredData)
  }

  getNewPageData = (type) => {
    // if (unfilteredResult.next) {
    //   const nextUrl = unfilteredResult.next;
    //   const index = nextUrl.search(/\?/);
    //   const options = nextUrl.substring(index);
    //   console.log(type, options);
    //   this.getData(type, options);
    // }
  }




  componentDidMount() {
    this.setRandomFilm()
  }

  render() {
    const { people, vehicles, planets } = this.state;
    return (
      <div className="App">
        <ScrollingText film={this.state.film} />
        <FilterSection getData={this.getCardAreaData} />
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
