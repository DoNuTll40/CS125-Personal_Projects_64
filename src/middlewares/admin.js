
const createError = require("../utils/createError")

const admin = async ( req, res, next ) => {
    try {
        if(req.user.user_role !== "ADMIN"){
            return createError(403, "Forbidden");
        }
        next();
    }catch(err){
        next(err);
    };
};

module.exports = admin;