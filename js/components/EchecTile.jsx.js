import React from 'react';

class EchecTile extends React.Component {
  render() {
    return <img className="image-echec" src={this.props.image} height="600"/>;
  }
}
EchecTile.propTypes = {image: React.PropTypes.string.isRequired};
export default EchecTile;
