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
*Note this text is referenced in our style guide as we follow other
conventions presented in this text*)



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


# router.js
router.js takes parsed strings from the server and uses them as keys to access functions in the handler.

# availTool / getAvail()
availTool.js contains our code used for scraping the Henryola server it consists of the function getAvail() and helper functions that it needs. Essentially uses cheerio to scrape the Mchenry website floor by floor, and return the availible rooms.

# bookTool.js
bookTool.js contains a function, bookMch(), to open a headless browser and execute our room booking function, do_booking(). This headless browers approach was needed to bypass CORS issues when making ajax calls to the UCSC website.

# myAJAXCalls.js
myAJAXCalls.js contains the two functions for making AJAX calls from the UI/Browser. One for telling the server to scrape the data after the UI is loaded, and one for telling the server to book rooms.

# multistep.js
multistep.js contains the javascript code that adds the multistep functionality to the Henryola UI. (The code is adapted from https://codepen.io/designify-me/pen/qrJWpG.)

# requestHandlers.js
requestHandlers.js contains the code to get data from the McHenry website. The function, start(), uses index.html to request the data. The function getMch() grabs the data from the McHenry website. The function UIJS() uses UI.js to send the data to the UI. The function getCSS() uses style.css to print out the data onto the website. getMS() uses multistep.js to display the data onto a multistep platform. AJAXCallsJS() uses myAJAXCalls.js to tell the server to book rooms. bookMch() allows the user to book the rooms. docs() uses docs.html to convert the website to be able to fit different screen sizes.

# UI.js
UI.js contains the code to create the table to book the rooms and allow the user to drag down the cursor to fill in appropriate times. The function submitAvail() allows the user to submit available times by using the provided table. toggleTimeSlot() contains the code to allow the user to use their cursor to click on the boxes in the table. andAvails() contains the code to compare between the available times for the rooms in McHenry and the times that the user inputted earlier. Week() displays the entire week on the table. checkValidTimeSlot() contains the code to display the results from andAvails() onto the table. roomSelect() has the code to allow the user to select the rooms at the times that are available. myRemove() has the code to remove the rooms at the time that the user does not want to book.
