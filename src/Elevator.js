(function(context){
  "use strict";

  function amimationEnd(e){
    this.requestsStack.shift();
    console.log('animationend', this.requestsStack);
  }

  var Elevator = machina.Fsm.extend({
    initialState: "idle",
    initialFloor: 1,
    el: "",
    floor: 1,
    initialize: function(){
      var self = this;

      //we do it here otherwhise the stack is shared among the various elevators (and we don't want it)
      this.requestsStack = [];

      console.log(this.requestsStack)
      this.el.addEventListener('animationend', amimationEnd.bind(this));
      this.el.addEventListener('webkitTransitionEnd', amimationEnd.bind(this));
    },
    states: {
      'idle': {
        'move': function(floor_number){
          this.requestsStack.push(floor_number);
          this.transition('moving');

          var b = parseInt(window.getComputedStyle(this.el).bottom, 10);
          this.el.style.bottom = ((floor_number - 1)*105 + 10) + 'px'; // hardcoding :-( related to CSS height & margin
          this.el.style.transitionDuration = "1s"; // TODO make depend on floor difference
          this.el.setAttribute('data-at-floor', floor_number);
        }
      },
      'moving': {
        'move': function(floor_number){
          this.requestsStack.push(floor_number);
        }
      }
    },
    goToFloor: function(floor_number){
      this.handle('move', floor_number);

      return this;
    }
  });

  context['Elevator'] = Elevator;
})(window);
