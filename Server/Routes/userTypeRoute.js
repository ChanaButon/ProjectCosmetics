const router=require('express').Router()
const userTypeControllers=require('../Controllers/userTypeControllers')



router.post('/newUserType',userTypeControllers.newUserType)
// router.delete('/deleteUserById/:id',userControllers.deleteUserById)
// router.get('/findUserById/:id',userControllers.findUserById)
// router.post('/getUser',userControllers.findUserByIdAndCode)




module.exports=router