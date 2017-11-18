var mchData;
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
  do_booking(IDList);
  
  $.ajax({
  type: "POST", //type of HTTP call.. there are more just google HTTP call types
  url: "https://dune-mandolin.glitch.me/bookMch", // the server to connect to 
  success: function(data) {
        console.log("Booking Success!");
        console.log(data);
		},
  dataType: "json" // the format of the returned file 
});

  
}