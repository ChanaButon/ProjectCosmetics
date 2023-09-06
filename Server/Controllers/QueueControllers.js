const User = require('../Models/userModel');
const Queue = require('../Models/QueueModel');
//const  treatmantControllers=require('../Controllers/TreatmantControllers')
const Treatmant = require('../Models/TreatmantModel');

async function serverFunction(data) {
    console.log("Queue");
    try {
      let myTreatmant= await Treatmant.findOne({ TreatmantName: data.TreatmantType });
      let myUser= await User.findOne({ ID: data.Customer });

      // if (!myDay) {
      //     // If it doesn't exist, create a new day
      //     myDay = new days({
      //         DayName: data.dayName
      //     });
      //     await myDay.save();
      // }

        // Create a new Queue 

        let myQueue = new Queue({
          DateTime: data.DateTime ,
          TreatmantType:myTreatmant._id,
          Customer:myUser._id,
        });

        await myQueue.save();

        console.log( myQueue );
        return myQueue;

    } catch (error) {
        return error;
    }
}


async function newQueue(req, res) {
    console.log(req.body)
    try {
      const result = await serverFunction(req.body);
      res.json(result);
    } catch (error) {
      res.send("Error: " + error.message);
    }
  }
  


const deleteTreatmantById = async (req, res) => {
    console.log(req.params.id)
    try {
        let user = await Treatmant.findByIdAndDelete(req.params.id)
        res.send("treatmant deleted!!" + user)
    }
    catch {
        res.send('cant find this treatmant')
    }
}



const updateTreatmant = async (req, res) => {
    console.log(req.body._id);
    const updatedTreatmant ={...req.body};
    try {
      const result = await Treatmant.findOneAndUpdate({_id:req.body._id}, updatedTreatmant, {new:true})
      if(!result){
        res.status(404).send({message: "no such Treatmant with the specific id"})
      }
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  }

const findTreatmant = async(req,res)=>
{
    try{
        const treatmant = await Treatmant.findOne({ TreatmantName: req.TreatmantName });
        if(!treatmant){
            res.status(404).send({message: "no such treatmant with the specific id"})
          }
        res.send(treatmant);}
        catch(e){
            console.log(e)
          res.send(e.message)
        }
}

module.exports = {newQueue,}

