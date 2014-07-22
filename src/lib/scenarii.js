'use strict';

var window = require('global/window');
var document = require('global/document');

var Scenario = require('./scenario');
var data = require('./../scenarii-data');
var requestFloor = require('./elevators').requestFloor;

module.exports = {
  /**
   *
   * @returns {*|null}
   */
  getCurrent: function getCurrentScenario(){
    var level = Number(document.querySelector('#level').value) - 1;

    return new Scenario(data[level]) || null;
  },
  checkCompletion: function checkCompletion(scenario, allElevators){
    var allIdle = allElevators.some(function(elevator){
      return elevator.state === "idle";
    });

    if (allIdle){
      document.body.setAttribute('data-state', document.querySelectorAll('.floor[data-state="waiting"]').length ? 'failure' : 'success');
      console.log('Scenario completed in %s seconds.', (Date.now() - scenario._startTime - 1000) / 1000);
    }
  },
  /**
   *
   * @param scenario {Scenario}
   * @param allElevators
   */
  runScenario: function runScenario(scenario, allElevators){
    var currentCode = document.querySelector('#editor').value.trim();
    var functions = eval(new Function(currentCode + '; return { onFloorRequest: onFloorRequest, onElevatorIdle: onElevatorIdle }'))();

    Object.keys(functions).forEach(function(functionName){
      window[functionName] = functions[functionName];
    });

    if(typeof onFloorRequest !== 'function')
      throw new Error('An "onFloorRequest" function must be defined somewhere');

    if(typeof onElevatorIdle !== 'function')
      throw new Error('An "onElevatorIdle" function must be defined somewhere');

    var configuredRequestFloorCallback = requestFloor.bind(null, allElevators.slice(0, scenario.elevators));

    return scenario.run(configuredRequestFloorCallback);
  }
};




