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

function getActiveElevators(){
  var count = Number(document.querySelector('body').getAttribute('data-elevators'));

  return elevators.slice(0, count);
}

module.exports = {
  getElevators: getElevators,
  getActiveElevators: getActiveElevators,
  requestFloor: function requestFloor(floorNumber){
    console.log('Elevator request at floor', floorNumber);
    setFloorState(floorNumber, 'waiting');
    window.onFloorRequest(floorNumber, getActiveElevators());
  },
  create: function(){
    elevators = this.getElevators().map(function (el, id) {
      var e = new Elevator({
        el: el,
        id: id
      });

      e.on('unload', function(floorNumber){
        setFloorState(floorNumber, '');
      });

      e.on('idle', function (floorNumber, elevator) {
        window.onElevatorIdle(e, elevator, getActiveElevators());
      });

      return e;
    });

    return elevators;
  }
};