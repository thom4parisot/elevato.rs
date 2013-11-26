'use strict';

describe('Elevator', function(){
  describe('.goToFloor()', function(){
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
      expect(elevator.goingToFloor).to.eql(null);
      expect(elevator.previousFloor).to.eql(1);
      expect(elevator.requestStack).to.be.empty;
      expect(handleSpy.called).to.be.false;
    });

    it('should go from floor 1 to floor 2', function(){
      elevator.goToFloor(2);

      expect(elevator.goingToFloor).to.eql(2);
      expect(elevator.requestsStack).to.contain(2).and.to.be.length.of(1);
      expect(handleSpy.called).to.be.true;
    });

    it('should not deal with a dupe request for a floor', function(){
      elevator.goToFloor(2);
      elevator.goToFloor(3);
      elevator.goToFloor(2);

      expect(elevator.goingToFloor).to.eql(2);
      expect(elevator.requestsStack).to.eql([2, 3]);
    });

    it('should not deal with a request targeting the same floor the elevator is at', function(){
      elevator.goToFloor(1);

      expect(handleSpy.called).to.be.false;
    })
  });
});