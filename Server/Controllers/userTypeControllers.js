const UserType = require('../Models/UserType')


async function serverFunction(userData) {
    console.log("usertype");

    let myUserType = new UserType(
        {
            userNameType: userData.type,
        })
    try {
        await myUserType.save();
        console.log({ newUser: myUserType });
        return  myUserType 
        

    }


    catch (error) {
        return null 
    }
}

// פונקצית שרת שמשתמשת בפונקציה newUser
async function newUserType(req, res) {
    console.log(req)
    try {
      const result = await serverFunction(req.body);
      res.json(result);
    } catch (error) {
      res.send("Error: " + error.message);
    }
  }