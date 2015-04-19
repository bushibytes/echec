import EchecDispatcher from './EchecDispatcher.js'

export default {

  fetchEchecs() {
    let echecs = [
      {id:31, name:'Beer fail', image:'http://www.echec.ca/images/31.jpg'},
      {id:32, name:'Justin delete', image:'http://www.echec.ca/images/32.jpg'},
      {id:15, name:'sudo rm *', image:'http://www.echec.ca/images/15.jpg'},
      {id:26, name:'so many stickies', image:'http://www.echec.ca/images/26.jpg'}
    ]
    EchecDispatcher.dispatch({
      type: 'Update Echecs',
      payload: echecs
    });
  }

}

