const User = require('../Models/userModel');
const Queue = require('../Models/QueueModel');
//const  treatmantControllers=require('../Controllers/TreatmantControllers')
const Treatmant = require('../Models/TreatmantModel');

async function serverFunction(data) {
    console.log("Queue");
    try {
      let myTreatmant= await Treatmant.findOne({ _id: data.TreatmantType });
      let myUser= await User.findOne({_id: data.Customer });

      console.log(myTreatmant,myUser)
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
  console.log("תוררררר")
    console.log(req.body,"תוררררר")
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

const getQueuesByDateAndStatus = async (req, res) => {
  try {
    // Extract the target date from the request parameters and parse it to a Date object
    const targetDate = new Date(req.params.date);
    // Set the time to the start of the day (00:00:00)
    targetDate.setHours(0, 0, 0, 0);

    // Calculate the end of the day (23:59:59)
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Find queues with Status: true and DateTime falling within the target date
    const filteredQueues = await Queue.find({
      Status: true,
      DateTime: {
        $gte: targetDate,
        $lte: endOfDay
      }
    });

    console.log(filteredQueues);
    res.json(filteredQueues);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getQueueByIdCustomer = async(req,res)=>{
  console.log(req.params)
  try {
    console.log("12345679876543212345678765432345678")
      console.log(req.params)
      const id = req.params.id.replace(':', ''); // This removes the colon
      let queue = await Queue.find({Customer:id});
      console.log(queue,"queue");
      res.send(  queue );
  }
  catch (error) {
      res.send("cannot find user: " + error.message)
  }
}

const getAllQueue =  async (req, res) => {
  try {
    const queue = await Queue.find({})
    res.send(queue);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

module.exports = {newQueue,getQueuesByDateAndStatus,getAllQueue,getQueueByIdCustomer}

