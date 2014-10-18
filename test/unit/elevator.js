'use strict';

var Elevator = require('../../src/lib/elevator.js');

describe('Elevator', function(){
  describe('.moveTo()', function(){
    var sandbox, handleSpy, elevator;

    beforeEach(function(){
      sandbox = sinon.sandbox.create();

      elevator = new Elevator({ id: 0, el: document.createElement('div') });
      handleSpy = sandbox.spy(elevator, 'handle');
    });

    afterEach(function(){
      sandbox.restore();
    });

    it('should have some default values', function(){
      expect(elevator.nextFloor).to.eql(null);
      expect(elevator.previousFloor).to.eql(1);
      expect(elevator.requestStack).to.be.empty;
      expect(handleSpy.called).to.be.false;
    });

    it('should go from floor 1 to floor 2', function(){
      elevator.moveTo(2);

      expect(elevator.nextFloor).to.eql(2);
      expect(elevator.requestedAt).to.be.empty;
      expect(handleSpy).to.calledWith('move');
    });

    it('should not deal with a dupe request for a floor', function(){
      elevator.moveTo(2);
      elevator.moveTo(3);
      elevator.moveTo(2);

      expect(elevator.requestedAt).to.eql([3, 2]);
    });

    it('should not deal with a request targeting the same floor the elevator is at', function(){
      elevator.moveTo(1);

      expect(handleSpy.called).to.be.false;
    })
  });
});