$.ajax({
  type: "GET", //type of HTTP call.. there are more just google HTTP call types
  url: "https://dune-mandolin.glitch.me/getMch", // the server to connect to 
  success: function(data) {
			/*error*/
			if (data.status === 1) {
              console.log("Error");
				/*data recieved*/
			} else if (data.status === 2) {
        var mchAvail= JSON.parse(data)
        console.log("Success!");
        console.log(mchAvail);
			}
		},
  dataType: "json" // the format of the returned file 
});