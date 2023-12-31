//const UserType = require('../Models/userTypeModel');
const Treatmant = require('../Models/TreatmantModel');

async function serverFunction(data) {
    console.log("treatmant");

    try {
       
        // Create a new treatmant 
        let myTreatmant = new Treatmant({
            TreatmantName:data.TreatmantName,
            Price:data.Price,
            TreatmantTime:data.TreatmantTime,
            Status:data.Status
        });

        await myTreatmant.save();

        console.log( myTreatmant );
        return myTreatmant;

    } catch (error) {
        return error;
    }
}


async function newTreatmant(req, res) {
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

 const getAllTreatmant =  async (req, res) => {
  try {
    const treatmant = await Treatmant.find({})
    res.send(treatmant);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const findTreatById = async (req, res) => {
  console.log(req.params)
  try {
    console.log("12345679876543212345678765432345678")
      console.log(req.params)
      const id = req.params.id.replace(':', ''); // This removes the colon
      let treat = await Treatmant.findOne({_id:id});
      console.log(treat,"treat");
      res.json({ id: treat });
  }
  catch (error) {
      res.send("cannot find user: " + error.message)
  }
}

module.exports = {newTreatmant, deleteTreatmantById,updateTreatmant,findTreatmant,getAllTreatmant,findTreatById}

