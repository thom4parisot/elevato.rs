(function (context) {
  "use strict";

  context.elevators = [].slice.call(document.querySelectorAll('.shaft .elevator')).map(function (el, id) {
    var e = new Elevator({
      el: el,
      id: id
    });

    e.on('moving', function (event) {
      context.onFloorRequest(e, context.elevators)
    });

    e.on('idle', function (event) {
      context.onElevatorIdle(e, context.elevators);
    });

    return e;
  });

})(this);