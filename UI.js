var cnv;  
var last = [7,32];
var avail= Week();
var usrAvail;
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
var focusedRoom = '4360';

function setup() {
  cnv = createCanvas(490, 640);
 
  // Move the canvas so it's inside our <div id="sketch-holder">.
  cnv.parent('sketch-holder');
  frameRate(12);
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
  
  //draw crosshair
  if (mouseX>width-1 || mouseX<0 || mouseY<0 || mouseY>height-1)
    return
    
  fill(color(255,255,255,127));
  rect(0,Math.floor((mouseY/height)*32)*rectY, width, rectY  );
  
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
      if(avail[day][time] == 1  && checkValidTimeSlot(Number(library[day][time].id))){
        avail[day][time] = 2;
        bookingSequence.push(Number(library[day][time].id)); 
        
      }else if(avail[day][time] == 2){
        avail[day][time] = 1;
        myRemove(bookingSequence, Number(library[day][time].id));
      }
      
      last = [day,time];
      
      redraw(); 
      return
    }
  
    avail[day][time] = !avail[day][time];
    last = [day,time];
  redraw(); 
}

// mouse functionality
function mouseReleased() {
  last = [7,32];
}
function mouseDragged() {
  
    toggleAvail(); 
}
function mousePressed() {
    toggleAvail();
}

function submitAvail(){ 
  usrAvail = avail;
  
  andAvails();
}

function andAvails(){}

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

function checkValidTimeSlot(id){
  console.log(id);
  if (bookingSequence.length >= 8)
    return false
  
  return true
  //return bookingSequence.includes(id-1) || bookingSequence.includes(id+1) || bookingSequence.length == 0 ;
}

function roomSelect(value){
  focusedRoom = value;
  
}



//source
//https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
function myRemove(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
        array.splice(index, 1);
    }
}