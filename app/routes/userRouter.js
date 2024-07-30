const express = require('express');
const router = express.Router();
const { signUp, verifyCode, signIn, resendOtp, forgotPassword, cahngePassword, changePasswordUseingOldPassword } = require('../controllers/userController');
// const upload = require('../../middlewares/fileUplode');


// Import controller function
// const { signUp, verifyCode, signIn, resendOtp, createAccountByimage, forgotPassword, cahngePassword, changePasswordUseingOldPassword, changeRole, userInformation, updatedUserProfile, userInformationOnDashBoard } = require('../controllers/userController');
// const upload = require('../../middlewares/fileUplode');
// const { showAboutUs } = require('../controllers/admin/aboutController');
// const { showTermsAndCondation } = require('../controllers/admin/termsController');
// const { showPrivacy } = require('../controllers/admin/privacyController');

// routes
router.post('/sign-up', signUp);
router.post('/verify', verifyCode);
router.post('/signIn', signIn);
router.post('/resendOtp', resendOtp);
// router.patch('/createAccountByimage',upload,createAccountByimage)
router.post('/forgotPassword',forgotPassword)
router.post('/cahngePassword',cahngePassword)
router.post('/changePasswordUseingOldPassword',changePasswordUseingOldPassword)
// // updte role of user
// router.patch('/changeRole',changeRole)
// // user information 
// router.get('/userInformation',userInformation)
// router.get('/userInformationOnDashBoard',userInformationOnDashBoard)
// // update user 
// router.patch('/updatedUserProfile',upload,updatedUserProfile)


// // all terms and condation show 
// router.get('/showAboutUs',showAboutUs)
// router.get('/showTermsAndCondation',showTermsAndCondation)
// router.get('/showPrivacy',showPrivacy)

module.exports = router;