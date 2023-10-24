const router=require('express').Router()
const userControllers=require('../Controllers/userControllers')



router.post('/newUser',userControllers.newUser)
router.delete('/deleteUserById/:id',userControllers.deleteUserById)
router.get('/findUserById/:id',userControllers.findUserById)
router.post('/getUser',userControllers.findUserByIdAndCode)

router.get('/getAllUser',userControllers.getAllUser)


module.exports=router