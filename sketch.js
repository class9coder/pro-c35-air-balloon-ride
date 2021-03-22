var balloon, database;
var position;

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  console.log(database);
  balloon = createSprite(250, 250, 10, 10);
  balloon.shapecolor = "red";

  var balloonPosition = database.ref('ball/position');
  balloonPosition.on("value", readPosition, showError);

}

function draw() {
  background(255,255,255); 
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  } 
  drawSprites();
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}