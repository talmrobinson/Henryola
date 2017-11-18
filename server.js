var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    //parse get request paramters
    var data = url.parse(request.url, true).query;
    
    //parse pathname
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    
    route(handle, pathname, response, data);
  }

  http.createServer(onRequest).listen(process.env.PORT);
  console.log("Server has started.");
}

exports.start = start;