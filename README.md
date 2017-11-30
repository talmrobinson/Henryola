// to edit, click markdown
# GroupGit

<- click (logs) to view the output form the scrapped data # HENRYOLA IS #1

# index.js 
index.js can be thought of as our main() and is used to "bootstrap our project" 
so that we can see all that is running to deploy "Henryola".
index calls server.js, router.js and requestHandlers.js with a require 
statement.

The index.js file contains functions which are various requestHandlers

Lastly index.js calls router.js

# server.js
server.js is our code for running our Node.js server.  It follows Node.js 
convention in creating the server and handling requests. The server's purpose
is to parse URLs using the url.parse keyword in Node. URL parse works as 
follows (credit: https://glitch.com/edit/#!/alabaster-beam?path=README.md:1:0. 
* Note this text is refferenced in our style guide as we follow other
conventions presented in this text *)



                                   url.parse(string).query
                                               |
               url.parse(string).pathname      |
                           |                   |
                           |                   |
                         ------ -------------------
    http://localhost:8888/start?foo=bar&hello=world
                                    ---       -----
                                     |          |
                                     |          |
            querystring.parse(string)["foo"]    |
                                                |
                       querystring.parse(string)["hello"]



# availTool / getAvail()
availTool.js contains our code used for scraping the henryola server it consists of the function getAvail() and helper functions that it needs. Essentially uses cheerio to scrape the Mchenry website floor by floor, and return the availible rooms.


	Helper functions:
	
	timeToIndex(time):
		Converts string representing time (representing time of day) to an index for an array
		for the rooms array.

		called by: GetAvail()
				 
	roomAvailibilityArray():
		Constructor for a room availibility array object

	timeSlot():	
		constructor for a time slot object

	addTimeSlot(day, room, time, id):
		adds a timeslot to a room availibility array
		
		called by: GetAvail()	

	printRooms(endRes):
		Prints the scraped data to the server console
		
		called by GetAvail()

	jsonifyRooms():
		puts the room availibility object into a json file

		called by PrintRooms()

# bookTool.js
bookTool.js contains a function, bookMch(), to open a headless browser and execute our room booking function, do_booking(). This headless browers approach was needed to bypass CORS issues when making ajax calls to the UCSC website.

# myAJAXCalls.js
myAJAXCalls.js contains the two functions for making AJAX calls from the UI/Browser. One for telling the server to scrape the data after the UI is loaded, and one for telling the server to book rooms.

# router.js 
router.js routes a request through a path and tells the user if the page can not be found.

# UI.js

# index.html


