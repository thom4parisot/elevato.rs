(function (context) {
  "use strict";

  context.elevators = [].slice.call(document.querySelectorAll('.shaft .elevator')).map(function (el, id) {
    var e = new Elevator({
      el: el,
      id: id
    });

    e.on('idle', function (event) {
      context.onElevatorIdle(e, context.elevators);
    });

    return e;
  });

})(this);