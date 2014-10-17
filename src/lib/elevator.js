"use strict";

var machina = require('machina');

function animationEnd(e){
  if (e.propertyName !== 'bottom') {
    return;
  }

  this.previousFloor = this.nextFloor;

  this.transition('unloading');
}

function queuedNotice(){
}

function resetElevatorObject(elevator){
  elevator.requestedAt = [];

  elevator.previousFloor = 1;
  elevator.nextFloor = 1;
  elevator.el.setAttribute('data-at-floor', elevator.nextFloor);
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
module.exports = machina().Fsm.extend({
  initialState: "idle",
  el: null,
  elementHeight: 0,
  nextFloor: 1,
  previousFloor: 1,
  initialize: function(){
    //we do it here otherwise the stack is shared among the various elevators (and we don't want it)
    resetElevatorObject(this);

    this.elementHeight = this.el.clientHeight;

    this.el.addEventListener('transitionend', animationEnd.bind(this));
    this.el.addEventListener('webkitTransitionEnd', animationEnd.bind(this));
  },
  states: {
    /**
     * Actions done when the elevator has an empty state
     */
    'idle': {
      _onEnter: function(){
        if (!this.requestedAt.length){
	  this.emit('idle', this.nextFloor, this);
        }

	this.nextFloor = null;
      },
      'move': function(){
        this.transition('moving');
	this.nextFloor = this.requestedAt.shift();

	console.log('#%s -> floor %s', this.id, this.nextFloor);
        this.emit('moving', this);

	// using this.nextFloor because the event might change the direction
	var floorDiff = Math.abs(this.nextFloor - this.previousFloor);

	this.el.style.bottom = ((this.nextFloor - 1) * (this.elementHeight + 1)) + 'px';
        this.el.style.transitionDuration = (floorDiff - (0.1*floorDiff))+"s";
	this.el.setAttribute('data-at-floor', this.nextFloor);
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
	  self.emit('unload', self.nextFloor);
          self.transition('idle');

          if (self.requestedAt.length){
            self.handle('move');
          }
        }, 1000);
      },
      'move': queuedNotice
    }
  },
  reset: function resetElevator(){
    var self = this;
    resetElevatorObject(this);

    this.el.style.transitionDuration = '0s';
    this.el.style.bottom = 0;

    this.transition('idle');

    setTimeout(function(){
      self.el.style.transitionDuration = '';
    }, 0);
  },
  /**
   * Public API used to drag an elevator to a certain level
   *
   * @api
   * @param floor_number
   * @returns {Elevator}
   */
  moveTo: function(floor_number){
    if (
      (this.requestedAt.indexOf(floor_number) === -1) &&
      !(this.state === 'idle' && floor_number === this.previousFloor)
    ){
      this.requestedAt.push(floor_number);
      this.handle('move');
    }

    return this;
  }
});
