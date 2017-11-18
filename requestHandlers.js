var availTool = require("./availTool");
var bookTool = require("./bookTool");
var fs = require('fs');
    
function start(response, data) {
  console.log("Request handler 'start' was called.");
  var html = fs.readFileSync('index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
}

function getMch(response, data) {
  console.log("Request handler 'getMch' was called.");
  response.writeHead(200, {'Content-Type': 'application/json'});
  availTool.getAvail(0, response);
}

function UIJS(response, data) {
  console.log("Request handler 'UIJS was called.");
  var myJS = fs.readFileSync('UI.js');
  response.writeHead(200, {'Content-Type': 'text/javascript'});
  response.end(myJS);
}

function AJAXCallsJS(response, data) {
  console.log("Request handler 'AJAXCallsJS' was called.");
  var myJS = fs.readFileSync('myAJAXCalls.js');
  response.writeHead(200, {'Content-Type': 'text/javascript'});
  response.end(myJS);
}

function bookMch(response, data) {
  console.log("Request handler 'bookMch' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Book");
  response.end();
}

    
function upload(response, data) {
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
exports.bookMch = bookMch;