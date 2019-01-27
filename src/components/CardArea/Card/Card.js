import React from 'react'

export default (props) => {
  const { name, result, toggleFavorite, id } = props

  return <div className="Card" >
    <div
      className="favorite-card"
      onClick={(e) => toggleFavorite(e.target.id)}
      id={id}
    >Favorite</div>
    {name}
    {result}
  </div>
}