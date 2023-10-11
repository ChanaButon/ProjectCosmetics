const Days = require('../Models/daysModel');

async function serverFunction(data) {
    console.log("days");

    let myDay = new Days({
        DayName: data.dayName,
    });

    try {
        await myDay.save();
        console.log({ newDay: myDay });
        return myDay;
    } catch (error) {
        return error;
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

  
  const findDayWeekById = async (req, res) => {
    try {
        console.log(req.params)
        const id = req.params.id.replace(':', ''); // This removes the colon
        let timeDay = await Days.findOne({_id : id});
        console.log(timeDay,"timeday");
        res.json({ id: timeDay });
    }
    catch (error) {
        res.send("cannot find Day: " + error.message)
    }
  }
  


module.exports = {newDay , deleteDay, findDayWeekById }

