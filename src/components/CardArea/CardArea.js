import React, { Fragment, Component } from 'react';
import './CardArea.scss';
import Card from './Card/Card'
class CardArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 10,
      people: [],
      vehicles: [],
      planets: [],
      species: [],
      favorites: []
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
      this.setAllOfType(type, option)
    }
  }

  getCardInfo = (currentElement) => {
    const { currentFilter } = this.props;
    const cardState = {
      people: () => {
        const { name, population } = lookUp('planets', 'url', currentElement.homeworld)
        const { name: speciesName } = lookUp('species', 'url', currentElement.species[0])
        return [<div>{name}</div>, <div>{population}</div>, <div>{speciesName}</div>]
      },
      planets: () => {
        const { terrain, population, climate } = currentElement;
        return [<div>{terrain}</div>, <div>{population}</div>, <div>{climate}</div>]
      },
      vehicles: () => {
        const { model, class: _class, passengers } = currentElement;
        return [<div>{model}</div>, <div>{_class}</div>, <div>{passengers}</div>]
      },
    }
    const lookUp = (noun, aProperty, predicate) => {
      return this.state[noun].find((element) => element[aProperty] === predicate)
    }

    return cardState[currentFilter]()
  }

  setAllData = async () => {
    /*
    Economic to fetch all required data onload asynchronously.
    Alternative: each card causing at most:
     - ~3 fetch calls per page
     - ~10 cards per page
     - sluggish app
    Current max cost: ~24calls
    Alternative cost: ~240+
    */
    this.setAllOfType('planets');
    this.setAllOfType('species');
    this.setAllOfType('vehicles');
    this.setAllOfType('people');
  }

  componentDidMount() {
    this.setAllData();
  }

  render() {
    const { currentFilter } = this.props;

    return (
      <section className='CardArea'>
        {this.props.currentFilter &&
          <Fragment>
            <button className='previous' onClick={() => this.changeNumber(-10)}>{'<'}</button>
            {<button className='next' onClick={() => this.changeNumber(10)}>{'>'}</button>}

            {this.state[currentFilter].map((currentElement, i) => {
              return i > this.state.min && i < this.state.max &&
                <Card key={currentElement.name} name={currentElement.name} result={this.getCardInfo(currentElement)} />
            })}
          </Fragment>
        }
        {!this.props.currentFilter && <div>Pick something young Jedi</div>}
      </section>)
  }
}

export default CardArea;