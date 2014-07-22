'use strict';

function Scenario(data){
  data = data || {};

  /**
   *
   * @type {number}
   */
  this.elevators = Number(data.elevators) || 0;

  /**
   *
   * @type {number}
   */
  this.floors = Number(data.floors) || 0;

  /**
   *
   * @type {Array}
   */
  this.sequences = data.sequences || [];

  /**
   *
   */
  this._timers = [];

  this._startTime = null;
}

Scenario.prototype = {
  run: function runScenario(requestFloorFn){
    var selfie = this;

    this._startTime = Date.now();

    this._timers = this.sequences.map(function(sequence){
      return setTimeout(requestFloorFn.bind(selfie, sequence[0]), sequence[1]);
    });

    return this;
  },
  stop: function stopScenario(){
    this._timers.forEach(clearTimeout);
    this._timers = [];
    this._startTime = null;

    return this;
  }
};

module.exports = Scenario;