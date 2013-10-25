
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




/*
* # Introduction
* Level 1 - One elevator, two floor, one request
* Level 2 - One elevator, three floor, two requests very close, one a bit later
* Level 3 - Two elevators, five floors, two requests very close
* 
* # Challenges
* Level 4 - Two elevators, seven floors, lots of requests
* Level 5 - Three elevators, seven floors, lots of requests
* Level 6 - Three elevators, ten floors, random
* Level 7 - Four elevators, ten floors, lots of requests
*/
var scenarii = [
  // Introduction levels
  {
    elevators: 1,
    floors: 2,
    scenario: function(elevators){
      setTimeout(function(){ requestFloor(2); }, 0);
    }
  },
  {
    elevators: 1,
    floors: 3,
    scenario: function(elevators){
      // 2 persons asking almost at the same time
      setTimeout(function(){ requestFloor(2); }, 0);
      setTimeout(function(){ requestFloor(3); }, 10);
      
      // one more request
      setTimeout(function(){ requestFloor(1); }, 1500);
    }
  },
  {
    elevators: 2,
    floors: 5,
    scenario: function(elevators){
      // 2 persons asking almost at the same time
      setTimeout(function(){ requestFloor(3); }, 0);
      setTimeout(function(){ requestFloor(5); }, 100);
      
      setTimeout(function(){ requestFloor(1); }, 1500);
      setTimeout(function(){ requestFloor(2); }, 1600);
    }
  },
  
  // Challenges
  {
    elevators: 2,
    floors: 7,
    scenario: function(elevators){
      // 2 persons asking almost at the same time
      setTimeout(function(){ requestFloor(2); }, 0);
      setTimeout(function(){ requestFloor(3); }, 500);
      setTimeout(function(){ requestFloor(4); }, 1000);
      setTimeout(function(){ requestFloor(5); }, 1500);
      setTimeout(function(){ requestFloor(6); }, 2000);
      setTimeout(function(){ requestFloor(7); }, 2500);
      setTimeout(function(){ requestFloor(1); }, 3000);
      
      setTimeout(function(){ requestFloor(3); }, 3500);
      setTimeout(function(){ requestFloor(4); }, 3500);
      
      setTimeout(function(){ requestFloor(5); }, 4000);
      setTimeout(function(){ requestFloor(1); }, 4500);
      setTimeout(function(){ requestFloor(3); }, 5000);
      setTimeout(function(){ requestFloor(2); }, 5500);
    }
  },
  
  {
    elevators: 3,
    floors: 7,
    scenario: function(elevators){
      // 2 persons asking almost at the same time
      setTimeout(function(){ requestFloor(2); }, 0);
      setTimeout(function(){ requestFloor(3); }, 500);
      setTimeout(function(){ requestFloor(4); }, 1000);
      setTimeout(function(){ requestFloor(5); }, 1500);
      setTimeout(function(){ requestFloor(6); }, 2000);
      setTimeout(function(){ requestFloor(7); }, 2500);
      setTimeout(function(){ requestFloor(1); }, 2500);
      
      setTimeout(function(){ requestFloor(3); }, 3500);
      setTimeout(function(){ requestFloor(4); }, 3500);
      
      // insisting on 2 for whatever reason from now on
      setTimeout(function(){ requestFloor(2); }, 4000);
      
      setTimeout(function(){ requestFloor(5); }, 4100);
      setTimeout(function(){ requestFloor(6); }, 4200);
      setTimeout(function(){ requestFloor(7); }, 4300);
      setTimeout(function(){ requestFloor(1); }, 4400);
      
      setTimeout(function(){ requestFloor(2); }, 5000);
      
      setTimeout(function(){ requestFloor(7); }, 5600);
      setTimeout(function(){ requestFloor(6); }, 5700);
      setTimeout(function(){ requestFloor(5); }, 5800);
      setTimeout(function(){ requestFloor(1); }, 5900);
      
      setTimeout(function(){ requestFloor(2); }, 6000);
      
      setTimeout(function(){ requestFloor(2); }, 7000);
      setTimeout(function(){ requestFloor(2); }, 8000);
      setTimeout(function(){ requestFloor(2); }, 9000);
      
      setTimeout(function(){ requestFloor(3); }, 9500);
      setTimeout(function(){ requestFloor(1); }, 9500);
      setTimeout(function(){ requestFloor(4); }, 9700);
      
      setTimeout(function(){ requestFloor(2); }, 10000);
      
      setTimeout(function(){ requestFloor(7); }, 11500);
      setTimeout(function(){ requestFloor(6); }, 13000);
      setTimeout(function(){ requestFloor(5); }, 14500);
      setTimeout(function(){ requestFloor(4); }, 16000);
      setTimeout(function(){ requestFloor(3); }, 17500);
      setTimeout(function(){ requestFloor(2); }, 19000);
      setTimeout(function(){ requestFloor(1); }, 20000);
    }
  },
  
  {
    elevators: 3,
    floors: 10,
    scenario: function(elevators){
      
      function randFloor(){
        return Math.floor(10*Math.random()) + 1;
      }
      
      var nextFloorRequestTime = 0;
      
      while(nextFloorRequestTime < 20*1000){
        setTimeout(function(){ requestFloor(randFloor()); }, nextFloorRequestTime);
        nextFloorRequestTime += 800*Math.random()+100;
      }
    }
  },
  
  {
    elevators: 4,
    floors: 10,
    scenario: function(elevators){
      setTimeout(function(){ requestFloor(2); }, 0);
      setTimeout(function(){ requestFloor(3); }, 500);
      setTimeout(function(){ requestFloor(4); }, 1000);
      setTimeout(function(){ requestFloor(5); }, 1500);
      setTimeout(function(){ requestFloor(6); }, 2000);
      setTimeout(function(){ requestFloor(7); }, 2500);
      setTimeout(function(){ requestFloor(8); }, 3000);
      setTimeout(function(){ requestFloor(9); }, 3500);
      setTimeout(function(){ requestFloor(10); }, 4000);
      setTimeout(function(){ requestFloor(1); }, 4500);
      
      setTimeout(function(){ requestFloor(2); }, 6000);
      setTimeout(function(){ requestFloor(4); }, 6500);
      setTimeout(function(){ requestFloor(6); }, 7000);
      setTimeout(function(){ requestFloor(8); }, 7500);
      setTimeout(function(){ requestFloor(9); }, 8000);
      setTimeout(function(){ requestFloor(10); }, 8500);
      
      setTimeout(function(){ requestFloor(3); }, 10000);
      setTimeout(function(){ requestFloor(1); }, 10000);
      setTimeout(function(){ requestFloor(4); }, 11000);
      setTimeout(function(){ requestFloor(10); }, 11000);
      
      setTimeout(function(){ requestFloor(3); }, 10000);
      setTimeout(function(){ requestFloor(1); }, 10000);
      setTimeout(function(){ requestFloor(7); }, 10000);
      setTimeout(function(){ requestFloor(4); }, 11000);
      setTimeout(function(){ requestFloor(10); }, 11000);
      setTimeout(function(){ requestFloor(5); }, 11000);
      
      setTimeout(function(){ requestFloor(2); }, 12000);
      setTimeout(function(){ requestFloor(9); }, 12000);
      setTimeout(function(){ requestFloor(6); }, 12000);
      setTimeout(function(){ requestFloor(1); }, 13000);
      setTimeout(function(){ requestFloor(3); }, 13000);
      setTimeout(function(){ requestFloor(5); }, 13000);
      
      setTimeout(function(){ requestFloor(3); }, 14000);
      setTimeout(function(){ requestFloor(4); }, 14200);
      setTimeout(function(){ requestFloor(5); }, 14400);
      setTimeout(function(){ requestFloor(6); }, 14600);
      setTimeout(function(){ requestFloor(7); }, 14800);
      setTimeout(function(){ requestFloor(8); }, 15000);
      
      setTimeout(function(){ requestFloor(10); }, 15500);
      setTimeout(function(){ requestFloor(9); }, 16000);
      setTimeout(function(){ requestFloor(8); }, 16500);
      setTimeout(function(){ requestFloor(7); }, 17000);
      setTimeout(function(){ requestFloor(6); }, 17500);
      setTimeout(function(){ requestFloor(5); }, 18000);
      setTimeout(function(){ requestFloor(4); }, 18500);
      setTimeout(function(){ requestFloor(3); }, 19000);
      setTimeout(function(){ requestFloor(2); }, 19500);
      setTimeout(function(){ requestFloor(1); }, 20000);
  },
  

];
  
  
  
  
  
  
  