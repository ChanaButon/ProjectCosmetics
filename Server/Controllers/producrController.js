const Treat = require('../Models/TreatmantModel')
const Product = require('../Models/productModel')
const timeDays = require('../Models/timeDayModel');
const Days = require('../Models/daysModel');



async function newProduct(req, res) {
  console.log("product");
  console.log(req.body)
  try {

    const result = await serverFunction1(req.body);
    if (result.newUser) {
      console.log(result);
      res.send({result})

    }
  } catch (error) {
    res.send("Error: " + error.message);
  }
}


async function serverFunction1(data) {
  console.log(data);

     // Create an array to store treatment references
     const treatmentReferences = [];

     // Create treatments and collect their references
     for (const treatData of data.TreatmantID) {
       let myName = new Treat({
        TreatmantName: treatData.TreatmantName,
        Price:treatData.Price,
        TreatmantTime:treatData.TreatmantTime
       });
       await myName.save();
       treatmentReferences.push(myName._id);
     }
  //   console.log(treatmentReferences)


     const workDayReferences = [];

     // Create treatments and collect their references
     for (const day of data.WorkingDay) {
      let weekDay = await Days.findOne({ DayName: day.Day });

      if (!weekDay) {
          // If it doesn't exist, create a new UserType
          weekDay = new Days({
            DayName: day.Day
          });
          await weekDay.save();
      }
       let myDay = new timeDays({
        Day:weekDay._id,
        Start:day.Start,
        End:day.End,
        Status:day.Status,
       
       });
       await myDay.save();
       workDayReferences.push(myDay._id);
     }
     console.log(workDayReferences)


    // יצירת מוצר במודל "Product" עם שיוך למשתמש המתאים
    let myProduct = new Product({
      UserID: data.UserID,
      Describe: data.Describe,
      Addres:data.Addres,
      TreatmantID:treatmentReferences,
      Customers:data.Customers,
      WorkingDay:workDayReferences,
      HoliDay:data.HoliDay,
      BrakeTime:data.BrakeTime,
      QueueList:data.QueueList
    });
    await myProduct.save();
    console.log(myProduct);
    // שמירת המוצר במודל "Product"


   // console.log();
    return {  newProduct: myProduct }
    //res.send({ newUser: myUser, newProduct: myProduct });
  } 
  

  const getAllProduct =  async (req, res) => {
    try {
      const product = await Product.find({})
      res.send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
  }

  const updateProduct = async (req, res) => {
    console.log("updateeeeeeeeeeeeeeeeeeeeee")
    //console.log(req.body._id);
    let product = await Product.findOne({ _id: req.body._id });
    const updateProduct ={...req.body};
    product.Customers.push(updateProduct.Customers)
    product.QueueList.push(updateProduct.QueueList)

    console.log(product)
    try {
      const result = await Product.findOneAndUpdate({_id:req.body._id}, product, {new:true})
      if(!result){
        res.status(404).send({message: "no such product with the specific id"})
      }
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  }
  

module.exports = { newProduct,getAllProduct,updateProduct }
