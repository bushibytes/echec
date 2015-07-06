import React from 'react';
import EchecActionCreator from './EchecActionCreator.jsx';
import MUI from 'material-ui';
const FlatButton = MUI.FlatButton;

class EchecTile extends React.Component {

  render() {
    return (
      <div className="grid-item">
        <div className="image-echec">
          <img src={this.props.image} height="200"/>
        </div>
        <div className="image-meta">
          <FlatButton className="image-vote-button" onClick={this.clickVote.bind(this, this.props.imageId)}>Vote</FlatButton>
          <span className="image-votes">{this.props.votes} votes</span>
        </div>
      </div>
    );
  }
  clickVote(imageId) {
    EchecActionCreator.vote(imageId);
  }
  constructor(props) {
    super(props);
  }
}
EchecTile.propTypes = {image: React.PropTypes.string.isRequired, name: React.PropTypes.string.isRequired, imageId: React.PropTypes.number.isRequired};
export default EchecTile;
