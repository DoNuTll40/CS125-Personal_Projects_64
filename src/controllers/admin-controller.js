
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

exports.getSubject = (req, res, next) => {
    res.json({ sub, message : "get sub" })
};

exports.createSubject = (req, res, next) => {
    const { name, number, major_id } = req.body;
    res.json({ name, number, major_id, message : "create sub" })
};

exports.getUsers = async (req, res, next) => {
    const user = await prisma.users.findMany();
    res.json({ user })
};

exports.createUser = (req, res, next) => {
    res.json({ message : "Create Users" })
};

exports.editUserById = (req, res, next) => {
    const { userId } = req.params;
    res.json({ userId, message : "Edit User By ID" });
};

exports.getTeacher = async (req, res, next) => {
    const teacher = await prisma.teacher.findMany();
    res.json({ teacher })
};

exports.createTeacher = (req, res, next) => {
    res.json({ message : "Create Teacher" })
};

exports.getMajor = (req, res, next) => {
    res.json({ message : "Get Major" })
};

exports.createMajor = (req, res, next) => {
    res.json({ message : "Create Major" })
};

exports.getSections = (req, res, next) => {
    res.json({ message : "Get Sections" })
};

exports.createSections = (req, res, next) => {
    res.json({ message : "Create Sections" })
};

exports.getBuilds = async (req, res, next) => {
    const builds = await prisma.builds.findMany();
    res.json({ builds })
};

exports.createBuilds = (req, res, next) => {
    res.json({ message : "Create Builds" })
};

exports.getRoom = (req, res, next) => {
    res.json({ message : "Get Rooms" })
};

exports.createRoom = (req, res, next) => {
    res.json({ message : "Create Rooms" })
};