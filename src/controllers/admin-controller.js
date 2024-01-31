
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

exports.getSubject = (req, res, next) => {
    const { sub } = req.params;
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

exports.getUserById = async (req, res, next) => {
    try {

        const { userId } = req.params;

        const user = await prisma.users.findFirst({
            where: {
                user_id: Number(userId),
            }
        });

        // const user = await prisma.$queryRaw`select * from users where user_id = ${userId}`;

        if (!user){
            return createError(404, "User not found")
        }

        res.json({ user })

        next();

    }catch(err){
        next(err);
    }
};

exports.createUser = (req, res, next) => {
    res.json({ message : "Create Users" })
};

exports.editUserById = (req, res, next) => {
    const { userId } = req.params;
    res.json({ userId, message : "Edit User By ID" });
};

exports.getTeacher = (req, res, next) => {
    res.json({ message : "Get Teacher" })
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

exports.getBuilds = (req, res, next) => {
    res.json({ message : "Get Builds" })
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