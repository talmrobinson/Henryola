var request = require('request');

function bookMch(endRes, data){
  request.post( {url:'http://calendar.library.ucsc.edu/process_roombookings.php?m=booking_full&', form:data}, function (error, response, data) {
    endRes = response;
  });
}

exports.bookMch = bookMch