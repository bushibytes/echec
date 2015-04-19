import EchecDispatcher from './EchecDispatcher.js'
import $ from 'jquery'

export default {

  fetchEchecs() {
    $.get("/api/echecs", (echecs) => {
      EchecDispatcher.dispatch({
        type: 'Update Echecs',
        payload: echecs
      });
    });
  }

}

