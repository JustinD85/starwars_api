import React from 'react';
import PropTypes from 'prop-types'
import './FilterSection.scss';

const FilterSection = (props) => {
  const { setCurrentFilter, favoriteCount, audio } = props
  return (
    <section className="FilterSection">
      <button
        onClick={() => setCurrentFilter('people')}
        onMouseEnter={() => audio.current.play()}
        className="people">people</button>
      <button
        onClick={() => setCurrentFilter('vehicles')}
        onMouseEnter={() => audio.current.play()}
        className="vehicle"
      >vehicles</button>
      <button
        onClick={() => setCurrentFilter('planets')}
        onMouseEnter={() => audio.current.play()}
        className="planet">planets</button>
      <button
        onClick={() => setCurrentFilter('favorites')}
        onMouseEnter={() => audio.current.play()}
        className="favorite">Favorites: {favoriteCount || 'none'}</button>
    </section>
  )
}

export default FilterSection;

FilterSection.propTypes = {
  setCurrentFilter: PropTypes.func.isRequired,
  favoriteCount: PropTypes.number.isRequired,
}