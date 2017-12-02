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

function getCSS(response, data) {
  console.log("Request handler 'getCSS( was called.");
  var myJS = fs.readFileSync('style.css');
  response.writeHead(200, {'Content-Type': 'text/css'});
  response.end(myJS);
}

function getMS(response, data) {
  console.log("Request handler 'getMS was called.");
  var myJS = fs.readFileSync('multistep.js');
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
  bookTool.bookMch(response,data);
}

function docs(response, data) {
  console.log("Request handler 'docs' was called.");
  var html = fs.readFileSync('docs.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
}

    
exports.start = start;
exports.getMch = getMch;
exports.UIJS = UIJS;
exports.getCSS = getCSS;
exports.getMS = getMS;
exports.AJAXCallsJS = AJAXCallsJS;
exports.bookMch = bookMch;
exports.docs = docs;