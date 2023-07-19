const jwt = require('jsonwebtoken');

const AuthCheck = async(req,res,next)=>{
    try {
        const cookie = req.headers.cookie;
         if(!cookie) return res.status(401).send({ success: false, message: 'Access denied' });
         let token = cookie.split('=')[1];
          let payload = await jwt.verify(token,process.env.JWT_SECRET)
        if(payload){
            next()
        }
        else{
            return res.status(401).send({ success: false, message: 'Access denied' });
        }
        
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Access denied' });

    }
}

module.exports={
    AuthCheck:AuthCheck
}