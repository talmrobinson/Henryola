$.ajax({
  type: "GET", //type of HTTP call.. there are more just google HTTP call types
  url: "https://dune-mandolin.glitch.me/getMch", // the server to connect to 
  success: function(data) {
        console.log("Success!");
        console.log(data);
		},
  dataType: "json" // the format of the returned file 
});