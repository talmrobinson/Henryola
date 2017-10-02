# The Node Beginner Book: Non-blocking Request Handlers

## 11. Responding request handlers with non-blocking operations - continued

I've just used the phrase "the right way". Dangerous stuff. Quite
often, there is no single "right way".

But one possible solution for this is, as often with Node.js, to pass
functions around. Let's examine this.

Right now, our application is able to transport the content (which the
request handlers would like to display to the user) from the request
handlers to the HTTP server by returning it up through the layers of the
application (request handler -&gt; router -&gt; server).

Our new approach is as follows: instead of bringing the content to the
server, we will bring the server to the content. To be more precise, we
will inject the *response* object (from our server's callback function
*onRequest()*) through the router into the request handlers. The
handlers will then be able to use this object's functions to respond to
requests themselves.

Enough explanation, here is the step by step recipe on how to change our
application.

Let's start with our *server.js*\:

    var http = require("http");
    var url = require("url");
    function start(route, handle) {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response);
      }
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
    exports.start = start;

Instead of expecting a return value from the *route()* function, we pass
it a third parameter, our *response* object. Furthermore, we removed any
*response* method calls from the *onRequest()* handler, because we now
expect *route* to take care of that.

Next comes *router.js*\:

    function route(handle, pathname, response) {
      console.log("About to route a request for " + pathname);
      if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
      } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
      }
    }
    exports.route = route;

Same pattern: instead of expecting a return value from our request
handlers, we pass the *respond* object on.

If no request handler can be used, we now take care of responding with a
proper "404" header and body ourselves.

And last but not least, we've modified *requestHandlers.js*\:

    var exec = require("child_process").exec;
    function start(response) {
      console.log("Request handler 'start' was called.");
      exec("ls -lah", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
      });
    }
    function upload(response) {
      console.log("Request handler 'upload' was called.");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello Upload");
      response.end();
    }
    exports.start = start;
    exports.upload = upload;


Our handler functions need to accept the response parameter, and have to
make use of them in order to respond to the request directly.

The *start* handler will respond from within the anonymous *exec()*
callback, and the *upload* handler still simply replies with "Hello
Upload", but now by making use of the *response* object.

If we click `'Show'`, this should work as expected.

If you would like to prove that an expensive operation behind */start*
will no longer block requests for */upload* from answering immediately,
then modify the *requestHandlers.js* code as follows:

    var exec = require("child_process").exec;
    function start(response) {
      console.log("Request handler 'start' was called.");
      exec("find /",
        { timeout: 10000, maxBuffer: 20000*1024 },
        function (error, stdout, stderr) {
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write(stdout);
          response.end();
        });
    }
    function upload(response) {
      console.log("Request handler 'upload' was called.");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello Upload");
      response.end();
    }
    exports.start = start;
    exports.upload = upload;

This will make HTTP requests to /start take at least 10 seconds, but requests to /upload will be answered immediately, even if /start is still computing.

<a href="https://glitch.com/edit/#!/remix/NodeBeginner12/db0f0e00-275a-419c-8276-43fa42046563" target="_blank">>> Go to the next part</a>.


# License
The Node Beginner Book (C) Manuel Kiessling
[Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](https://creativecommons.org/licenses/by-nc-sa/3.0/). Some small text changes have been made to the original to make sense on Glitch.
