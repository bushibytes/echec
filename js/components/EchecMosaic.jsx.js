import React from 'react'
import EchecTile from './EchecTile.jsx'

export default class EchecMosaic extends React.Component {

  render() {
    return (
      <div className='container'>{
        this.props.data.echecs
          .toList()
          .map(echec =>
            <EchecTile 
              key={echec.get('id')}
              name={echec.get('name')}
              image={echec.get('image')} />
          )
      }</div>
    )
  }
}
