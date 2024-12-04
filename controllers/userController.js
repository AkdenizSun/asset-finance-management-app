const userModel = require("../models/userModel");

//Login callback
const loginController = async (req, res) => {
  try {
    //took request data
    const { email, password } = req.body;
    //searching in database
    const user = await userModel.findOne({ email, password });
    //processing results
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({
        success: true,
        user,
  });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async(req, res) => {
    console.log("aaa");
    try{
        //create new user
        const newUser = new userModel(req.body)
        //save new user in database
        await newUser.save();
        //Response upon successful registration
        res.status(201).json({
            success: true,
            newUser,
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error,
        })
    }
};

module.exports = { loginController, registerController };
