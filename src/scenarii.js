
function runBasicScenario(elevators){
  var f = 0;
  elevators[f++].goToFloor(2).goToFloor(3).goToFloor(4).goToFloor(1);
  elevators[f++].goToFloor(3).goToFloor(4).goToFloor(3).goToFloor(1);
  elevators[f++].goToFloor(4).goToFloor(3).goToFloor(2).goToFloor(1);
  elevators[f++].goToFloor(4).goToFloor(1).goToFloor(4).goToFloor(1);
}

function runAllScenarios(elevators){
  if(typeof onElevatorRequest !== 'function')
    throw new Error('An "onElevatorRequest" function must be defined somewhere');

  if(typeof onElevatorIdle !== 'function')
    throw new Error('An "onElevatorIdle" function must be defined somewhere');

  runBasicScenario(elevators);
}