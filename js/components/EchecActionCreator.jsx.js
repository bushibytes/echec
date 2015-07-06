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
    $.ajax({
      type: "POST",
      url: "/api/echecs/"+imageId+"/vote",
      contentType: "application/json",
      data: {"data": "mydata"}
    });
    EchecDispatcher.dispatch({
      type: 'Vote Up',
      payload: imageId
    });
  }

};
