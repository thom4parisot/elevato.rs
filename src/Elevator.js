(function(context){
  "use strict";

  function amimationEnd(e){
    this.previousFloor = this.requestsStack.shift();

    this.transition('unloading');
  }

  function queuedNotice(){
    console.log('Already moving. Request put on hold.')
  }

  /**
   * The expected flow of things is
   * 1. idle
   * 2. request for a floor number
   * 3. moving (and stacking calls)
   * 4. unloading
   * 4.1 idle if queue empty
   * 4.2 moving to first item if queue not empty
   */
  var Elevator = machina.Fsm.extend({
    initialState: "idle",
    el: "",
    goingToFloor: 1,
    previousFloor: 1,
    initialize: function(){
      var self = this;

      //we do it here otherwise the stack is shared among the various elevators (and we don't want it)
      this.requestsStack = [];

      this.el.addEventListener('animationend', amimationEnd.bind(this));
      this.el.addEventListener('webkitTransitionEnd', amimationEnd.bind(this));
    },
    states: {
      /**
       * Actions done when the elevator has an empty state
       */
      'idle': {
        _onEnter: function(){
          this.goingToFloor = null;
        },
        'move': function(floor_number){
          this.transition('moving');
          this.goingToFloor = floor_number;

          var b = parseInt(window.getComputedStyle(this.el).bottom, 10);
          this.el.style.bottom = ((floor_number - 1)*105 + 10) + 'px'; // hardcoding :-( related to CSS height & margin
          this.el.style.transitionDuration = Math.abs(floor_number - this.previousFloor)+"s";
          this.el.setAttribute('data-at-floor', floor_number);
        }
      },
      /**
       * Actions done when the elevator is moving
       */
      'moving': {
        'move': queuedNotice
      },
      /**
       * Actions done when the elevator is unloading people
       */
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
    /**
     * Public API used to drag an elevator to a certain level
     * @api
     * @param floor_number
     * @returns {*}
     */
    goToFloor: function(floor_number){
      this.requestsStack.push(floor_number);
      this.handle('move', floor_number);

      return this;
    }
  });

  context['Elevator'] = Elevator;
})(window);
