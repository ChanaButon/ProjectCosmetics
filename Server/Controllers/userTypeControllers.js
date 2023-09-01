const UserType = require('../Models/userTypeModel')


async function serverFunction(userData) {
    console.log("usertype");

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

module.exports = { newUserType };



