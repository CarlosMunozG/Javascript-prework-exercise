

// ===================================
// DECLARING CUSTOMIZABLE VARIABLES
// ===================================

// Number of rovers
var numberRovers = 10;

// Shape of rovers' grid. It will be square.
var roverBoardShape = 8;

// Number of obstacle in the grid. 
var roverBoardObstacles = 10;

// Movements rovers is going to make.
var roverCommands = "rffrfff";



// =======================================
// DECLARING NON-CUSTOMIZABLE VARIABLES
// =======================================

var rover = [];
var roverBoard = [];
var roverBoardRow = 0;
var roverBoardColumn = 0;
for(i=0; i<roverBoardShape; i++) {
    roverBoard[i] = [];
    for(j=0; j<roverBoardShape; j++) {
        roverBoard[i][j] = null;
        roverBoardRow = roverBoard[i];
        roverBoardColumn = roverBoard[j];
    }
}
var limitX = roverBoardRow.length -1;
var limitY = roverBoardColumn.length -1;
var lastXpos = [];
var lastYpos = [];
var nextY = [];
var nextX = [];
var prevY = [];
var prevX = [];



// ================================================
// DECLARING FUNCTIONS FOR ALL THE ROVERS CREATED
// ================================================

// creating all the rovers, directions and coordenates
function creatingRovers(){
  var allDirections = "NESW";
  for(i=0; i<numberRovers; i++){
    var RandomDirection = Math.floor(Math.random() * (allDirections.length) );
    var RandomPosX = Math.floor(Math.random() * (roverBoardShape) );
    var RandomPosY = Math.floor(Math.random() * (roverBoardShape) );
    rover[i] = { name:"rover"+[i+1], direction:allDirections[RandomDirection] , x:RandomPosX, y:RandomPosY, travelLog:[] };
    //putting the rovers randomly inside the grid
    if(roverBoard[RandomPosY][RandomPosX] === null){
      roverBoard[RandomPosY][RandomPosX] = "R"+[i+1];
    } else {
      i = i - 1;
    }
    // updating variables
    lastXpos[i] = rover[i].x;
    lastYpos[i] = rover[i].y;
    nextY[i] = rover[i].y + 1;
    nextX[i] = rover[i].x + 1;
    prevY[i] = rover[i].y - 1;
    prevX[i] = rover[i].x - 1;
  }
}
creatingRovers();
console.log("Rovers' info:");
console.table(rover);
console.log("----");
console.log("Number of rovers: " + numberRovers);
console.log("Number of obstacle: " + roverBoardObstacles) 

//putting obstacles in board randomly
function putObstaclesInBoard() {
  for(i=0; i<roverBoardObstacles; i++){
    var RandomNumberX = Math.floor(Math.random() * (roverBoardShape) );
    var RandomNumberY = Math.floor(Math.random() * (roverBoardShape) );
    if(roverBoard[RandomNumberY][RandomNumberX] === null){
      roverBoard[RandomNumberY][RandomNumberX] = "[]";
    } else {
      i = i - 1;
    }
  }
  console.log("Grid:");
  console.table(roverBoard);
}
putObstaclesInBoard();



// turning left
function turnLeft(rover){
  console.log("Changing direction to the LEFT...");
  for(i=0; i<numberRovers; i++){
    switch (rover[i].direction) {
      case "N":
        rover[i].direction = "W"; 
        lastYpos[i] = rover[i].y;
        break;
      case "W":
        rover[i].direction = "S"; 
        lastXpos[i] = rover[i].x;
        break;
      case "S":
        rover[i].direction = "E";
        lastYpos[i] = rover[i].y; 
        break;
      case "E":
        rover[i].direction = "N";
        lastXpos[i] = rover[i].x; 
        break;
    }
    console.log(rover[i].name + "'s direction has changed to " + rover[i].direction);
    console.log(rover[i]);
  }
  console.log("----");
}

// turning right
function turnRight(rover){
  console.log("Changing direction to the RIGHT...");
  for(i=0; i<numberRovers; i++){
    switch (rover[i].direction) {
      case "N":
        rover[i].direction = "E"; 
        lastYpos[i] = rover[i].y;
        break;
      case "E":
        rover[i].direction = "S"; 
        lastXpos[i] = rover[i].x;
        break;
      case "S":
        rover[i].direction = "W"; 
        lastYpos[i] = rover[i].y;
        break;
      case "W":
        rover[i].direction = "N"; 
        lastXpos[i] = rover[i].x;
        break;
    }
    console.log(rover[i].name + "'s direction has changed to " + rover[i].direction);
    console.log(rover[i]);
  }
  console.log("----");
}

