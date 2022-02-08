const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//Register section
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Login section
router.post("/login", async (req, res) => {
    try {
        //find user
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json("Wrong username")
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        // check password is correct
        originalPassword !== req.body.password
            && res.status(401).json("Wrong password")

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY_TOKEN,
            { expiresIn: "5d" }
        )

        const { password, ...info } = user._doc;
        //sucess, then send back user
        res.status(201).json({ ...info, accessToken })
    } catch (err) {
        res.status(500).jons(err)
    }
})

module.exports = router;