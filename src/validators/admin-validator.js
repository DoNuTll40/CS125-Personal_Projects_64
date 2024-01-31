
const joi = require("joi")

exports.createUser = joi.object({
    user_username: joi.string().required(),
    user_password: joi.string().required(),
    user_role: joi.string().required(),
    user_firstname: joi.string().required(),
    user_lastname: joi.string().required(),
    user_nickname: joi.string().required(),
    user_email: joi.string().required(),
    user_phone: joi.string().required(),
    user_address: joi.string().required(),
    user_brithday: joi.string().required(),
    user_identity: joi.string().required(),
    class_id: joi.number().required().strip(),
});

exports.createTeacher = joi.object({
    teacher_firstname: joi.string().required(),
    teacher_lastname: joi.string().required(),
    teacher_nickname: joi.string().required(),
    teacher_email: joi.string().required(),
    teacher_phone: joi.string().required(),
    teacher_address: joi.string().required(),
    teacher_brithday: joi.string().required()
});

exports.createSubject = joi.object({
    sub_name: joi.string().required(),
    sub_day: joi.string().required(),
    sub_time: joi.string().required(),
    room_id: joi.number().required().strip(),
});

exports.createMajor = joi.object({
    major_name: joi.string().required(),
    major_type: joi.string().required(),
    subject_id: joi.number().required().strip(),
});

exports.createSections = joi.object({
    sec_number: joi.number().required(),
        
});

exports.createBuilds = joi.object({
    build_name: joi.string().required(),
    build_number: joi.string().required(),
});

exports.createRoom = joi.object({
    room_name: joi.string().required(),
    room_number: joi.number().required(),
    build_id: joi.number().required().strip(),
    sec_Teacher_id: joi.number().required().strip(),
});