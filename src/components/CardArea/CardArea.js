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
      favorites: [],
      isLoaded: false,
    }
  }

  changeNumber = (change) => {

    this.setState({
      min: this.state.min + change,
      max: this.state.max + change,
    });
  }

  setAllOfType = async (type, options = '') => {
    const { getData } = this.props;
    const newData = await getData(`${type}${options}`);
    const prevState = this.state[type];
    const newState = newData.results;
    await this.setState({ [type]: [...prevState, ...newState] })
    if (newData.next) {
      const index = newData.next.search(/\?/)
      const option = newData.next.substring(index);
      await this.setAllOfType(type, option)
    }
  }

  setCard = (currentElement) => {
    const { currentFilter } = this.props;

    switch (currentFilter) {
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
      default: return 'unknown error'
    }
  }

  lookUp = (noun, aProperty, predicate) => {
    return this.state[noun].find((element) => element[aProperty] === predicate)
  }

  setAllData = () => {
    let a = ['planets', 'species', 'vehicles', 'people']
      .map(noun => this.setAllOfType(noun))
    Promise.all(a).then(() => this.setState({ isLoaded: true }))
  }

  async componentDidMount() {
    this.setAllData();
  }

  render() {
    const { currentFilter, min, max, changeNumber } = this.props;

    return (
      <section className='CardArea'>
        {this.props.currentFilter &&
          <Fragment>
            {min > 0
              && <button className='previous' onClick={() => changeNumber(-10)}>{'<'}</button>}
            {max < this.state[currentFilter].length - 1 &&
              <button className='next' onClick={() => changeNumber(10)}>{'>'}</button>}
            {this.state[currentFilter].map((currentElement, i) => {
              return i > min && i <= max &&
                <Card
                  key={currentElement.name}
                  name={currentElement.name}
                  result={this.setCard(currentElement)} />
            })}
          </Fragment>
        }
        {!this.props.currentFilter && this.state.isLoaded && <div>Pick something young Jedi</div>}
        {!this.state.isLoaded && <div>Loading!</div>}
      </section>)
  }
}

export default CardArea;