# dailyPlanner_HW5
Title: Daily Planner \
Developer: Zackery Arsement \
Deployment Date:  1/13/2022 \
For:  UT JavaScript Coding Bootcamp \
Published: GitHub <https://github.com/ZackeryArsement/dailyPlanner_HW5> \
Published: Webpage <https://zackeryarsement.github.io/dailyPlanner_HW5/> \
Built with: HTML, CSS, Javascript, Bootstrap, Jquery


# Summary: 

![Coding Quiz](https://zackeryarsement.github.io/dailyPlanner_HW5/assets/images/dailyPlanner.png)

The daily planner allows you to input a 'to-do list' for any given day! \
You can save your input by clicking the corresponding button on the right side of each hour. \
If you refresh the page, your list will still be there! \
The planner keeps track of what time it is to let you know if you have already passed your to-do time.

![Coding Quiz](https://zackeryarsement.github.io/dailyPlanner_HW5/assets/images/dailyPlanner.gif)

# Development:

This webpage utilizes both the 'moment()' method and the windows local storage. The webpage starts up by creating an array of time values from 9AM to 5PM. There is then a 'for loop' ran that creates nine input segments, each corresponding to a time value. A repeating function is then put into place to check every minute if the time has passed a new hour. If the time has passed a new hour then the code changes the color of the inputs in order to match the desired color pattern: gray means the hour has already passed, red means you are within that specific hour, and green means that that hour has not yet came.

When the user presses the save button on the right side of the input segment then the code will save the input value into local storage and display the word 'Saved' onto the button. On start up, when the input segments are being created, the code will put the locally saved input value into the corresponding input segment. The button will also keep its displayed 'Saved' text. If you attempt to save an input segment that contains no text then nothing happens. Furthermore, if you refresh the page and you have a saved segment that does not contain text anymore then that button will lose its 'save' status.