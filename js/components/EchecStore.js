import EventEmitter from 'events';
import _ from 'underscore';
import Immutable from 'immutable';
import EchecDispatcher from './EchecDispatcher.js';

class EchecStore extends EventEmitter {

  register() {
    EchecDispatcher.register( (action) => {
      if (action.type === 'Update Echecs') {
        this.echecs = action.payload;
        // TODO refactor into a setter
        this.emitChange();
      }
      if (action.type === 'Vote Up') {
        console.log("voted up, attempting to find right echec.");
        let echec = _.findWhere(this.echecs, {id:action.payload});
        console.log("found echec:", echec);
        if (echec)
          echec.votes++
        this.emitChange();
      }
    }
    );
  }

  getAll() {
    return this.echecs;
  }

  emitChange() {
    this.emit('Change');
  }

  addChangeListener(callback) {
    this.on('Change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('Change', callback);
  }

  constructor() {
    super();
    this.echecs = [];
    this.register();
  }


}

export default new EchecStore();
