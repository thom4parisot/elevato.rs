(function(context){
  "use strict";

  function amimationEnd(e){
    this.requestsStack.shift();

    this.transition('unloading');
  }

  function queuedNotice(){
    console.log('Already moving. Request put on hold.')
  }

  var Elevator = machina.Fsm.extend({
    initialState: "idle",
    initialFloor: 1,
    el: "",
    floor: 1,
    initialize: function(){
      var self = this;

      //we do it here otherwise the stack is shared among the various elevators (and we don't want it)
      this.requestsStack = [];

      this.el.addEventListener('animationend', amimationEnd.bind(this));
      this.el.addEventListener('webkitTransitionEnd', amimationEnd.bind(this));
    },
    states: {
      'idle': {
        'move': function(floor_number){
          this.transition('moving');

          var b = parseInt(window.getComputedStyle(this.el).bottom, 10);
          this.el.style.bottom = ((floor_number - 1)*105 + 10) + 'px'; // hardcoding :-( related to CSS height & margin
          this.el.style.transitionDuration = "1s"; // TODO make depend on floor difference
          this.el.setAttribute('data-at-floor', floor_number);
        }
      },
      'moving': {
        'move': queuedNotice
      },
      'unloading': {
        _onEnter: function(){
          this.transition('idle');

          if (!this.requestsStack.length){
            return;
          }

          this.handle('move', this.requestsStack[0]);
        },
        'move': queuedNotice
      }
    },
    goToFloor: function(floor_number){
      this.requestsStack.push(floor_number);
      this.handle('move', floor_number);

      return this;
    }
  });

  context['Elevator'] = Elevator;
})(window);
