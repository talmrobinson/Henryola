var request = require('request');

function bookMch(endRes, data){
  console.log(data);
  // Set the headers
  var headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'http://calendar.library.ucsc.edu',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Referer': 'http://calendar.library.ucsc.edu/booking/mch3',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive'
  }

  // Configure the request
  var options = {
      url: 'http://calendar.library.ucsc.edu/process_roombookings.php?m=booking_full',
      method: 'POST',
      headers: headers,
      form: data
  }

  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          console.log(body)
          endRes.end("" + response);
      }
  })
}

exports.bookMch = bookMch