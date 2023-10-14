const router=require('express').Router()
const queueControllers=require('../Controllers/QueueControllers')


router.post('/newQueue',queueControllers.newQueue)
// router.delete('/deleteUserById/:id',userControllers.deleteUserById)
router.get('/getQueueDate:date',queueControllers.getQueuesByDateAndStatus)
// router.post('/getUser',userControllers.findUserByIdAndCode)




module.exports=router