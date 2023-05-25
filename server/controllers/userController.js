const expressAsyncHandler = require("express-async-handler");
import User from "../models/userModel";

const authUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "User authenticated" });

})



const registerUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "User registered" });
})



const logoutUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "User loggedOut" });
})



const getUserInfo = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "User info" });
})




const updateUserProfile = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "User info updated" });
})



module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserInfo,
    updateUserProfile
}
