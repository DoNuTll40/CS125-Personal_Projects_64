
const createError = require("../utils/createError")

const user = async ( req, res, next ) => {
    
    try {
        if(req.user.user_role !== "USER" && req.user.user_role !== "TEACHER"){
            return createError(403, "Forbidden");
        }
        next();
    }catch(err){
        next(err);
    };
};



module.exports = user;