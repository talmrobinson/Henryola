         

var Horseman = require("node-horseman");
var horseman = new Horseman();

function bookMch(endRes, params){
  horseman.open('http://calendar.library.ucsc.edu/booking/mch4')
  .wait(6000)
  .evaluate(function(params) {
    // this is the AJAX HTTP POST CALL that tries to connect to the McH server and book the room
    // $ means im using the jQuery library and ajax() is their function for making http calls
    $.ajax({
      type: "POST", //type of HTTP call.. there are more just google HTTP call types
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
        horseman.close();
      }, 
      dataType: "json" // the format of the returned file 
    });
	  return false; // return value is unimportant as of right now
  }, params );
  
  endRes.writeHead(200, {"Content-Type": "text/plain"});
  endRes.write("Booking Room");
  endRes.end();
  console.log(params);
  
  
}
exports.bookMch = bookMch

