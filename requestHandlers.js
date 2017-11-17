var availTool = require("./availTool");
var fs = require('fs');
    
function start(response) {
  console.log("Request handler 'start' was called.");
  var html = fs.readFileSync('index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
}

function getMch(response) {
  console.log("Request handler 'getMch' was called.");
  response.writeHead(200, {'Content-Type': 'application/json'});
  availTool.getAvail(0, response);
}

function UIJS(response) {
  console.log("Request handler 'UIJS was called.");
  var myJS = fs.readFileSync('UI.js');
  response.writeHead(200, {'Content-Type': 'text/javascript'});
  response.end(myJS);
}

function AJAXCallsJS(response) {
  console.log("Request handler 'AJAXCallsJS' was called.");
  var myJS = fs.readFileSync('myAJAXCalls.js');
  response.writeHead(200, {'Content-Type': 'text/javascript'});
  response.end(myJS);
}
    
function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}
    
exports.start = start;
exports.getMch = getMch;
exports.UIJS = UIJS;
exports.AJAXCallsJS = AJAXCallsJS;
exports.upload = upload;