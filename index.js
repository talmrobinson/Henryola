var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/UI.js"] = requestHandlers.UIJS;
handle["/myAJAXCalls.js"] = requestHandlers.AJAXCallsJS;
//handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);