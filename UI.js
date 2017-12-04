var last = [7,32];
var andAvail= Week();
var usrAvail = Week();
var library;
var today = new Date();
var myMonth = today.getMonth();
console.log(myMonth);
today = today.getDate();
var weekday = ['S','M','T','W','T','F','S'];
var days = [];
for (var i = 0; i <7;i++){
  var temp = new Date()
  temp.setDate(temp.getDate()+i)
  days.push(weekday[ temp.getDay() ]+' '+(myMonth+1)+"/"+(today+i));
}
var rectX = 40;
var rectY = 15;
var rectColor;
var submitted = false;
var bookingSequence = [];
var focusedRoom = '4360';
var userColor;
var availColor;
var bookColor;
var columnOffset = 50;
var rowOffset = 15;

var s = function( p ) {
  p.setup = function() {
    p.createCanvas(280 +columnOffset, 480 +rowOffset);
    p.textFont("Montserrat");

    p.textAlign(p.LEFT, p.TOP);
    p.noLoop();
    userColor = p.color('#6398F3');
  }

  // this function is called after the mouse is clicked/dragged or the submit button is pressed
  p.draw = function() {
    p.noStroke();
    p.fill(p.color(255));
    p.rect(0,0,p.width,p.height);

    p.fill(p.color('#CCC'));
    p.rect(columnOffset,rowOffset,p.width,p.height);

    // draw week
    for (var i =0; i<7; i++){
      for ( var j =0; j <32; j++){
        var xLoc =i*(p.width-columnOffset)/7 +columnOffset;
        var yLoc =j*(p.height-rowOffset)/32 +rowOffset;

        if (usrAvail[i][j]){
          p.fill(userColor);
          p.rect(xLoc, yLoc,rectX, rectY); 
        }

        //time labels
        if (i == 0 && j%2==0){
          p.fill(p.color('#666'));
          p.text((8+Math.floor((j)/2)) -(j>8?12:0) +(j%2 == 1?":30":":00"), 0 +3,j*(p.height-rowOffset)/32 +rowOffset +3);
        }
        ////day labels
        if (j == 0){
          p.textSize(10);
          p.fill(p.color('#666'));
          p.text( days[i], i*(p.width-columnOffset)/7 +columnOffset +2, 0 +6);
          p.textSize(12);
        }
      }
    }
    //draw grid
    p.stroke(p.color('white'));
    for (var i =0; i<7; i++){
      p.line(i*(p.width-columnOffset)/7 +columnOffset,rowOffset,i*(p.width-columnOffset)/7 +columnOffset,p.height);
    }
    for ( var j =0; j <32; j++){
      p.line(columnOffset,(p.height-rowOffset)*j/32 +rowOffset,p.width,(p.height-rowOffset)*j/32 +rowOffset);
    }
  }

  // mouse functionality
  p.mouseReleased = function() {
    last = [7,32];
  }
  p.mouseDragged = function() {
      if(toggleTimeSlot(p.mouseX,p.mouseY, 'step1'))
        p.redraw();
  }
  p.mousePressed = function() {
      if(toggleTimeSlot(p.mouseX,p.mouseY, 'step1'))
        p.redraw();
  }
}
var myp51 = new p5(s, 'c1');


