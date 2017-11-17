var request = require('request');
var cheerio = require('cheerio');

var roomNumbers = [];
var rooms = [ [],[],[],[],[],[],[] ];
var today = new Date();
today = today.getDate();


function getAvail(offset, endRes) {
  //console.log(today+offset);
  request("http://calendar.library.ucsc.edu/rooms_acc.php?gid=302&d=2017-11-" +(today+offset)+ "&cap=0", function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //console.log(html);
    }
    $ = cheerio.load(html);
  
    //grab rooms
    $('legend').each(function(i, elem1) {
      if ($(this).children().text()[0] =='M'){ // only act on 'legend' items that are for rooms
        var room = $(this).children().text();
        //console.log( "Room: "+ room); //room name
        
        //parse room number so it can be used as array index
        room = room.substring(3, room.length);
        var n = room.indexOf(' ');
        room = room.substring(0, n != -1 ? n : room.length); //trim excess info from room
        
        //grab available rooms slots
        $(this).nextAll('.checkbox').each(function(j, elem2) {
          var id = $(elem2).children().children().attr("value"); //timeslot id
          var time = $(elem2).children().text().trim(); //time
          var n = time.indexOf(' ');
          time = time.substring(0, n != -1 ? n : time.length); //trim excess info from time
          //console.log("  ID: "+ id+ " Time: "+  time +" Index: " + timeToIndex(time) );
          time = timeToIndex(time);
          
          addTimeSlot(offset, room, time, id);
        });
      }
    });
    
    if (offset<6)
      return getAvail(offset+1, endRes);
    else{
      return printRooms(endRes);
    }
      
  });
}


function timeToIndex(time){
  var t = time;
  
  switch(t) {
    case "8:00am":
        return 0
        break;
    case "8:30am":
        return 1
        break;
    case "9:00am":
        return 2
        break;
    case "9:30am":
        return 3
        break;
    case "10:00am":
        return 4
        break;
    case "10:30am":
        return 5
        break;
    case "11:00am":
        return 6
        break;
    case "11:30am":
        return 7
        break;
    case "12:00pm":
        return 8
        break;
    case "12:30pm":
        return 9
        break;
    case "1:00pm":
        return 10
        break;
    case "1:30pm":
        return 11
        break;
    case "2:00pm":
        return 12
        break;
    case "2:30pm":
        return 13
        break;
    case "3:00pm":
        return 14
        break;
    case "3:30pm":
        return 15
        break;
    case "4:00pm":
        return 16
        break;
    case "4:30pm":
        return 17
        break;
    case "5:00pm":
        return 18
        break;
    case "5:30pm":
        return 19
        break;
    case "6:00pm":
        return 20
        break;
    case "6:30pm":
        return 21
        break;
    case "7:00pm":
        return 22
        break;
    case "7:30pm":
        return 23
        break;
    case "8:00pm":
        return 24
        break;
    case "8:30pm":
        return 25
        break;
    case "9:00pm":
        return 26
        break;
    case "9:30pm":
        return 27
        break;
    case "10:00pm":
        return 28
        break;
    case "10:30pm":
        return 29
        break;
    case "11:00pm":
        return 30
        break;
    case "11:30pm":
        return 31
        break;
  }
}

function roomAvailibilityArray(){
  var temp = new Array(32);
  temp.fill( new timeSlot() );
  
  return temp
}

function timeSlot(){
  this.id = 0;
  this.open = false;
}

function addTimeSlot(day, room, time, id){
  var temp = new timeSlot();
  temp.id = id;
  temp.open = true;
  

  if (roomNumbers.indexOf(Number(room)) === -1 ){
    roomNumbers.push(Number(room));
    for(var i=0;i<7;i++){
      rooms[i][Number(room)] = new roomAvailibilityArray();
    }
  }
   //console.log(day);
  rooms[day][Number(room)][time] = temp; 
}

//printing function
function printRooms(endRes){
  var output = "";
  for(var i=0;i<rooms.length;i++){
    output += today+i + "<br>";
    console.log(today+i);
    for(var j=0; j < roomNumbers.length;j++){
        var temp ="";
        for(var k=0;k<32;k++){
         temp+=( rooms[i][roomNumbers[j]][k].open ==true? '✅':'❌');  
        }
        console.log(temp + " " + roomNumbers[j]);
      output += temp + " " + roomNumbers[j] + "<br>";
    }
  }
    endRes.writeHead(200, {"Content-Type": "application/json"});
    endRes.write(JSON.stringify( jsonifyRooms() ));
    endRes.end();
  
  return jsonifyRooms();
}


exports.getAvail = getAvail;

// converts the rooms array into a JSON object that has data objects where the keys are the room numbers
// and the objects themselves are 7*32 arrays where each index has a room ID and a T/F value
function jsonifyRooms(){
  var tempRooms = {};
  
  for(var j=0; j < roomNumbers.length;j++){
    var temp = [];
    for(var i=0;i<rooms.length;i++){
        temp.push( rooms[i][roomNumbers[j]] ); 
    }
    tempRooms[roomNumbers[j].toString()] = temp;
  }
  
  return tempRooms;
}