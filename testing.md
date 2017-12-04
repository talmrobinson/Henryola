# UI.js
  **User input:**
    User input testing is performed by first entering the henryolla website and  entering your user availability when prompted. The data storing your availability is then automatically output to the console. The data can then be manually verified by viewing the console, and making sure the data matches the availibility you entered.
    
  **McHenry availability scraping:**
    After McHenry's availability is scraped it is automatically output to the console. This can be verified by viewing the scraped mchenry availability on the console, and checking it against the official mchenry availability on mchenrys website.
    
  **Intersection of user & McHenry availability:**
    After Both user & McHenry availability is obtained, the intersection of these two sets is determined to give prospective times for the user to book. This information is then output to the console. By viewing the console, this information can be verified.

# availTools.js
  availtools.js() testing occurs by outputting to both the browser, and serverside console. On the browser side, the json object representing the scraped data from mchenry is output. This is the same verification that occurs in UI.js "mchenry availibility scraping". A visual representation is also ouput to the serverside console, which can be viewed with the "logs" button on glitch.

# bookTool.js
  bookTool.js handles our booking. The headless request as well as the validity of the data being sent to mchenrys server is tested implicitly as we are receiving confirmation emails from mchenry that room bookings occur. 
  
# index.html & multiStep.js & style.css
  index.html, multistep.js, and style.css are tested implicitly when the website is used. If the layout of the website is as intededed than index.html is considered functional.

# Server backend
  index.js, server.js, router.js, requestHandlers.js all make up our webapps backend.
  
  **index.js & server.js**
    index.js & server.js is tested by checking if the console displays whether or not the server is on. If the server is on, index.js is functioning as intended.
    
  **router.js**
    If correct page is loaded for each URL, then router.js is functional. 
    404 should be displayed on incorrect URL's.  
    
# myAJAXCalls.js
  This is tested implicitly when other systems works. Since all it does is call the get available rooms from availTools.js and then book the room, if the confirmation email is received, myAJAXCalls.js is functioning.
  

# Overall System Tests
User info / Stage 1 input test
![Alt Text](https://cdn.glitch.com/17ee9678-98ed-4865-8048-2478b43e166b%2FScreen%20Shot%202017-12-03%20at%2020.35.35.jpeg?1512364277742)

Room Selection & Booking / Stage 2 input test
![Alt Test](https://cdn.glitch.com/17ee9678-98ed-4865-8048-2478b43e166b%2FScreen%20Shot%202017-12-03%20at%2020.36.04.jpeg?1512364282839)
  