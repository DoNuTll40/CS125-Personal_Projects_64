
const joi = require("joi")

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