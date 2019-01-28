import React from 'react'
import './Card.scss'

export default (props) => {
  const { name, result, toggleFavorite, id, isFav, audio } = props
  const fav = isFav ? '⭐️' : '☆'
  return (
    <div
      className="Card"
      onMouseEnter={() => audio.current.play()}>
      <div
        className="favorite-card"
        onClick={(e) => toggleFavorite(e.target.id)}
        id={id}
      > {fav}</div>
      {<h3>{name}</h3>}
      {result}
    </div>)
}