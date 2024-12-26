const express = require('express');
const router = express.Router();
const User = require("../models/user");
const {jwtMiddleware,gToken} = require('../jwt')
// this function is used to check the user's role
async function checkAdminRole(userId) {
    const user = await User.findById(userId);
    return user && user.role === 'admin';
}
//post function to save an admin
router.post('/', jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save(); //.save() saves the data into the database
        console.log('User data saved');
        res.status(200).json({ response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//put function to change the email id
router.put('/:email', jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }

        const email = req.params.email;  //gets email
        const data = req.body.updateUser; //update the userData from request body
        // console.log(email)
        // console.log(data);
        const response = await User.findOneAndUpdate({email}, data, { new: true, runValidators: true });

        User.findOneAndUpdate()
        if (!response) {
            return res.status(404).json("User not found");
        }

        res.status(200).json(response);
        console.log("User data updated");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//delete function to delete the admin
router.delete('/:email', jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }
        const email = req.params.email;
        const response = await User.findOneAndDelete({email}); //finds the data with this email adress and deletes the data

        if (!response) {
            return res.status(404).json("User not found");
        }

        res.status(200).json(response);
        console.log("User deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//get function to get the list of all Users
router.get('/users',jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }
        const users = await User.find({userName:{$ne:"Admin"}}, {userName:1,email:1,subscription:1,_id:0}); //gives all the user data
        res.status(200).json(users);
    } catch (err) {
        console.log("err",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
