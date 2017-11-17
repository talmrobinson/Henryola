var availTool = require("./availTool");
var fs = require('fs');
    
function start(response) {
  console.log("Request handler 'start' was called.");
  var html = fs.readFileSync('index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
  
  
  //availTool.getAvail(0, response);
}

function UI(response) {
  console.log("Request handler 'start' was called.");
  var html = fs.readFileSync('index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
  
  
  //availTool.getAvail(0, response);
}
    
function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}
    
exports.start = start;
exports.UI = UI;
exports.upload = upload;