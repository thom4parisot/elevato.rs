(function(context){
  "use strict";

  function amimationEnd(e){
    this.previousFloor = this.requestsStack.shift();

    this.transition('unloading');
  }

  function queuedNotice(){
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
    el: null,
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
          if (!this.requestsStack.length){
            this.emit('idle', this.goingToFloor, this);
          }

          this.goingToFloor = null;
        },
        'move': function(floor_number){
          this.transition('moving');
          this.goingToFloor = floor_number;

          this.emit('moving', this);

          // using this.goingToFloor because the event might change the direction
          // hardcoding :-( related to CSS height & margin
          this.el.style.bottom = ((this.goingToFloor - 1)*100 + 2) + 'px';
          this.el.style.transitionDuration = Math.abs(this.goingToFloor - this.previousFloor)+"s";
          this.el.setAttribute('data-at-floor', this.goingToFloor);
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
          var self = this;

          setTimeout(function(){
            self.emit('unload', self.goingToFloor);
            self.transition('idle');

            if (self.requestsStack.length){
              console.log('about to move to ', self.requestsStack[0]);
              self.handle('move', self.requestsStack[0]);
            }
          }, 1000);
        },
        'move': queuedNotice
      }
    },
    /**
     * Public API used to drag an elevator to a certain level
     *
     * @api
     * @param floor_number
     * @returns {*}
     */
    goToFloor: function(floor_number){
      if (~this.requestsStack.indexOf(floor_number) === 0){
        this.requestsStack.push(floor_number);
        this.handle('move', floor_number);
      }

      return this;
    }
  });

  context['Elevator'] = Elevator;
})(window);
