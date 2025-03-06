const express = require('express');
const uploads = require('../app/middleware/multerConfig')

const { registerUser } = require('../app/controller/RegistrationController');
const { sendOTP, verifyOTPAndCreateSession, resendOtp } = require('../app/controller/userLoginController');
const { updateWishlist, getAllWishes } = require('../app/controller/wishController');
const { postIssue, getIssueList, getAllIssueList, deleteIssue } = require('../app/controller/customerIssuesController');
const { PostJobrole, getJobRoleList, getJobRoleById, deleteJobRole } = require('../app/controller/JobRoleController');
const { PostJobApplication, GetAllJobApplications, jobApplicationEmail } = require('../app/controller/JobapplicationController');
const { DesignsessionBooking } = require('../app/controller/DesignsessionController');
const { ChatBotUser } = require('../app/controller/ChatBotUserDetailsController');
const { upload } = require('../app/helpers/filehelper');
const { postReferUser } = require('../app/controller/referUserController');
const { getUserById } = require('../app/controller/UserController');
const { sendIssueClosedEmail } = require('../app/controller/IssueMailController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('new project created')
});

router.get("/user/:id", getUserById);

router.post("/sendIssuemail", sendIssueClosedEmail);

router.post("/jobApplicationEmail", uploads.fields([{ name: "portfolio" }, { name: "resume" }]), jobApplicationEmail);

router.post('/register', registerUser);

router.post('/signin', sendOTP);

router.post('/resend', resendOtp)

router.post('/signin/auth', verifyOTPAndCreateSession);

router.post('/wish/:index', updateWishlist);

router.post('/wishes', getAllWishes);

router.post('/postissue', postIssue);

router.post('/fetchList', getIssueList);

router.get('/fetchAllList', getAllIssueList);

router.delete('/deleteIssue/:issueId', deleteIssue);


//jobrole

//creates role
router.post('/jobroleList', PostJobrole);

//fetches roles
router.get('/roleList', getJobRoleList);
//fetches role by id
router.get('/roleList/:id', getJobRoleById);
//deletes role by id
router.delete('/jobrole/:id', deleteJobRole);



//-----------------------------------------------

router.post('/jobApplication', upload.fields([
    { name: 'portfolio', maxCount: 1 },
    { name: 'resume', maxCount: 1 }]), PostJobApplication);

router.get('/jobApplicationList', GetAllJobApplications);

router.post('/bookingsession', DesignsessionBooking);

router.post('/chatbot', ChatBotUser);

router.post('/referUser', postReferUser);

module.exports = router;