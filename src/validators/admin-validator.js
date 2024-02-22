
const joi = require("joi")

exports.createUser = joi.object({
    user_username: joi.string().required(),
    user_password: joi.string().required().strip(),
    user_role: joi.string().required(),
    user_firstname: joi.string().required(),
    user_lastname: joi.string().required(),
    user_nickname: joi.string().required(),
    user_email: joi.string().required(),
    user_phone: joi.string().required(),
    user_address: joi.string().required(),
    user_brithday: joi.string().required(),
    confirmPassword: joi.string().required().strip(),
    user_identity: joi.string().required(),
    user_image: joi.string().required().strip(),
    class_id: joi.number().required().strip()
});

exports.createSubject = joi.object({
    sub_name: joi.string().required(),
    sub_day: joi.string().required(),
    sub_time: joi.string().required(),
    room_id: joi.number().required().strip(),
    major_id: joi.number().required().strip()
});

exports.createMajor = joi.object({
    major_name: joi.string().required()
});

exports.createSections = joi.object({
    sec_type: joi.string().required()
});

exports.createBuilds = joi.object({
    build_name: joi.string().required(),
    build_number: joi.string().required(),
    build_image: joi.string().required()
});

exports.createRoom = joi.object({
    room_name: joi.string().required(),
    room_number: joi.number().required(),
    build_id: joi.number().required().strip()
});