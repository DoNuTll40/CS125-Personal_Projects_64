
require('dotenv').config();
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const userService = require("../services/user-services");

const authenticate = async ( req, res, next ) => {
    try {

        const { authorization } = req.headers;

        if (!authorization){
            return createError(400, "Unauthorized");
        }

        const arrayToken = authorization.split(" ");
        const token = arrayToken[1];

        if (arrayToken[0] !== "Bearer" || !token){
            return createError(400, "Unauthorized")
        }

        try {
            
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (typeof payload !== "object" || !payload?.id || typeof payload.id !== "number"){
                return createError(400, "Payload not in correct format")
            }
    
            const user = await userService.getUserById(payload.id);
    
            if (!user){
                return createError(400, "User id not found");
            }
    
            req.user = user;
            next();
          } catch (err) {
            if (err.name === 'TokenExpiredError') {
              // โทเค็นหมดอายุ
              return createError(400, 'TokenExpiredError')
            } else {
              // ข้อผิดพลาดอื่นๆ
              console.log('Token verification failed:', err.message);
              return createError(400, 'Token verification failed : ' + err.message);
            }
          }

    }catch(err){
        next(err);
    };
};

module.exports = authenticate;