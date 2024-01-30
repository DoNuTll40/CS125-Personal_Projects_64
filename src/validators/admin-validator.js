
const joi = require("joi")

exports.createUser = joi.object({});

exports.createTeacher = joi.object({})

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

exports.createSections = joi.object({});

exports.createBuilds = joi.object({});

exports.createRoom = joi.object({
    room_name: joi.string().required(),
    room_number: joi.number().required(),
    build_id: joi.number().required().strip(),
    sec_Teacher_id: joi.number().required().strip(),
});