const router=require('express').Router()
const timeDaysControllers=require('../Controllers/timeDayControllers')



router.post('/newTimeDay',timeDaysControllers.newTimeDay)
router.get('/findDayById:id',timeDaysControllers.findDayById)
router.put('/updateTimeDay',timeDaysControllers.updateTimeDay)
//outer.delete('/deleteday',daysControllers.deleteDay)
//router.get('/findUserById/:id',userControllers.findUserById)
//router.post('/getUser',userControllers.findUserByIdAndCode)




module.exports=router