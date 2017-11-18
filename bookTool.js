     

var Horseman = require("node-horseman");
var horseman = new Horseman();

function bookMch(endRes, data){
  horseman
  .open('http://calendar.library.ucsc.edu/booking/mch4')
  //.do(function(done){setTimeout(done,6000);})
  .evaluate(do_booking(), data )
	horseman.close();
  
  endRes.writeHead(200, {"Content-Type": "text/plain"});
  endRes.write("Hello Book");
  endRes.end();
  console.log(data);
  
  
}
exports.bookMch = bookMch


function do_booking(params) {
  // this is the AJAX HTTP POST CALL that tries to connect to the McH server and book the room
  // $ means im using the jQuery library and ajax() is their function for making http calls
  // most different 
  $.ajax({
  type: "POST", //type of HTTP call.. there are more just google HTTP call types
    //headers: headers1, I removed this line because it was throwing lots of errors when we try to use the false origin headers
  url: "http://calendar.library.ucsc.edu/process_roombookings.php?m=booking_full", // the server to connect to 
  crossDomain: true, // this just signifies that the origin of the http call is coming from a different server than the destination
  data: jQuery.param(params), // this is the data to be sent with the call, jquery.param() formats 'parameters' into something nice
  success: function(data) {
			/*error*/
			if (data.status === 1) {
              console.log("Error Email");
				errorAlert(data.msg);

				/*Mediation, Tentative or Confirmed*/
			} else if (data.status === 2) {
                console.log("Success!");
			}
		}, // this is the callback function that should be called after the request is sent and processed by the server 
           // 'data' is the information that is sent back to us by the server (nothing happens cause the request is rejected as of now)
  dataType: "json" // the format of the returned file 
});
	return false; // return value is unimportant as of right now
}

