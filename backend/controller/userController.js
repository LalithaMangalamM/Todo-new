const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// sign up 
const jwtSecret = process.env.JWT_SECRET || 'shhhhh';

exports.createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret);

    // Prepare response data
    const createdUser = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    // Send response with token and user data
    res.status(200).cookie('token', token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    }).json({
      success: true,
      token,
      createdUser,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};



// login user 
exports.loginUserController = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        console.log("Inside login")
        console.log(email,password)
        const user = await User.findOne({ email });
        if (!user)
            throw new Error("no such email found please sign up");

        // const user = await User.findOne({ email });
        console.log(user)
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword)
            throw new Error("wrong password");


        const data = {
            id: user._id
        }

        const token = await jwt.sign(data, 'shhhhh');

        // user.password = undefined;
        res.status(201).cookie('token', token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: false
        }).json({
            success: true,
            token,
            user

        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}


// get user 
exports.getUserController = async(req,res)=>{
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token, 'shhhhh');
        const userId = decoded.id;
        const user = await User.findById(userId);
        if(!user)
        throw new Error("no such user exists");
        user.password = undefined;
        res.status(201).json({
            success:true,
            user
        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}