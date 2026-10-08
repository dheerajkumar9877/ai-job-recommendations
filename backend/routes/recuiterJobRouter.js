const express = require('express');

const recruiterJobController = require('../controllers/recruiterJobController');

const router = express.Router();

router.post('/create', recruiterJobController.CreateJob);

router.get('/allJob', recruiterJobController.allJob);

router.put('/update-job/:user_id/:job_id', recruiterJobController.updateJob);

router.get('/get-job/:user_id/:job_id', recruiterJobController.getJobById);

router.get('/view-job/:user_id/:job_id', recruiterJobController.viewJob);

router.delete('/delete-job/:user_id/:job_id' , recruiterJobController.deleteJob);

module.exports = router;