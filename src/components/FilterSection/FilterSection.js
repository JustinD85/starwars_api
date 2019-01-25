import React from 'react';
import './FilterSection.scss';

const FilterSection = (props) => {
  const { getData } = props
  return (
    <section className="FilterSection">
      <button onClick={() => getData('people')} className="people">people</button>
      <button onClick={() => getData('vehicles')} className="vehicle">vehicles</button>
      <button onClick={() => getData('planets')} className="planet">planets</button>
      <button className="favorite">favorites</button>
    </section>
  )
}

export default FilterSection;