var request = require('request');

function bookTool(endRes, data){
  //console.log(today+offset);
  request.post("http://calendar.library.ucsc.edu/rooms_acc.php?gid=302&d=2017-11-" +(today+offset)+ "&cap=0", function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log("ERROR from Mch >:(");
      endRes.writeHead(200, {"Content-Type": "text/plain"});
      endRes.write("Hello Book");
      endRes.end();
    }
    
      
  });
}