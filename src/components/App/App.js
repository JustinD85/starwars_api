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
      species: [],
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



  getCardAreaData = async (type) => {
    const data = await this.getData(type)
    this.setState({
      [type]: { ...data },
      currentFilter: type
    })
  }

  setAllOfType = async (type, options = '') => {
    const newData = await this.getData(`${type}${options}`);
    const prevState = this.state[type];
    const newState = newData.results;
    await this.setState({ [type]: [...newState, ...prevState ] })
    if (newData.next) {
      const index = newData.next.search(/\?/)
      const option = newData.next.substring(index);
      this.setAllOfType(type, option)
    }
  }

  setAllData = async () => {
    const shouldSetSpecies = !this.state.species.length;
    const shouldSetPlanets = !this.state.planets.length;
    const shouldSetVehicles = !this.state.vehicles.length;
    const shouldSetPeople = !this.state.people.length;
    shouldSetSpecies && this.setAllOfType('species');//4 fetches instead of 10 per page
    shouldSetPlanets && this.setAllOfType('planets');
    shouldSetVehicles && this.setAllOfType('vehicles');
    shouldSetPeople && this.setAllOfType('people');
  }

  setCurrentFilter = (type) => {
    this.setState({
      currentFilter: type
    })
  }

  getNewPageData = async () => {
    const { currentFilter: type } = this.state;
    const data = await this.getData(type)
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
    this.setAllData();
  }

  render() {
    const { people, vehicles, planets } = this.state;

    return (
      <div className="App">
        <ScrollingText film={this.state.film} />
        <FilterSection getData={this.setAllData} />
        <CardArea
          currentFilter={this.state.currentFilter}
          people={people.list}
          vehicles={vehicles.list}
          planets={planets.list}
        />
      </div>
    );
  }
}

export default App;
