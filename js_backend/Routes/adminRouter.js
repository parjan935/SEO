const express = require('express');
const router = express.Router();
const User = require("../models/user");
const {jwtMiddleware,gToken} = require('../jwt')

async function checkAdminRole(userId) {
    const user = await User.findById(userId);
    return user && user.role === 'admin';
}
router.post('/', jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        console.log('User data saved');
        res.status(200).json({ response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/:userid', jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }

        const userId = req.params.userid;
        const data = req.body;
        const response = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });

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
router.delete('/:userid', jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }

        const userId = req.params.userid;
        const response = await User.findByIdAndDelete(userId);

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
router.get('/users',jwtMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "You must be an admin to perform this operation" });
        }
        const users = await User.find({}, 'name mobile email subscription _id');
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;