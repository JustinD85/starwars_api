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
      max: 0,
      error: null
    }
    this.audio = React.createRef()
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
    localStorage.setItem('favorites', JSON.stringify(favCopy))
    this.setState({ favorites: favCopy })
  }

  setCurrentFilter = (type) => {
    this.setState({
      currentFilter: type,
      min: 0,
      max: 8
    })
  }

  changeNumber = (change) => {
    this.setState({
      min: this.state.min + change,
      max: this.state.max + change,
    })
  }

  componentDidMount() {
    this.setState({ favorites: JSON.parse(localStorage.getItem('favorites')) || [] })
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
          currentFilter={currentFilter}
        />
        <CardArea
          currentFilter={currentFilter}
          getData={API.getData}
          min={min}
          max={max}
          audio={this.audio}
          favorites={[...favorites]}
          changeNumber={this.changeNumber}
          toggleFavorite={this.toggleFavorite}
        />
        <audio ref={this.audio}><source src="./beep4.mp3"></source></audio>
        <img className="background" src="./sw_background.jpg" alt="shows deathstar in background" />
      </div>
    )
  }
}

export default App
