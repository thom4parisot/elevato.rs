"use strict";

var window = require('global/window');
var document = require('global/document');
var console = require('global/console');

var Elevator = require('./elevator');
var elevators = [];

function setFloorState(floorNumber, state){
  [].slice.call(document.querySelectorAll('.floor[data-level="'+floorNumber+'"]')).forEach(function(floor){
    floor.setAttribute('data-state', state);
  });
}

function getElevators(){
  return Array.prototype.slice.call(document.querySelectorAll('.elevator'));
}

function getElevatorCount(){
  return Number(document.querySelector('body').getAttribute('data-elevators'));
}

module.exports = {
  requestFloor: function requestFloor(elevators, floorNumber){
    console.log('Elevator request at floor', floorNumber);
    setFloorState(floorNumber, 'waiting');
    window.onFloorRequest(floorNumber, elevators);
  },
  create: function(onIdle){
    elevators = getElevators().map(function (el, id) {
      var e = new Elevator({
        el: el,
        id: id
      });

      e.on('unload', function(floorNumber){
        setFloorState(floorNumber, '');
      });

      e.on('idle', function (floorNumber, elevator) {
        var els = elevators.slice(0, getElevatorCount());

        window.onElevatorIdle(elevator, els);
        onIdle(elevator, els);
      });

      return e;
    });

    return elevators;
  },
  reset: function resetElevators(elevators){
    elevators.forEach(function(elevator){
      elevator.reset();
    });

    for (var i = 1; i <= 10; i++){
      setFloorState(i, '');
    }
  },
  updateStatus: function updateStatus(currentScenario){
    var bodyEl = document.querySelector('body');

    currentScenario = currentScenario || {};

    bodyEl.setAttribute('data-floors', currentScenario.floors || 0);
    bodyEl.setAttribute('data-elevators', currentScenario.elevators || 0);
  }
};