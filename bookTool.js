var request = require('request');

function bookMch(endRes, data){
  request.( "http://calendar.library.ucsc.edu/process_roombookings.php?m=booking_full"+data, function (error, response, data) {
    console.log(error);
    console.log(response);
    console.log(data);
  });
}

exports.bookMch = bookMch