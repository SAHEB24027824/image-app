const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signUp = async (req, res) => {
    try {
        let { name, email, password,key } = req.body;
        if(!key || key != process.env.AUTH_KEY){
            return res.status(401).send({ success: false, message: 'Permission denied' })
        }
        password =  await bcrypt.hash(password, 10);
        const user = await User.updateOne({},{$set: {name, email, password}},{upsert:true});
        if (!user) return res.status(400).send({ success: false, message: 'Unable to create user' })

        let token = await jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
        res.cookie(
            process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME,
            token,
            {
                sameSite: 'strict',
                path:'/',
                httpOnly:true
            }
        );
        res.status(200).send({ success: true, message: 'User Updated' })

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

        let token = await jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
        res.cookie(
            process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME,
            token,
            {
                sameSite: 'strict',
                path:'/',
                httpOnly:true
            }
        );
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

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userID },{name:1,email:1});
        if (user) return res.status(200).send({ success: true, message: 'User Found',result:user })
        return res.status(400).send({ success: false, message: 'User Not Found' })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });

    }
}

module.exports={
    signUp:signUp,
    login:login,
    logout:logout,
    getUser:getUser
}