var t = function( p ) {
  p.setup = function() {
    p.createCanvas(280 +columnOffset, 480 +rowOffset);
    p.textFont("Montserrat");

    p.textAlign(p.LEFT, p.TOP);
    p.noLoop();
    availColor = p.color('#B5A0F7');
    bookColor = p.color('#6398f3');
  }

  // this function is called after the mouse is clicked/dragged or the submit button is pressed
  p.draw = function() {
    p.noStroke();
    p.fill(p.color(255));
    p.rect(0,0,p.width,p.height);

    p.fill(p.color('#CCC'));
    p.rect(columnOffset,rowOffset,p.width,p.height);

    // draw week
    for (var i =0; i<7; i++){
      for ( var j =0; j <32; j++){
        var xLoc =i*(p.width-columnOffset)/7 +columnOffset;
        var yLoc =j*(p.height-rowOffset)/32 +rowOffset;

        if (submitted){
          if (andAvail[i][j] == 2){
            p.fill(bookColor);
            p.rect(xLoc, yLoc,rectX, rectY); 
          }
          if (andAvail[i][j] == 1){
            p.fill(availColor);
            p.rect(xLoc, yLoc,rectX, rectY); 
          }
        }

        //time labels
        if (i == 0 && j%2==0){
          p.fill(p.color('#666'));
          p.text((8+Math.floor((j)/2)) -(j>8?12:0) +(j%2 == 1?":30":":00"), 0 +3,j*(p.height-rowOffset)/32 +rowOffset +3);
        }
        ////day labels
        if (j == 0){
          p.textSize(10);
          p.fill(p.color('#666'));
          p.text( days[i], i*(p.width-columnOffset)/7 +columnOffset +2, 0 +6);
          p.textSize(12);
        }
      }
    }
    //draw grid
    p.stroke(p.color('white'));
    for (var i =0; i<7; i++){
      p.line(i*(p.width-columnOffset)/7 +columnOffset,rowOffset,i*(p.width-columnOffset)/7 +columnOffset,p.height);
    }
    for ( var j =0; j <32; j++){
      p.line(columnOffset,(p.height-rowOffset)*j/32 +rowOffset,p.width,(p.height-rowOffset)*j/32 +rowOffset);
    }
  }

  // mouse functionality
  p.mouseReleased = function() {
    last = [7,32];
  }
  p.mouseDragged = function() {
      if(toggleTimeSlot(p.mouseX,p.mouseY, 'step2'))
        p.redraw();
  }
  p.mousePressed = function() {
      if(toggleTimeSlot(p.mouseX,p.mouseY, 'step2'))
        p.redraw();
  }
}
var myp52 = new p5(t, 'c2');


function submitAvail(){
  submitted = true;
  andAvails();
  bookingSequence = [];
  myp52.redraw();
}

//function that marks a square as available based on mouse location
function toggleTimeSlot(mouseX, mouseY, step){
  if (mouseX>330-1 || mouseX<columnOffset || mouseY<rowOffset || mouseY>495-1)
      return false;
    
    var day = Math.floor( ( (mouseX-columnOffset)/280 ) *7 );
    var time =Math.floor( ( (mouseY-rowOffset)/480 ) *32 );
    if (day == last[0] && time == last[1])
      return false;
    
    if ( step == 'step2' && submitted){
      if(andAvail[day][time] == 1  && checkValidTimeSlot(Number(library[day][time].id))){
        andAvail[day][time] = 2;
        bookingSequence.push(Number(library[day][time].id)); 
        
      }else if(andAvail[day][time] == 2){
        andAvail[day][time] = 1;
        myRemove(bookingSequence, Number(library[day][time].id));
      }
      last = [day,time] 
      return true;
    }
    usrAvail[day][time] = !usrAvail[day][time];
    last = [day,time];
    return true;
}

function andAvails(){
  library = mchData[focusedRoom];
  
  // result array to hold results
  // initialized to all false and will get filled with the TRUE & values from useravalibility and library availibility
  var result = Week();
               
  for (var i =0; i<library.length; i++){
    for ( var j =0; j <library[i].length; j++){
      result[i][j] = library[i][j].open && usrAvail[i][j];
      //console.log(library[i][j] && avail[i][j]);
    }
  }
  
  console.log(result);
  andAvail = result;
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

function checkValidTimeSlot(id){
  console.log(id);
  if (bookingSequence.length >= 8)
    return false
  
  return true
  //return bookingSequence.includes(id-1) || bookingSequence.includes(id+1) || bookingSequence.length == 0 ;
}

function roomSelect(value){
  focusedRoom = value;
  if (submitted){
    andAvails();
    myp52.redraw();
  }
}

//source
//https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
function myRemove(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
        array.splice(index, 1);
    }
}

//Function that books a lucky room for a lucky student
function imFeelingLucky(){
  var library = mchData[focusedRoom];
  var room_id; 
  //loop through and save the first available room
  //Exit loop when you find it
  for(var i = 0; i < 7; i++){
    for(var j=0; j < 32; j++){       
      if (library[i][j].open == true){
        room_id = library[i][j].id;
        i = 7;
        j = 32;
      }
    }
  }
  
   bookingSequence = [room_id];
   bookRooms();
}
