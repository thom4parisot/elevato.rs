'use strict';

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
module.exports = [
  // Introduction levels
  {
    elevators: 1,
    floors: 2,
    sequences: [
      [2, 0]
    ]
  },

  {
    elevators: 1,
    floors: 3,
    sequences: [
      [2, 0],
      [3, 10],
      [1, 1500]
    ]
  },

  {
    elevators: 2,
    floors: 5,
    sequences: [
      [3, 0],
      [5, 100],
      [1, 1500],
      [2, 1600]
    ]
  },

  // Challenges
  {
    elevators: 2,
    floors: 7,
    sequences: [
      [2, 0],
      [3, 500],
      [4, 1000],
      [5, 1500],
      [6, 2000],
      [7, 2500],
      [1, 3000],

      [3, 3500],
      [4, 3500],

      [5, 4000],
      [1, 4500],
      [3, 5000],
      [2, 5500]
    ]
  },

  {
    elevators: 3,
    floors: 7,
    sequences: [
      [2, 0],
      [3, 500],
      [4, 1000],
      [5, 1500],
      [6, 2000],
      [7, 2500],
      [1, 2500],

      // 2 persons asking almost at the same time
      [3, 3500],
      [4, 3500],

      // insisting on 2 for whatever reason from now on
      [2, 4000],

      [5, 4100],
      [6, 4200],
      [7, 4300],
      [1, 4400],

      [2, 5000],

      [7, 5600],
      [6, 5700],
      [5, 5800],
      [1, 5900],

      [2, 7000],
      [2, 8000],
      [2, 9000],

      [3, 9500],
      [1, 9500],
      [4, 9700],

      [2, 10000],

      [7, 11500],
      [6, 13000],
      [5, 14500],
      [4, 16000],
      [3, 17500],
      [2, 19000],
      [1, 20000]
    ]
  },

  {
    elevators: 3,
    floors: 10,
    sequences: (function(){
      var s = [];

      function randFloor(){
        return Math.floor(10*Math.random()) + 1;
      }

      var nextFloorRequestTime = 0;

      while(nextFloorRequestTime < 20 * 1000){
        s.push([randFloor(), nextFloorRequestTime]);
        nextFloorRequestTime += 800 * Math.random() + 100;
      }

      return s;
    })()
  },

  {
    elevators: 4,
    floors: 10,
    sequences: [
      [2, 0],
      [3, 500],
      [4, 1000],
      [5, 1500],
      [6, 2000],
      [7, 2500],
      [8, 3000],
      [9, 3500],
      [10, 4000],
      [1, 4500],

      [2, 6000],
      [4, 6500],
      [6, 7000],
      [8, 7500],
      [9, 8000],
      [10, 8500],

      [3, 10000],
      [1, 10000],
      [4, 11000],
      [10, 11000],

      [3, 10000],
      [1, 10000],
      [7, 10000],
      [4, 11000],
      [10, 11000],
      [5, 11000],

      [2, 12000],
      [9, 12000],
      [6, 12000],
      [1, 13000],
      [3, 13000],
      [5, 13000],

      [3, 14000],
      [4, 14200],
      [5, 14400],
      [6, 14600],
      [7, 14800],
      [8, 15000],

      [10, 15500],
      [9, 16000],
      [8, 16500],
      [7, 17000],
      [6, 17500],
      [5, 18000],
      [4, 18500],
      [3, 19000],
      [2, 19500],
      [1, 20000]
    ]
  }

];