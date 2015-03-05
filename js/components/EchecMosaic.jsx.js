import React from 'react'
import EchecTile from './EchecTile.jsx'

export default class EchecMosaic extends React.Component {

  constructor(props) {
    super(props);
    var echecs = [
      {id:31, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
      {id:32, name:'Justin delete', image:'http://www.echec.ca/images/32.jpg'},
      {id:15, name:'sudo rm *', image:'http://www.echec.ca/images/15.jpg'},
      {id:26, name:'so many stickies', image:'http://www.echec.ca/images/26.jpg'}
      ]
    this.state = {echecs: echecs};
  }

  render() {
    return (
      <div className='container'>{
        this.state.echecs
          .map(echec =>
            <EchecTile 
              key={echec.id}
              name={echec.name}
              image={echec.image} />
          )
      }</div>
    )
  }
}
