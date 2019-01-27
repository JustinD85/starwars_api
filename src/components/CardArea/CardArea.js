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

  setCard = (currentElement, type) => {
    if (!type) type = this.props.currentFilter;

    switch (type) {
      case 'people': {
        const { name, population } = this.lookUp('planets', 'url', currentElement.homeworld)
        let speciesName;
        if (currentElement.species.length) {
          speciesName = this.lookUp('species', 'url', currentElement.species[0]).name
        } else {
          speciesName = 'unknown'
        }
        return [<div>{name}</div>, <div>{population}</div>, <div>{speciesName}</div>]
      }
      case 'planets': {
        const { terrain, population, climate } = currentElement;
        return [<div>{terrain}</div>, <div>{population}</div>, <div>{climate}</div>]
      }
      case 'vehicles': {
        const { model, vehicle_class, passengers } = currentElement;
        return [<div>{model}</div>, <div>{vehicle_class}</div>, <div>{passengers}</div>]
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

  getCard(currentElement) {
    return (
      <Card
        key={currentElement.name}
        name={currentElement.name}
        toggleFavorite={this.props.toggleFavorite}
        id={currentElement.url}
        result={this.setCard(currentElement)}
      />)
  }

  getFavorites = () => {
    return ['people', 'vehicles', 'planets']
      .map((items) => [...this.state[items]])
      .flat()
      .filter(element => element.isFavorite)
  }

  getCardsOfType = (filter, min, max) => {
    return this.state[filter].map((ele, i) => {
      return i >= min && i <= max && this.getCard(ele)
    })
  }


  render() {
    const { currentFilter, min, max, changeNumber } = this.props;
    const stateOrProp = currentFilter === 'favorites' ? 'props' : 'state';
    return (
      <section className='CardArea'>
        {this.props.currentFilter &&
          <Fragment>
            {min > 0 &&
              <button className='previous' onClick={() => changeNumber(-10)}>{'<'}</button>}
            {this.getCardsOfType(currentFilter, min, max)}
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