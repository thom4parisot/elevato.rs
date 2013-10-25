(function(global){
  "use strict";

  document.addEventListener('DOMContentLoaded', function(){

    global.elevators = [].slice.call(document.querySelectorAll('.shaft .elevator')).map(function(el){
      var e = new Elevator({
        el: el
      });

      e.on('moving', function(event){
        onElevatorRequest(e, global.elevators)
      });

      e.on('idle', function(event){
        onElevatorIdle(e, global.elevators);
      });

      return e;
    });

    //Object.freeze(elevators);
  });

})(this);