import React from 'react';
import './FilterSection.scss';

const FilterSection = (props) => {
  const { setCurrentFilter, favoriteCount } = props
  return (
    <section className="FilterSection">
      <button onClick={() => setCurrentFilter('people')} className="people">people</button>
      <button onClick={() => setCurrentFilter('vehicles')} className="vehicle">vehicles</button>
      <button onClick={() => setCurrentFilter('planets')} className="planet">planets</button>
      <button className="favorite">Favorites: {favoriteCount}</button>
    </section>
  )
}

export default FilterSection;