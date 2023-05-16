const expressAsyncHandler = require("express-async-handler");


const authUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "User authenticated" });
})

module.exports ={ authUser }
