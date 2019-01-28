import React, { Component } from 'react'
import './App.scss'
import ScrollingText from '../ScrollingText/ScrollingText'
import FilterSection from '../FilterSection/FilterSection'
import CardArea from '../CardArea/CardArea'
import API from '../../api/api'
class App extends Component {
  constructor() {
    super()
    this.state = {
      film: {},
      favorites: [],
      currentFilter: null,
      min: 0,
      max: 10,
      error: null
    }
  }

  setRandomFilm = async () => {
    try {
      const unfilteredData = await API.getData('films')
      const films = unfilteredData.results
      const { length } = films
      const index = Math.floor(Math.random() * length)
      this.setState({ film: { ...films[index] } })
    } catch (error) {
      this.setState({
        error: error.message,
      })
    }
  }

  toggleFavorite = (url) => {
    let favCopy = this.state.favorites.slice()
    favCopy.includes(url) ?
      favCopy.splice(favCopy.indexOf(url), 1)
      :
      favCopy.push(url)
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
    })
  }

  componentDidMount() {
    this.setRandomFilm()
  }

  render() {
    const { film, currentFilter, min, max, favorites } = this.state
    
    return (
      <div className="App">
        <ScrollingText film={film} />
        <FilterSection
          setCurrentFilter={this.setCurrentFilter}
          favoriteCount={favorites.length}
        />
        <CardArea
          currentFilter={currentFilter}
          getData={API.getData}
          min={min}
          max={max}
          favorites={[...favorites]}
          changeNumber={this.changeNumber}
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    )
  }
}

export default App
