
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user-services")

exports.register = async (req, res, next) => {
    try {
        const { username, password, role, classId } = req.body;

        if (!username || !password) {
            return createError(400, "username or password are require");
        }

        if(typeof username !== "string" || typeof password !== "string"){
            return createError(400, "username or password invalid")
        }

        const isUserExist = await userService.getUserByUsername(username);

        if(isUserExist){
            return createError(400, "User already exist");
        }

        const hasPassword = await bcrypt.hash(password, 10)

        await userService.createUser(username, hasPassword, role, classId)

        res.json({ message : "register success" })
    }catch(err){
        next(err)
    }
    
};

exports.login = (req, res, next) => {
    try {
        res.json({ message : "path login"})
    }catch(err){
        next(err)
    }
};