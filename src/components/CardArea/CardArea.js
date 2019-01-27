import React, { Fragment, Component } from 'react';
import './CardArea.scss';
import Card from './Card/Card'
class CardArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      vehicles: [],
      planets: [],
      species: [],
      isLoaded: false,
    }
  }

  setAllOfType = async (type, options = '') => {
    const { getData, favorites } = this.props;
    const newData = await getData(`${type}${options}`);
    const prevState = this.state[type];
    const newState = newData.results.map(item => {
      item.isFavorite = favorites.includes(item.url) ? true : false;
      item.type = type
      return item
    });

    await this.setState({ [type]: [...prevState, ...newState] })
    if (newData.next) {
      const index = newData.next.search(/\?/)
      const option = newData.next.substring(index);
      await this.setAllOfType(type, option)
    }
  }

  setCard = (currentElement) => {
    switch (currentElement.type) {
      case 'people': {
        const { name, population } = this.lookUp('planets', 'url', currentElement.homeworld)
        let speciesName;
        if (currentElement.species.length) {
          speciesName = this.lookUp('species', 'url', currentElement.species[0]).name
        } else {
          speciesName = 'unknown'
        }
        return [<div>Planet: {name}</div>, <div>Pop: {population}</div>, <div>Species: {speciesName}</div>]
      }
      case 'planets': {
        const { terrain, population, climate } = currentElement;
        return [<div>Terrain: {terrain}</div>, <div>Pop: {population}</div>, <div>Climate: {climate}</div>]
      }
      case 'vehicles': {
        const { model, vehicle_class, passengers } = currentElement;
        return [<div>Model: {model}</div>, <div>Class: {vehicle_class}</div>, <div>Fits: {passengers}</div>]
      }
      case 'favorites': {
        return 'this.setCard(currentElement, currentElement.type)'
      }
      default: throw new Error('Unknown type selected')
    }
  }

  lookUp = (noun, aProperty, predicate) => {
    return this.state[noun].find((element) => element[aProperty] === predicate)
  }

  setAllData = () => {
    let areResolved = ['planets', 'species', 'vehicles', 'people']
      .map(noun => this.setAllOfType(noun))
    Promise.all(areResolved).then(() => this.setState({ isLoaded: true }))
  }

  async componentDidMount() {
    this.setAllData();
  }

  updateFavorites = (url) => {
    this.props.toggleFavorite(url);
    const key = url.split('/')[0]
    const newState = this.state[key].slice()
      .map(item => {
        if (item.url.includes(url)) {
          console.log(item.url,url)
          item.isFavorite = !item.isFavorite
        }
        return item
      })
    this.setState({
      [key]: newState
    })
  }

  getCard(currentElement) {
    const regex = /\w+\/\d+\//
    const id = regex.exec(currentElement.url)
    return (
      <Card
        key={currentElement.name}
        name={currentElement.name}
        toggleFavorite={this.updateFavorites}
        id={id}
        result={this.setCard(currentElement)}
      />)
  }

  flattenItems = () => {
    return ['people', 'vehicles', 'planets']
      .map((items) => [...this.state[items]])
      .flat()
  }

  getFavorites = (min, max) => {
    return this.flattenItems()
      .filter(element => element.isFavorite)
      .map((fav, i) => i >= min && i <= max && this.getCard(fav))
  }

  getCardsOfType = (filter, min, max) => {
    return this.state[filter].map((ele, i) => {
      return i >= min && i <= max && this.getCard(ele)
    })
  }


  render() {
    const { currentFilter, min, max, changeNumber } = this.props;
    const stateOrProp = currentFilter === 'favorites' ? 'props' : 'state';
    const shouldShowFavs = currentFilter !== 'favorites'
    return (
      <section className='CardArea'>
        {this.props.currentFilter &&
          <Fragment>
            {min > 0 &&
              <button className='previous' onClick={() => changeNumber(-10)}>{'<'}</button>}
            {shouldShowFavs ?
              this.getCardsOfType(currentFilter, min, max)
              :
              this.getFavorites(min, max)}
            {max < this[stateOrProp][currentFilter].length - 1 &&
              <button className='next' onClick={() => changeNumber(10)}>{'>'}</button>}
          </Fragment>
        }
        {!this.props.currentFilter && this.state.isLoaded && <div>Pick something young Jedi</div>}
        {!this.state.isLoaded && <div>Loading!</div>}
      </section>)
  }
}

export default CardArea;