const UserType = require('../Models/userTypeModel');
const User = require('../Models/userModel');

async function serverFunction(userData) {
    console.log("aaa");

    try {
        // Create a new user type
        let myUserType = new UserType({
            userNameType: userData.Type
        });
        await myUserType.save();

        // Create a new user with the user type reference
        let myUser = new User({
            Name: userData.Name,
            FamilyName: userData.FamilyName,
            ID: userData.ID,
            Password: userData.Password,
            Mail: userData.Mail,
            Phone: userData.Phone,
            UserType: myUserType._id // Use the ID of the created user type
        });

        await myUser.save();

        console.log( myUser );
        return myUser;

    } catch (error) {
        return null;
    }
}


// פונקצית שרת שמשתמשת בפונקציה newUser
async function newUser(req, res) {
    console.log(req.body.Type)
    try {
      const result = await serverFunction(req.body);
      res.json(result);
    } catch (error) {
      res.send("Error: " + error.message);
    }
  }
  
  






const deleteUserById = async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id)
        res.send("user deleted!!" + user)
    }
    catch {
        res.send('canwt find this user')
    }
}
const findUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        console.log(user);
        res.json({ id: user });
    }
    catch (error) {
        res.send("cannot find user: " + error.message)
    }
}


const findUserByIdAndCode = async (req, res) => {

    

    
    
    try {console.log(req.body)
        const { ID, Password } = req.body;
        let user;

        if (ID && Password) {
            // Find user by ID and code
            user = await User.findOne({ ID: ID, Password: Password });
        }
        // console.log(user)

        if (user) {

            // console.log(user);
            res.json({ status: true, user: user });
        } else {
            res.json({ status: false, message: 'User not found' });
        }
    } catch (error) {
        res.send('Error finding user: ' + error.message);
    }
};


// const findUserByIdAndCode = (req, res) => {
    // console.log('in findUserByName');
    // console.log(req.body);
    // console.log(req.body);

//     Users.findOne({ ID: req.body, Password: req.body }).then((response) => {
//         if(response){

//             res.json({ status: true, user: response, ID: req.body.ID, Password: req.body.Password })
//         }
//         else{
//             // throw
//             res.json({ status: false, message: 'not found' });
//         }
//     }).catch((err) => {

//         res.json({ status: false, message: "my error: " + err });
//     })
// }








module.exports = {newUser, deleteUserById, findUserById,findUserByIdAndCode }

