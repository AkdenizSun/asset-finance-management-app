const express = require('express');
const {
  addApplication,
  getAllApplication,
  editApplication,
  deleteApplication,
} = require("../controllers/applicationCtrl");

//router object
const router = express.Router();

//routes
//add application POST method
router.post('/add-application', addApplication);

//edit application POST method
router.post('/edit-application', editApplication);

//delete application POST method
router.post('/delete-application', deleteApplication);

//post application
router.post('/get-application', getAllApplication);

module.exports = router;