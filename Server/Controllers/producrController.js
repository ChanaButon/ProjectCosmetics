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
    console.log(req.body,'mioo')

    try {
      const existingProduct = await Product.findOne({ _id: req.body._id });
      console.log(existingProduct)
      if (existingProduct) {
        const existingCustomer = existingProduct.Customers.find(
          
          (customer) => customer.toString() === req.body.Customers
        );
      
        if (existingCustomer) {
          // If the client already exists, add QUEUELIST only if it's not already present
          if (!existingProduct.QueueList.includes(req.body.QueueList)) {
            existingProduct.QueueList.push(req.body.QueueList);
          } else {
            return res.send('Queue list already exists for the client in the product.');
          }
        } else {
          // Client doesn't exist, add the client and QUEUELIST
          existingProduct.Customers.push(req.body.Customers);
          existingProduct.QueueList.push(req.body.QueueList);
        }
  
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: req.body._id },
          existingProduct,
          { new: true }
        );n
  
        if (!updatedProduct) {
          return res.status(404).send({ message: 'No product found with the specified ID' });
        }
  
        return res.send(updatedProduct);
      } else {
        return res.status(404).send({ message: 'No product found with the specified ID' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  };
  
  const updateProductById = async (req, res) => {
    try {
        // Step 1: Find the existing product by its ID
        const existingProduct = await Product.findOne({ _id: req.body._id });

        // Step 2: Check if the product exists
        if (existingProduct) {
            // Step 3: Update the existing product with the new data from the request body
            Object.assign(existingProduct, req.body);

            // Step 4: Save the updated product to the database
            const updatedProduct = await existingProduct.save();

            // Step 5: Check if the update was successful
            if (updatedProduct) {
                // Step 6: Send the updated product as the response
                return res.send(updatedProduct);
            } else {
                // Step 7: If the update fails, send a 500 response with an error message
                return res.status(500).send({ message: 'Failed to update the product.' });
            }
        } else {
            // Step 8: If no product found with the specified ID, send a 404 response
            return res.status(404).send({ message: 'No product found with the specified ID' });
        }
    } catch (error) {
        // Step 9: Handle errors and send a 500 response with an error message
        console.error(error);
        return res.status(500).send(error.message);
    }
};

  
  

module.exports = { newProduct,getAllProduct,updateProduct,updateProductById}
