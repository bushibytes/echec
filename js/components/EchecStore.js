import EventEmitter from 'events'
import EchecDispatcher from './EchecDispatcher.js'

class EchecStore extends EventEmitter {

  constructor() {
    super()
    this.echecs = []
    this.register()
  }

  register(){
    EchecDispatcher.register( (action) => {
      if(action.type === 'Update Echecs') {
        this.echecs = action.payload;
        //TODO refactor into a setter
        this.emitChange();
      }
    }
    );
  }

  emitChange() {
    this.emit('Change')
  }

  addChangeListener(callback) {
    this.on('Change', callback)
  }

  removeChangeListener(callback) {
    this.removeListener('Change', callback)
  }

}

export default new EchecStore()
