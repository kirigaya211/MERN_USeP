const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const roleMiddleware = (...allowedRoles)=>{
    return (req, res, next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({error:"You are not allowed to access this route"});
        }
        next();
    };
};
 




module.exports = roleMiddleware;
