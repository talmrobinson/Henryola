//var phantom = require('phantom');

function bookMch(endRes, data){
  endRes.writeHead(200, {"Content-Type": "text/plain"});
  endRes.write("Hello Book");
  endRes.end();
  console.log(data);
  
  
}

exports.bookMch = bookMch