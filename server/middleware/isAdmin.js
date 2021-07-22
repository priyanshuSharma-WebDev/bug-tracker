const { UnAuthorized } = require("../utils/error.handling")

const isAdmin = (req,res,next) => {
    if(req.user.isAdmin) {
       return next()
    }
    throw new UnAuthorized("You don't have permission to access this route")
}

module.exports = isAdmin