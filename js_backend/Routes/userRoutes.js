const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/user");
const { jwtMiddleware, gToken } = require("../jwt");

const bodyParser = require("body-parser");
//stripe key for the payment gateway
const stripe = require("stripe")(
  "sk_test_51OyWGwSDlwM9qquDSuATkRTE8jEBu0kfNR9G69E2ukJ5tanuoorbLIKJRVRx3SXrBpHVZWUlgbC6ZcLmuYCOORGA00odlfGerI"
);
router.use(bodyParser.json());

require("dotenv").config();
//function to validate password
const validatePassword = (password) => {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return false;
  }
  return true;
};

// signup route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const { userName, email, password, role, subscription } = data;

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "Admin user already exists!" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ error: "User already exists with this email!" });
    }

    const existingUserByUsername = await User.findOne({ userName });
    if (existingUserByUsername) {
      return res.status(409).json({ error: "Username is already taken!" });
    }

    const validPass = validatePassword(password);
    if (!validPass) {
      return res.status(409).json({ error: "Invalid password!" });
    }

    // res.status(200).json({ response: "Details verified successfully" });

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };

    // console.log(JSON.stringify(payload));
    const token = gToken(payload);
    // console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
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

// profile route
router.get("/profile", jwtMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

let otpStore = {};
//function to send mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sdupati4@gmail.com",
    pass: "mavt fmuq thks hzoz",
  },
});

// sends otp
router.post("/request-otp", async (req, res) => {
  const { name } = req.body.body;
  console.log(req.body);
  const user = await User.findOne({ userName: name });
  if (!user) {
    return res.status(404).json({ message: "User Not found" });
  }
  const email = user.email;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  const mailOptions = {
    from: "sdupati4@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp},`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Error sending email", error });
    }
    res.status(200).json({ message: "OTP sent successfully" });
  });
  console.log(otpStore);
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error with transporter:", error);
    } else {
      console.log("Server is ready to send emails:", success);
    }
  });
});

// Verifies otp
router.post("/verify-otp", async (req, res) => {
  const { name, otp } = req.body.body;
  const user = await User.findOne({ userName: name });
  if (!user) {
    return res.status(404).json({ message: "User Not found" });
  }
  const email = user.email;
  console.log(email, otp);
  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email]; 
    return res.status(200).json({ message: "OTP verified successfully" });
  }
  res.status(400).json({ message: "Invalid OTP" });
});

// password reset
router.put("/resetPass", async (req, res) => {
  try {
    const { name, newPassword, confirmNewPassword } = req.body.body;
    const user = await User.findOne({ userName: name });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    if (newPassword != confirmNewPassword) {
      return res.status(401).json({ message: "Passwords doesn't match" });
    }
    user.password = newPassword;
    await user.save();
    console.log("password updated :)");
    res.status(200).json({ message: "Password reset successfull " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// making payment
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
  //res.json({ clientSecret: paymentIntent.client_secret });
  res.status(200).send({ clientSecret: paymentIntent.client_secret });
});

// update plan
router.put("/updatePlan", jwtMiddleware, async (req, res) => {
  const userData=req.user
  const {updatedPlan}=req.body
  // console.log(updatedPlan);
  
  const user=await User.findByIdAndUpdate(userData.id,{subscription:updatedPlan}) //updates subscription by finding the id
  if(!user){
    return res.status(401).send({message:"User not found"})
  }
  return res.status(200).send({message:"Updated successfully."})
});

module.exports = router;
