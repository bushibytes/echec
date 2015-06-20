import EchecDispatcher from './EchecDispatcher.js';
import $ from 'jquery';

export default {

  fetchEchecs() {
    $.get('/api/echecs', (echecs) => {
      EchecDispatcher.dispatch({
        type: 'Update Echecs',
        payload: echecs
      });
    });
  },

  vote(imageId) {
    console.log(`Voted! for ${imageId}`);
    EchecDispatcher.dispatch({
      type: 'Vote Up',
      payload: imageId
    });
  }

};
