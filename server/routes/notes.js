const Router = require("express").Router();
const verify = require("./tokenVerify");
const User = require("../model/User");

Router.get("/", verify, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
});

module.exports = Router;
