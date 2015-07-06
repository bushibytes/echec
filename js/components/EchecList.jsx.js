import React from 'react';
import EchecTile from './EchecTile.jsx';
import EchecStore from './EchecStore.js';

export default class EchecList extends React.Component {

  componentDidMount() {
    // XXX bind this, otherwise we end up being bound to echecstore in onchange
    EchecStore.addChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState({echecs: EchecStore.echecs, hasMore: true});
  }

  render() {
    return (
      <div id="echecs-list">{
        this.state.echecs
          .map(echec =>
            <EchecTile
              key={echec.id}
              imageId={echec.id}
              name={echec.name}
              image={echec.image}
              votes={echec.votes} />
          )
      }</div>
    );
  }

  componentDidUnMount() {
    EchecStore.removeChangeListener(this.onChange.bind(this));
  }

  constructor(props) {
    super(props);
    this.state = {echecs: EchecStore.echecs};
  }

}
