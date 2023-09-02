const timeDays = require('../Models/timeDayModel');
const days = require('../Models/daysModel');


async function serverFunction(data) {
    console.log("timeDay");

    try {
        // Check if a UserType with the provided userNameType exists
        let myDay= await days.findOne({ DayName: data.Day });

        if (!myDay) {
            // If it doesn't exist, create a new day
            myDay = new days({
                DayName: data.dayName
            });
            await myDay.save();
        }
        // Create a new user with the user type reference
        let myTimeDay = new timeDays({
            Day: myDay._id,
            Start: data.start,
            End: data.end,
            Status:data.status,
        });

        await myTimeDay.save();

        console.log( myTimeDay );
        return myTimeDay;

    } catch (error) {
        return error;
    }
}

async function newTimeDay(req, res) {
    console.log(req.body)
    try {
      const result = await serverFunction(req.body);
      console.log(result)
      res.json(result);
    } catch (error) {
      res.send("Error: " + error.message);
    }
  }
  
  
  const deleteDay = async (req, res) => {
      try {
          const dayName = req.body.DayName; 
          const result = await Days.findOneAndDelete({ DayName: dayName });
  
          if (result) {
              res.send("Day deleted: " + result.DayName);
          } else {
              res.send('Cannot find this day.');
          }
      } catch (error) {
          res.send('Error: ' + error.message);
      }
  }
  


module.exports = {newTimeDay , deleteDay }

