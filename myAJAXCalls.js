var mchData;
// initial call to grab room data in background while the user is setting there preferences
$.ajax({
  type: "GET", //type of HTTP call.. there are more just google HTTP call types
  url: "https://dune-mandolin.glitch.me/getMch", // the server to connect to 
  success: function(data) {
        console.log("Success!");
        console.log(data);
        mchData = data;
		},
  dataType: "json" // the format of the returned file 
});


function bookRooms(){
  var IDList = "";
  bookingSequence.sort();
  
  for( var i=0; i<bookingSequence.length; i++){
    IDList += bookingSequence[i];
    if(i <bookingSequence.length-1)
      IDList +="|";
  }
  console.log(IDList);
  
  var parameters = {
    "sid" : IDList, //room id
    "tc": "done", // no idea but this value is always the same
    "gid" : "302", // floor id
    "fname" : "Tal", // first name
    "lname" : "Robinson", // last name
    "email" : "tamarobi@ucsc.edu", //email address
    "nick" : "cs", // group name
    "q1" : "Undergraduate student", // type of student 
    "q2" : "Study for a class", // reason for booking room
    "qcount" : "2", // no idea but this value is always the same
    "fid" : "108" // no idea but this value is always the same
  };
  
  $.post('https://dune-mandolin.glitch.me/bookMch', parameters, 
    function(returnedData){
         console.log(returnedData);
    });
}