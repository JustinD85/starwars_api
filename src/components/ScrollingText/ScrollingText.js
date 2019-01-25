import React from 'react';
import './ScrollingText.scss';
import PropTypes from 'prop-types';

const ScrollingText = ({ film }) => {
  return (
    film ?
      <div className="ScrollingText">
        <h1>{film.title}</h1>
        <span>{film.release_date}</span>
        <p>{film.opening_crawl}</p>
      </div>
      :
      <div className="loading">Loading</div>
  )
}

export default ScrollingText;

ScrollingText.propTypes = {
  film: PropTypes.object
  //add prop key types
}