const User = require('../Models/userModel')
const Treat = require('../Models/TreatmantModel')
const Product = require('../Models/productModel')

const serverFunction = require('./userControllers')



async function newProduct(req, res) {
  console.log("eeeeeeeee");
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


async function serverFunction1(userData) {
  console.log(userData);

  try {
    // יצירת משתמש במודל "User"
    let myUser = new User({
      Name: userData.Name,
      FamilyName: userData.FamilyName,
      ID: userData.ID,
      Password: userData.Password,
      Mail: userData.Mail,
      Phone: userData.Phone,
    });

    // שמירת המשתמש במודל "User"
    await myUser.save();

    console.log(myUser);
    let myName = new Treat({
      TreatmantName: userData.TreatmantName,
    })
    console.log(myProduct);

    await myName.save();

    // יצירת מוצר במודל "Product" עם שיוך למשתמש המתאים
    let myProduct = new Product({
      UserID: myUser._id, // שיוך למזהה הייחודי של המשתמש במודל "User"
      TreatmantID: myName._id,
    });
    await myProduct.save();
    console.log(myProduct);
    // שמירת המוצר במודל "Product"


    console.log();
    return { newUser: myUser, newProduct: myProduct }
    //res.send({ newUser: myUser, newProduct: myProduct });
  } catch (error) {
    return "cannot save new user: " + error.message
    //res.send();
  }
}


module.exports = { newProduct }
