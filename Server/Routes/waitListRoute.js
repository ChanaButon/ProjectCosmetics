const router=require('express').Router()
const waitListControllers=require('../Controllers/waitListControllers')



router.post('/newWaitList',waitListControllers.newWait)
router.delete('/deleteWaittingById:id',waitListControllers.deleteWaitingById)
router.get('/getWatting',waitListControllers.getAllWaitting)

module.exports=router