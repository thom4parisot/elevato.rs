(function (context) {
  "use strict";

  context.elevators = [].slice.call(document.querySelectorAll('.shaft:not([hidden]) .elevator')).map(function (el, id) {
    var e = new Elevator({
      el: el,
      id: id
    });

    e.on('unload', function(floorNumber){
      setFloorState(floorNumber, '');
    });

    e.on('idle', function (floorNumber, elevator) {
      context.onElevatorIdle(e, context.elevators);

      setTimeout(function(){
        checkIfScenarioIsComplete(context.elevators);
      }, 2000);
    });

    return e;
  });

})(this);