const User = require('../Models/userModel')


// const newUser=async(req, res)=> {
//     console.log("aaa");

//     let myUser1 = new User(
//         {
//             Name: req.body.Name,
//             FamilyName: req.body.FamilyName,
//             ID: req.body.ID,
//             Password: req.body.Password,
//             Mail: req.body.Mail,
//             Phone: req.body.Phone,
//             // UserType: req.body.pId
//         })
//     try {
//         await myUser1.save();
//         console.log({ newUser: myUser1 });
//         res.json({ newUser: myUser1 });
//         return res.json({ newUser: myUser1 })
        

//     }
//     catch (error) {
//         res.send("cannot save new user: " + error.message)
//     }
// }
// async function newUser(userData, res) {
//     console.log("aaa");
    
  
//     try {
//       let myUser1 = new User(userData);
//       await myUser1.save();
//       console.log({ newUser: myUser1 });
//       res.json({ newUser: myUser1 });
//       return res.json({ newUser: myUser1 });
//     } catch (error) {
//       res.send("cannot save new user: " + error.message);
//     }
//   }
  
//   module.exports = { createNewUser };
  
// const { newUser } = require('./userUtils');

// משתמשים באובייקט המשתמש
// const userData = {
//   Name: req.body.Name,
//   FamilyName: req.body.FamilyName,
//   ID: req.body.ID,
//   Password: req.body.Password,
//   Mail: req.body.Mail,
//   Phone: req.body.Phone,
  // UserType: req.body.pId
// };

//פונקציה רגילה:

// פונקציה רגילה שמקבלת אובייקט להוספה
// מוסיפה למסד
// ומחזירה רטורן רגיל או עם התוצאה -אובייקט או אם לא הצליח הודעה

//פונקצית שרת שהיא - או הוספת יוזר או עסק
//הפונקציה מקבלת req&res
//שולחת את האובייקט שנמצא בבודי להוספה - שליחה לפונקציה
//אם הצליח -- משיכה הלאה למה שצריך או אם צריך להחזיר - החזרה

// async function createNewUser(userData) {
//     console.log("aaa");
  
//     try {
//       let myUser1 = new User(userData);
//       await myUser1.save();
//       console.log({ newUser: myUser1 });
//       res.json({ newUser: myUser1 });
//     //   return res.json({ newUser: myUser1 });
//     } catch (error) {
//       res.send("cannot save new user: " + error.message);
//     }
//   }
  

//   async function newUser(req, res) {
//     const userData = {
//       Name: req.body.Name,
//       FamilyName: req.body.FamilyName,
//       ID: req.body.ID,
//       Password: req.body.Password,
//       Mail: req.body.Mail,
//       Phone: req.body.Phone,
//       // UserType: req.body.pId
//     };
  
//     createNewUser(userData);

//   }

  

// קריאה לפונקציה עם האובייקט המשתמש והתגובה
// newUser(userData, res);



async function serverFunction(userData) {
    console.log("aaa");

    let myUser1 = new User(
        {
            Name: userData.Name,
            FamilyName: userData.FamilyName,
            ID: userData.ID,
            Password: userData.Password,
            Mail: userData.Mail,
            Phone: userData.Phone,
            // UserType: req.body.pId
        })
    try {
        await myUser1.save();
        console.log({ newUser: myUser1 });
        // res.json({ newUser: myUser1 })
        return  myUser1 
        

    }


    catch (error) {
        return null 
    }
}

// פונקצית שרת שמשתמשת בפונקציה newUser
async function newUser(req, res) {
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

