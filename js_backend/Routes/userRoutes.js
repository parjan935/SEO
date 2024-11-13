const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require("../models/user");
const { jwtMiddleware, gToken } = require("../jwt");


require('dotenv').config();  


router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const { userName, email, password, role , subscription } = data;

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({ error: "User already exists with this email." });
    }

    const existingUserByUsername = await User.findOne({ userName });
    if (existingUserByUsername) {
      return res.status(409).json({ error: "Username is already taken. \n Select a unique userName." });
    }

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    
    console.log(JSON.stringify(payload));
    const token = gToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({userName});
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: user.id,
    };
    const token = gToken(payload);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route
router.get("/profile", jwtMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/profile",jwtMiddleware, async (req, res) => {
  try {
    const Userid = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(Userid);
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Incorrect Current Password" });
    }
    user.password = newPassword;
    await user.save();
    console.log("password updated :)");
    res.status(200).json({message:"Password changed successfully "});
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Otp sender 
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass:process.env.EMAIL_PASS,
//   },
// });

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000);
// }

// function validateEmail(email){
//   return email.endsWith('@gmail.com');
// }

// router.post('/send-otp', (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP();

//   if(!validateEmail(email)){
//     return res.status(400).send({error:'invalid email'})
//   }

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your One-Time-Password for registering in SEO Optimiser is ${otp}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error)
//       return res.status(500).send({error: 'Error sending email' });
//     }
//     res.send({ success: true, otp });
//   });
// });



module.exports = router;
