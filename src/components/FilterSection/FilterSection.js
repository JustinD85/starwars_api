import React from 'react';
import PropTypes from 'prop-types'
import './FilterSection.scss';

const FilterSection = (props) => {
  const { setCurrentFilter, favoriteCount, currentFilter } = props
  return (
    <section className="FilterSection">
      {['people', 'vehicles', 'planets'].map((item) => {
        let isSelected = '';

        if (currentFilter === item) isSelected = 'selected'
        return <button key={item} onClick={() => setCurrentFilter(item)} className={item + ' ' + isSelected}>{item}</button>
      })}

      {['favorites'].map(() => {
        let isSelected = 'favorites';
        if (currentFilter === 'favorites') isSelected += ' selected'
        return <button key='favorites' onClick={() => setCurrentFilter('favorites')} className={isSelected}>Favorites: {favoriteCount || 'none'}</button>
      })}
    </section>
  )
}

export default FilterSection;

FilterSection.propTypes = {
  setCurrentFilter: PropTypes.func.isRequired,
  favoriteCount: PropTypes.number.isRequired,
}