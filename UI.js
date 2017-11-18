var cnv;  
var last = [7,32];
var avail= Week();
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var today = new Date();
var myMonth = today.getMonth();
console.log(myMonth);
today = today.getDate();
var rectX;
var rectY;
var rectColor;
var submited = false;
var bookingSequence = [];
var library;

function setup() {
  cnv = createCanvas(490, 640);
  frameRate(32);
  textAlign(LEFT, TOP);
  rectX = width/avail.length;
  rectY = height/avail[0].length;
  noLoop();
  rectColor = color('magenta');
}

// this function is called after the mouse is clicked/dragged or the submit button is pressed
function draw() {
  // draw week
  for (var i =0; i<avail.length; i++){
    for ( var j =0; j <avail[i].length; j++){
      fill(color(200, 200, 200));
      stroke(color('white'));
      if (avail[i][j])
        fill(rectColor);
      if (avail[i][j] === 2 )
        fill(color("DarkBlue"));
      rect(i*70,j*20, rectX, rectY);
      
      //time labels
      if (i == 0){
        noStroke();
        fill(color('white'));
        text((8+Math.floor((j)/2)) +(j%2 == 1?":30":":00"), i*70 +3,j*20 +6);
      }
      //day labels
      if (j == 0){
        noStroke();
        fill(color('white'));
        text( (today+i) +"/" +myMonth, i*70 +3+rectX/2,j*20 +6);
      }
    }
  }
}

//function that marks a square as available based on mouse location
function toggleAvail(){
  if (mouseX>width-1 || mouseX<0 || mouseY<0 || mouseY>height-1)
      return;
    
    var day = Math.floor((mouseX/width)*7);
    var time = Math.floor((mouseY/height)*32);
    if (day == last[0] && time == last[1])
      return;
    
    if (submited){
      if(avail[day][time] == 1  && checkConsecutive(library[day][time].id)){
        avail[day][time] = 2;
        bookingSequence.push(library[day][time].id); 
      }else if(avail[day][time] == 2){
        avail[day][time] = 1;
        myRemove(bookingSequence, library[day][time].id);
      }
      
      last = [day,time];
      return
    }
  
    avail[day][time] = !avail[day][time];
    last = [day,time];
}

// mouse functionality
function mouseReleased() {
  last = [7,32];
}
function mouseDragged() {
    toggleAvail();
    redraw(); 
}
function mousePressed() {
    toggleAvail();
    redraw(); 
}

function submitAvail(){ 
  submited = true;
  library = mchData['4360'];
  
  // result array to hold results
  // initialized to all false and will get filled with the TRUE & values from useravalibility and library availibility
  var result = Week();
               
  for (var i =0; i<library.length; i++){
    for ( var j =0; j <library[i].length; j++){
      result[i][j] = library[i][j].open && avail[i][j];
      //console.log(library[i][j] && avail[i][j]);
    }
  }
  
  console.log(result);
  avail = result;
  rectColor = color('SeaGreen');
  redraw();
}

// function to make a 24*7 array
function Week(){
  var temp = [[],[],[],[],[],[],[]];
  for (var i =0; i<7;i++){
    for (var j=0;j<32;j++){
      temp[i][j] = false;
    }
  }
  return temp;
}

function checkConsecutive(id){
  console.log(id);
  return bookingSequence.includes(id-1) || bookingSequence.includes(id+1) || bookingSequence.length == 0;
}



//source
//https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
function myRemove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}