# Weather Dashboard
A calendar that tracks your schedule during the work day

## Description
This weather dashbaord was made to provide the current weather and five day forecast for the city of your choosing. 

## Installation
N/A

## Usage
This work day schedule has a simple design with a header at the top that displays the title and date. 

![picture of full website. There is a title at the top with the date and time blocks from 9am-5pm with text boxes that allow you to enter information. ](assets/images/Work-day-scheduler.png)

Below the title is the actual work schedule calendar. It contains time blocks from 9am-5pm to account for the typical work day. Within each time block, there is a text box and a save button. If you enter information into the text box and hit the save button that corresponds to the text box, then that text will be saved into local storage. That means you can refresh the webpage and still see this saved information. In the below picture, "hello" has been entered into the 9am time block and is saved to local storage.

![picture of the title and time blocks down to 12pm. "hello" is entered into the 9am time block.](assets/images/work-day-saved.png)

One final feature of this website is the color-coded time blocks. In this instance, a gray background means that this time-period is in the past; a red background means this time period is in the present; and a green background means the time-period is in the future. In the above picture, you will notice that 11am is in red. This is because the picture was taken at approximately 11:10am. Once the clock shifts to 12pm, then the 11am time block will become gray and the 12pm time block will turn red. All of the times after 12pm will still be green since they are still in the "future". 

Below is a link to the active website:

https://jacone626.github.io/work-day-scheduler/

## Credits
https://www.tutorialrepublic.com/faq/how-to-convert-a-unix-timestamp-to-time-in-javascript.php

https://stackoverflow.com/questions/11858458/jquery-alert-onclick-on-elements-child

## License
Please refer to the license in the repo.


