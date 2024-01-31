
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

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return createError(400, "username or password are require");
        }

        if(typeof username !== "string" || typeof password !== "string"){
            return createError(400, "username or password invalid")
        }

        const isUsernameExist = await userService.checkLoginUsername(username);
        const isPasswordExist = await userService.checkLoginUsername(password);

        if(!isUsernameExist || !isPasswordExist){
            return createError(400, "username or passwod invalid");
        }

        const token = jwt.sign({ id: isUsernameExist.user_id }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({ token ,message : "login success"})
    }catch(err){
        next(err)
    }
};

exports.adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
  
        if (!username || !password) {
            return createError(400, "username or password are require");
        }
  
        if(typeof username !== "string" || typeof password !== "string"){
            return createError(400, "username or password invalid")
        }

        const isUsernameExist = await userService.checkLoginUsername(username);
        const isPasswordExist = await userService.checkLoginUsername(password);

        if(!isUsernameExist || !isPasswordExist){
            return createError(400, "username or passwod invalid");
        }
  
        const token = jwt.sign({ id: isUsernameExist.user_id }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
  
        res.json({ token ,message : "login success"})
    }catch(err){
        next(err)
    }
  };