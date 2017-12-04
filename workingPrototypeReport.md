Working Prototype Known Problems Report

Henryola
Sahithi Narla, Kevin Crum, Richard Kiefer, Tal Robinson
December 3, 2017

Known Problems with the Software:
UI for Availability & Book Canvas Table:
  On mobile:
    Canvas does not render symmetrically on small mobile devices
    In order to scroll around on the map, the thumb will touch cells and mark them as selected when the user could just be      scrolling.
  On large browser:
    Not necessarily a bug but when mouse dragging over cells on the canvas, the cursor can move too fast and the cells will   not be selected as smoothly.
Docs.html
  On mobile:
    The responsiveness is really ugly.  Due to adding padding to the text body, the text is in one narrow column.  
Index.html
    Success message will appear despite a false email address being entered.
    We check if user entered all fields in the Name, Email etc page.  
    We check if the user entered an email address has @ucsc.edu
    We check if the user actually selects at least one slot to book
    But there does not exist a feature to check if the User’s email address is real.  This is considered a bug because the page says the words “Success!\n Check your email to confirm booking”, and the use of the word success implies that the booking was successful which is not the case.
