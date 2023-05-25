const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require('../utils/generateToken');

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
})



const registerUser = expressAsyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password });
    if (user) {
        generateToken(res, user._id);
    } else {
        res.status(400);
        throw new Error('invalid user data')
    }
});


const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: "Logged out successfully" })
});





const getUserInfo = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user_id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("user not found")
    }
})




const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        req.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error('user not found');
    }
})



module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserInfo,
    updateUserProfile
}
