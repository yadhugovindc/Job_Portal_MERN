const express=require('express');
const userController=require('../controller/userController');
const jobController=require('../controller/jobController');
const applicationController=require('../controller/applicationController');
const adminController=require('../controller/adminController')
const jwtmiddleware=require('../middleware/jwtmiddleware');
const multermiddleware=require('../middleware/multermiddleware');



const router=new express.Router();

//user routes

router.post('/api/register',userController.registerUser);

router.post('/api/login',userController.loginUser);


//job routes

router.get('/api/getalljobs',jobController.getAlljobs);

router.post('/api/postjobs',jwtmiddleware.isAuth,jobController.postJob);

router.get('/api/getmyjobs',jwtmiddleware.isAuth,jobController.getMyJob);

router.get('/api/job/:id',jwtmiddleware.isAuth,jobController.getSingleJob);

router.delete('/api/deletejob/:id',jwtmiddleware.isAuth,jobController.deleteJob);

router.put('/api/updatejob/:id',jwtmiddleware.isAuth,jobController.updateJob);


//application

router.post('/api/submitform',jwtmiddleware.isAuth,multermiddleware.upload.single('resume'),applicationController.submitApplication);
router.get('/api/getform',jwtmiddleware.isAuth,applicationController.viewYourApplications);
router.delete('/api/deleteform/:id',jwtmiddleware.isAuth,applicationController.deleteApplication);
router.get('/api/getemployerapplication',jwtmiddleware.isAuth,applicationController.viewEmployerApplication);
router.put('/api/status/:id',jwtmiddleware.isAuth,applicationController.updateStatus);

router.get('/api/profile',jwtmiddleware.isAuth,userController.getUserProfile)
router.put('/api/updateapplication/:id',jwtmiddleware.isAuth,multermiddleware.upload.single('resume'),applicationController.updateApplication);

//admin

router.get('/api/getallusers',adminController.getAllUser)
router.get('/api/getalljobs',adminController.getAllUser)
router.get('/api/getallapplications',adminController.getAllApplication)
router.delete('/api/deleteitem/:id',adminController.deleteEmployees)

module.exports=router;