// moving forward function
function moveForward(rover){
  console.log("Moving FORWARD...");
  for(i=0; i<numberRovers; i++){
    
    if(rover[i].direction === "N"){
      if(rover[i].y > 0 && rover[i].y <= limitY){
        //checking obstacles and rovers
        if( roverBoard[prevY[i]][rover[i].x] === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[prevY[i]][rover[i].x] === null || roverBoard[prevY[i]][rover[i].x].substring(0, 1) === "X" ){
          rover[i].y = rover[i].y - 1;
          prevY[i] = rover[i].y - 1;
          nextY[i] = rover[i].y + 1;
          nextX[i] = rover[i].x + 1;
          prevX[i] = rover[i].x - 1;
          if(lastYpos[i] !== rover[i].y){
            lastYpos[i] = rover[i].y + 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
        
      } else if(rover[i].y === 0){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
      
    } else if(rover[i].direction === "E"){
      if(rover[i].x >= 0 && rover[i].x < limitX){
        //checking obstacles and rovers
        if( (roverBoard[rover[i].y][nextX[i]]) === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( (roverBoard[rover[i].y][nextX[i]]) === null || (roverBoard[rover[i].y][nextX[i]]).substring(0, 1) === "X" ){
          rover[i].x = rover[i].x + 1;
          nextX[i] = rover[i].x + 1;
          nextY[i] = rover[i].y + 1;
          prevY[i] = rover[i].y - 1;
          prevX[i] = rover[i].x - 1;
          if(lastXpos[i] !== rover[i].x){
            lastXpos[i] = rover[i].x - 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].x === limitX){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
    } else if(rover[i].direction === "S"){
      if(rover[i].y >= 0 && rover[i].y < limitY){
        //checking obstacles and rovers
        if( roverBoard[nextY[i]][rover[i].x] === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[nextY[i]][rover[i].x] === null || roverBoard[nextY[i]][rover[i].x].substring(0, 1) === "X" ){
          rover[i].y = rover[i].y + 1;
          nextY[i] = rover[i].y + 1;
          prevY[i] = rover[i].y - 1;
          nextX[i] = rover[i].x + 1;
          prevX[i] = rover[i].x - 1;
          if(lastYpos[i] !== rover[i].y){
            lastYpos[i] = rover[i].y - 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].y === limitY){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
    } else if(rover[i].direction === "W"){
      if(rover[i].x > 0 && rover[i].x <= limitX){
        //checking obstacles and rovers
        if( roverBoard[rover[i].y][prevX[i]] === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[rover[i].y][prevX[i]] === null || roverBoard[rover[i].y][prevX[i]].substring(0, 1) === "X" ){
          rover[i].x = rover[i].x - 1;
          prevX[i] = rover[i].x - 1;
          nextY[i] = rover[i].y + 1;
          nextX[i] = rover[i].x + 1;
          prevY[i] = rover[i].y - 1;
          if(lastXpos[i] !== rover[i].x){
            lastXpos[i] = rover[i].x + 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].x === 0){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      }  
    }  
    console.log(rover[i]);
  }
  console.log("----");
}


// moving backward function
function moveBackward(rover){
  console.log("Moving BACKWARD...");
  for(i=0; i<numberRovers; i++){

    if(rover[i].direction === "N"){
      if(rover[i].y >= 0 && rover[i].y < limitY){
        //checking obstacles and rovers
        if( roverBoard[nextY[i]][rover[i].x] === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[nextY[i]][rover[i].x] === null || roverBoard[nextY[i]][rover[i].x].substring(0, 1) === "X" ){
          rover[i].y = rover[i].y + 1;
          prevY[i] = rover[i].y -1;
          nextY[i] = rover[i].y + 1;
          nextX[i] = rover[i].x + 1;
          prevX[i] = rover[i].x - 1;
          if(lastYpos[i] !== rover[i].y){
            lastYpos[i] = rover[i].y - 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {   
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].y === limitY){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
    } else if(rover[i].direction === "E"){
      if(rover[i].x > 0 && rover[i].x <= limitX){
        //checking obstacles and rovers
        if( roverBoard[rover[i].y][prevX[i]]  === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[rover[i].y][prevX[i]]  === null || roverBoard[rover[i].y][prevX[i]].substring(0, 1) === "X" ){
          rover[i].x = rover[i].x - 1;
          prevY[i] = rover[i].y - 1;
          nextY[i] = rover[i].y + 1;
          nextX[i] = rover[i].x + 1;
          prevX[i] = rover[i].x - 1;
          if(lastXpos[i] !== rover[i].x){
            lastXpos[i] = rover[i].x + 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].x === 0){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
    } else if(rover[i].direction === "S"){
      if(rover[i].y > 0 && rover[i].y <= limitY){
        //checking obstacles and rovers
        if( roverBoard[prevY[i]][rover[i].x] === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[prevY[i]][rover[i].x] === null || roverBoard[prevY[i]][rover[i].x].substring(0, 1) === "X" ){
          rover[i].y = rover[i].y - 1;
          prevY[i] = rover[i].y - 1;
          nextY[i] = rover[i].y + 1;
          nextX[i] = rover[i].x + 1;
          prevX[i] = rover[i].x - 1;
          if(lastYpos[i] !== rover[i].y){
            lastYpos[i] = rover[i].y + 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].y === 0){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
    } else if(rover[i].direction === "W"){
      if(rover[i].x >= 0 && rover[i].x < limitX){
        //checking obstacles and rovers
        if( roverBoard[rover[i].y][nextX[i]] === "[]" ){
          console.log(rover[i].name + " has found an obstacle!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        } else if( roverBoard[rover[i].y][nextX[i]] === null || roverBoard[rover[i].y][nextX[i]].substring(0, 1) === "X" ){ 
          rover[i].x = rover[i].x + 1;
          prevY[i] = rover[i].y - 1;
          nextY[i] = rover[i].y + 1;
          nextX[i] = rover[i].x + 1;
          prevX[i] = rover[i].x - 1;
          if(lastXpos[i] !== rover[i].x){
            lastXpos[i] = rover[i].x - 1;
            rover[i].travelLog.push("\[" + lastXpos[i] + "," + lastYpos[i] + "\]");
            roverBoard[lastYpos[i]][lastXpos[i]] = "X"+[i+1];
            roverBoard[rover[i].y][rover[i].x] = "R"+[i+1];
            console.log(rover[i].name + " has moved to position: \[" + rover[i].x + "," + rover[i].y + "\]");
          }
        } else {
          console.log(rover[i].name + " has found another rover!!! It will stay at the same position: \[" + rover[i].x + "," + rover[i].y + "\]");
        }
      } else if(rover[i].x === limitX){
        console.log(rover[i].name + " is out of the board. It will go back to its last position: \[" + rover[i].x + "," + rover[i].y + "\]");
      } 
    }
    console.log(rover[i]);
  }
  console.log("----");
}

// moving the rover with the variable "roverMovements" we gave above
function roverMovement(rover){
  for (j=0; j<roverCommands.length; j++) {
    var letter = roverCommands[j];
    if(letter !== "l" && letter !== "r" && letter !== "f" && letter !== "b"){
      console.log("This letter: \"" + roverCommands[j] + "\" is not valid. Please, enter a valid letter to continue.");
      break;
    } else {
      if(letter === "l") {
        turnLeft(rover);
      } else if (letter === "r"){
        turnRight(rover);
      } else if(letter === "f"){
        moveForward(rover);
      } else if(letter === "b"){
        moveBackward(rover);
      } 
    }
  }
  console.log("FINAL RESULT:");
  for(i=0; i<numberRovers; i++){  
    var checkRM = [];
    checkRM[i] = rover[i].travelLog;
    if (typeof checkRM[i] !== 'undefined' && checkRM[i].length > 0 && checkRM[i].length !== null && checkRM[i] !== null){
      console.log("These are the positions were the " + rover[i].name + " has been: " + rover[i].travelLog);
    } else {
      console.log("The " + rover[i].name + " didn't move.");
    }
    console.log("The actual position of " + rover[i].name + " is: \[" + rover[i].x + "," + rover[i].y + "\]");
  }
  console.table(roverBoard);
} 
roverMovement(rover);