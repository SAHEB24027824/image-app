const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({});
        if (existingUser) return res.status(400).send({ success: false, message: 'User already exists, signup not allowed' })

        let newUserData = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        })
        const user = await newUserData.save();
        if (!user) return res.status(400).send({ success: false, message: 'Unable to create user' })

        let token = await jwt.sign({ id: user._id, name: user.name, email: user.email }, 'need_to_moved_to_dotenv');
        res.cookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME, token,{domain:process.env.AUTH_DOMAIN});
        res.status(200).send({ success: true, message: 'User created' })

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });

    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ success: false, message: 'Invalid email or password' })

        let isSamePassword = await bcrypt.compare(password,user.password);
        if (!isSamePassword) return res.status(400).send({ success: false, message: 'Invalid email or password' })

        let token = await jwt.sign({ id: user._id, name: user.name, email: user.email }, 'need_to_moved_to_dotenv');

        res.cookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME, token,{domain:process.env.AUTH_DOMAIN});
        res.status(200).send({ success: true, message: 'Successfully logged in' })

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });

    }
}

const logout = async (req, res) => {
    try{
        res.cookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME, '',{maxAge: 0});
        res.status(200).send({ success: true, message: 'Successfully logged out' })
    }
    catch(error){
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports={
    signUp:signUp,
    login:login,
    logout:logout
}
