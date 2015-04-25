jest.dontMock('../js/components/EchecStore');
//jest.dontMock('object-assign');

describe('EchecStore', function() {
  var EchecDispatcher;
  var EchecStore;
  var callback;

  var EchecUpdateAction = {type: 'Update Echecs', payload: ['An echec']};

  beforeEach(function() {
    EchecDispatcher = require('../js/components/EchecDispatcher');
    EchecStore = require('../js/components/EchecStore');
    callback = EchecDispatcher.register.mock.calls[0][0];
  });


  it('registers a callback with the dispatcher', function() {
    expect(EchecDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no echecs', function() {
    expect(EchecStore.getAll()).toEqual([]);
  });

  it('updates the list of echecs', function() {
    var expectedEchecs = ['an echec', 'another'];
    EchecUpdateAction.payload = expectedEchecs;
    callback(EchecUpdateAction);
    expect(EchecStore.getAll().length).toBe(2);
    expect(EchecStore.getAll()[0]).toEqual('an echec');
  });

});
