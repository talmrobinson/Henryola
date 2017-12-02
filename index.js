var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/UI.js"] = requestHandlers.UIJS;
handle["/multistep.js"] = requestHandlers.getMS;
handle["/style.css"] = requestHandlers.getCSS;
handle["/myAJAXCalls.js"] = requestHandlers.AJAXCallsJS;
handle["/getMch"] = requestHandlers.getMch;
handle["/bookMch"] = requestHandlers.bookMch;
handle["/docs"] = requestHandlers.docs;


server.start(router.route, handle);