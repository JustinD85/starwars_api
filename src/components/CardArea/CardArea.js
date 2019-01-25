import React, { Fragment } from 'react';
import './CardArea.scss';
import Card from './Card/Card'
const CardArea = (props) => {
  const { currentFilter } = props;
 
  return (
    <section className='CardArea'>
      {props.currentFilter && props[currentFilter] &&
        <Fragment>
          <button className='previous'>{'<'}</button>
          <button className='next'>{'>'}</button>

          {props[currentFilter].map((j) => {
          
            return <Card key={j.name}{...j} />
          })}
        </Fragment>
      }
      {!props.currentFilter && <div>Pick something</div>}
    </section>)
}

export default CardArea;