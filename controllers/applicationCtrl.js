const applicationModel = require("../models/applicationModel");
const moment = require('moment');

const getAllApplication = async (req, res) => {
  try {
    const applications = await applicationModel.find({ userid: req.body.userid });
    res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteApplication = async (req, res) => {
  try {
    await applicationModel.findOneAndDelete({ _id:req.body.applicationId });
    res.status(200).send('Application deleted');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editApplication = async (req, res) => {
  try {
    await applicationModel.findOneAndUpdate({ _id:req.body.applicationId },
      req.body.payload
     );
     res.status(200).send('Edit successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json(error); 
  }
};

const addApplication = async (req, res) => {
  try {
    const newApplication = new applicationModel(req.body);
    await newApplication.save();
    res.status(201).send("Application is Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllApplication, addApplication, editApplication, deleteApplication };
