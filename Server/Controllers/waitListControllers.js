const WaitList = require('../Models/WaitListModel');
// const Queue = require('../Models/QueueModel');
//const  treatmantControllers=require('../Controllers/TreatmantControllers')
// const Treatmant = require('../Models/TreatmantModel');

async function serverFunction(data) {
    console.log("waitttttttttttttttttttttttttttttttt");
    try {
        let myWait = new WaitList({
          userId: data.userId,
          treatmentId: data.treatmentId,
          preferredDate:data.preferredDate,
          preferredTime:data.preferredTime,
          userMail:data.userMail,
          serviceId:data.serviceId
        });
        await myWait.save();

        console.log( myWait );
        return myWait;

    } catch (error) {
        return error;
    }
}


async function newWait(req, res) {
  console.log("ממתיןןןןןןןןןןןןן")
    console.log(req.body)
    try {
      const result = await serverFunction(req.body);
      res.json(result);
    } catch (error) {
      res.send("Error: " + error.message);
    }
  }
  


const deleteWaitingById = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id.replace(':', ''); // This removes the colon
    try {
        let user = await WaitList.findByIdAndDelete(id)
        res.send("Waiting deleted!!" + user)
    }
    catch {
        res.send('cant find this Waiting')
    }
}



const getAllWaitting=  async (req, res) => {
  try {
    const waitting = await WaitList.find({})
    res.send(waitting);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

module.exports = {newWait,deleteWaitingById,getAllWaitting}

