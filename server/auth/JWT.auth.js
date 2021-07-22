const jwt = require("jsonwebtoken");
const userModal = require("../models/users.model");
const { UnAuthorized } = require("../utils/error.handling");

const Authentication = async function (req, res, next) {
    try {

        if(!req.header("Authorization")) {
            throw new UnAuthorized("Header not found")
        }
        // get token in request header 
        const token = req.header("Authorization").replace("Bearer ", "");
        // varify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
        // find token in database to check authentication if token is find in db so 
        // the user is access the protected routes if user is not login so he/she can't
        const user = await userModal.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new UnAuthorized("Invalid token, Please login before get this resource");
        }

        // if user is login so we attach user token and the user with request object
        req.token = token;
        req.user = user;
        next();
    }
    catch (e) {
       next(e)
    }
}

module.exports = Authentication;