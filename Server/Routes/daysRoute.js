const router=require('express').Router()
const daysControllers=require('../Controllers/daysControllers')



router.post('/newDay',daysControllers.newDay)
router.delete('/deleteday',daysControllers.deleteDay)
router.get('/findDayWeekById:id',daysControllers.findDayWeekById)

//router.get('/findUserById/:id',userControllers.findUserById)
//router.post('/getUser',userControllers.findUserByIdAndCode)




module.exports=router