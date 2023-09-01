const timeDays = require('../Models/timeDayModel');
const days = require('../Models/daysModel');


async function serverFunction(data) {
    console.log("timeDay");

    try {
        // Check if a UserType with the provided userNameType exists
        let myDay= await days.findOne({ DayName: data.dayName });

        if (!myDay) {
            // If it doesn't exist, create a new day
            myUserType = new days({
                DayName: data.dayName
            });
            await myUserType.save();
        }
        // Create a new user with the user type reference
        let myUser = new User({
            Name: userData.Name,
            FamilyName: userData.FamilyName,
            ID: userData.ID,
            Password: userData.Password,
            Mail: userData.Mail,
            Phone: userData.Phone,
            UserType: myUserType._id // Use the ID of the created user type
        });

        await myUser.save();

        console.log( myUser );
        return myUser;

    } catch (error) {
        return null;
    }
}

async function newDay(req, res) {
    console.log(req.body.dayName)
    try {
      const result = await serverFunction(req.body);
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
  


module.exports = {newDay , deleteDay }

