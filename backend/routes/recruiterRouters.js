const RecruiterController = require('../controllers/recruiterControllers');

const express = require('express');

const router = express.Router() ;

router.post('/create' , RecruiterController.createRecruiter);

router.put('/update' , RecruiterController.updateRecruiter);

module.exports =router ;