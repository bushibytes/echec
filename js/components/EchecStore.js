import EventEmitter from 'events';
import _ from 'underscore';
import Immutable from 'immutable';
import EchecDispatcher from './EchecDispatcher.js';

class EchecStore extends EventEmitter {

  register() {
    EchecDispatcher.register( (action) => {
      if (action.type === 'Update Echecs') {
        this.echecs = Immutable.List(action.payload);
        // TODO refactor into a setter
        this.emitChange();
      }
      if (action.type === 'Vote Up') {
        let echec = this.echecs.find( (echec) => echec.id === action.payload );
        if (echec) {
          let index = this.echecs.indexOf(echec)
          echec.votes++;
          this.echecs = this.echecs.set({index: index, value: echec});
        }
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
