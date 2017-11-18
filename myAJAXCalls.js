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

function do_booking(sidList) {
  // the following values are usually pulled from the form after selecting a room
  // on the McH website, each  clickable square has an associated 9digit number, or SID, associated with it
  // when multiple squares are selected '%7C' ('|' in UTF-8) is inserted between the values
  // for example  567075885|567075886|567075887|567075888
  var parameters = {
    "sid" : sidList, //room id
    "tc": "done", // no idea but this value is always the same
    "gid" : "302", // value for the floor
    "fname" : "Tal", // first name
    "lname" : "Robinson", // last name
    "email" : "tamarobi@ucsc.edu", //email address
    "nick" : "cs", // group name
    "q1" : "Undergraduate student", // type of student 
    "q2" : "Study for a class", // reason for booking room
    "qcount" : "2", // no idea but this value is always the same
    "fid" : "108" // no idea but this value is always the same
  };
  
  console.log(parameters); // this prints the code to the browsers javascript console 
  
  
  // this is the AJAX HTTP POST CALL that tries to connect to the McH server and book the room
  // $ means im using the jQuery library and ajax() is their function for making http calls
  // most different 
  $.ajax({
  type: "POST", //type of HTTP call.. there are more just google HTTP call types
    //headers: headers1, I removed this line because it was throwing lots of errors when we try to use the false origin headers
  url: "https://calendar.library.ucsc.edu/process_roombookings.php?m=booking_full", // the server to connect to 
  crossDomain: true, // this just signifies that the origin of the http call is coming from a different server than the destination
  data: jQuery.param(parameters), // this is the data to be sent with the call, jquery.param() formats 'parameters' into something nice
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