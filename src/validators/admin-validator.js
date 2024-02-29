
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
    confirmPassword: joi.string().strip(),
    user_identity: joi.string().required(),
    user_image: joi.string().empty('').default("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU"),
    class_id: joi.number().required().strip()
});

exports.createSubjects = joi.object({
    sub_name: joi.string().required(),
    sub_code: joi.string().required(),
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
    build_image: joi.string().strip(),
});

exports.createRooms = joi.object({
    room_name: joi.string().required(),
    room_number: joi.string().required(),
    build_id: joi.number().required().strip()
});

exports.createSchedules = joi.object({
    sched_day: joi.string().required(),
    sched_time: joi.string().required(),
    sched_count: joi.number().required(),
    class_id: joi.number().required(),
    sub_id: joi.number().required(),
    user_id: joi.number().required()
})