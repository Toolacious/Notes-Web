const router = require("express").Router();
const User = require("../model/User");
const { registerValidate, loginValidate } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    // validate
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpsw = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpsw,
    });
    try {
        const savedUser = await user.save();
        res.send({ msg: "Successfully Registered!", user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");

    // check password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    // assign jwt token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token);
    res.status(200).send({
        msg: "Successfully Login!",
        user: user._id,
    });
});

module.exports = router;
