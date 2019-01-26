import React from 'react'

export default (props) => {
  const { name,result} = props

  return <div className="Card">
    {name}
    {result}
  </div>
}