const UserType = require('../Models/userTypeModel')


async function serverFunction(userData) {
    console.log("usertype");;

    let myUserType = new UserType({
        userNameType: userData.type,
    });

    try {
        await myUserType.save();
        console.log({ newUser: myUserType });
        return myUserType;
    } catch (error) {
        return null;
    }
}
async function newUserType(req, res) {
    try {
      const result = await serverFunction(req.body);
      res.json(result);
    } catch (error) {
      res.send("Error: " + error.message);
    }
}



const findUserByType = async (type) => {
    try {
        let user = await UserType.findOne({ userNameType: type });
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
}
const getAllUserType =  async (req, res) => {
    try {
      const users = await UserType.find({})
      res.send(users);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
  }

module.exports = { newUserType,findUserByType ,getAllUserType};



