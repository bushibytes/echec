import React from 'react'
import EchecTile from './EchecTile.jsx'
import EchecStore from './EchecStore.js'
import InfiniteScrollConstructor from 'react-infinite-scroll'

var InfiniteScroll = InfiniteScrollConstructor(React);

export default class EchecList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {echecs: EchecStore.echecs, hasMore: true};
  }

  onChange() {
    this.setState({echecs: EchecStore.echecs, hasMore: true})
  }

  componentDidMount() {
    //XXX bind this, otherwise we end up being bound to echecstore in onchange
    EchecStore.addChangeListener(this.onChange.bind(this));
  }

  componentDidUnMount() {
    EchecStore.removeChangeListener(this.onChange.bind(this));
  }

  getMoreEchecs(page) {
    setTimeout( ()=> {
      var moreEchecs = [
        {id:33, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
        {id:34, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
        {id:35, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
        {id:36, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
        {id:37, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
      ];
      this.setState({
        hasMore: false,
        echecs: this.state.echecs.concat(moreEchecs)
      });
    }, 2000);
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getMoreEchecs.bind(this)}
        hasMore={this.state.hasMore}
        loader={<div className="loader">Loading ...</div>}>
        <div className='container'>{
          this.state.echecs
            .map(echec =>
              <EchecTile 
                key={echec.id}
                name={echec.name}
                image={echec.image} />
            )
        }</div>
      </InfiniteScroll>
    )
  }
}
