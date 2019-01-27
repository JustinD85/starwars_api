import React from 'react';
import PropTypes from 'prop-types'
import './FilterSection.scss';

const FilterSection = (props) => {
  const { setCurrentFilter, favoriteCount } = props
  return (
    <section className="FilterSection">
      <button onClick={() => setCurrentFilter('people')} className="people">people</button>
      <button onClick={() => setCurrentFilter('vehicles')} className="vehicle">vehicles</button>
      <button onClick={() => setCurrentFilter('planets')} className="planet">planets</button>
      <button onClick={() => setCurrentFilter('favorites')} className="favorite">Favorites: {favoriteCount || 'none'}</button>
    </section>
  )
}

export default FilterSection;

FilterSection.propTypes = {
  setCurrentFilter: PropTypes.func.isRequired,
  favoriteCount: PropTypes.number.isRequired,
}