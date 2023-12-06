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
        console.log(data[0].Status,"meo")         

         
       // Create a new timeDay document with the Date objects
       let myTimeDay = new timeDays({
        Day: myDay._id,
        Start: data.Start, 
        End: data.End,     
        Status: data.Status,
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
  
  
  const findDayById = async (req, res) => {
    try {
        console.log("jhhchio knmut ימים")
        console.log(req.params)
        const id = req.params.id.replace(':', ''); // This removes the colon
        let timeDay = await timeDays.findOne({_id : id});
        console.log(timeDay,"timeday");
        res.json({ id: timeDay });
    }
    catch (error) {
        res.send("cannot find timeDay: " + error.message)
    }
  }

  async function updateTimeDay(req, res) {
    const updatedTimeDay ={...req.body};
    try {
      const result = await timeDays.findOneAndUpdate({_id:req.body._id}, updatedTimeDay, {new:true})
      if(!result){
        res.status(404).send({message: "no such timeDay with the specific id"})
      }
      console.log(result)
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
}
 

module.exports = {newTimeDay , deleteDay,findDayById,updateTimeDay }

