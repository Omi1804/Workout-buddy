const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requireAuth = async(req, res, next) => {

    //verify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    // as the header is in form of Bearer qwertyuiasdfghxcvbn so 
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET_JWT_KEY )

        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth