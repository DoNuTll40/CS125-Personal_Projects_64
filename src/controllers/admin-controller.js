const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const { createUser, createSections } = require("../validators/admin-validator");
const bcrypt = require("bcryptjs");

exports.getSubject = (req, res, next) => {
  res.json({ sub, message: "get sub" });
};

exports.createSubject = (req, res, next) => {
  const { name, number, major_id } = req.body;
  res.json({ name, number, major_id, message: "create sub" });
};

exports.getUsers = async (req, res, next) => {
  const user = await prisma.users.findMany();
  res.json({ user });
};

exports.createUser = async (req, res, next) => {
  try {
    const value = await createUser.validateAsync(req.body);

    const { user_password, class_id } = req.body;
    const hash = await bcrypt.hash(user_password, 10);
    const userCreate = await prisma.users.create({
      data: {
        ...value,
        user_password: hash,
        class: {
          connect: {
            class_id: Number(class_id),
          },
        },
        major: {
          connect: {
            major_id: Number
          }
        }
      },
    });
    console.log(userCreate);
    res.json({ userCreate, message: "Create uers success" });
  } catch (err) {
    console.log(err);
    return createError(400, "Can't create users");
  }
};

exports.editUserById = (req, res, next) => {
  const { userId } = req.params;
  res.json({ userId, message: "Edit User By ID" });
};

exports.createTeacher = (req, res, next) => {
  res.json({ message: "Create Teacher" });
};

exports.getMajor = (req, res, next) => {
  res.json({ message: "Get Major" });
};

exports.createMajor = (req, res, next) => {
  res.json({ message: "Create Major" });
};

exports.getSections = (req, res, next) => {
  res.json({ message: "Get Sections" });
};

exports.createSections = (req, res, next) => {
  res.json({ message: "Create Sections" });
};

exports.getBuilds = async (req, res, next) => {
  const builds = await prisma.builds.findMany();
  res.json({ builds });
};

exports.createBuilds = (req, res, next) => {
  res.json({ message: "Create Builds" });
};

exports.getRoom = async (req, res, next) => {4
  const rooms = await prisma.room.findMany({}) // ถ้าจะกำหนด limit ใช้ take ในการ limit
  res.json({ rooms ,message: "Get Rooms" });
};

exports.createRoom = (req, res, next) => {
  res.json({ message: "Create Rooms" });
};

exports.getClass = async (req, res, next) => {
  const useClass = await prisma.class.findMany();
  res.json({ useClass, message: "Get Rooms" });
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const dUsers = await prisma.users.delete({
      where: {
        user_id: Number(userId),
      },
    })
    res.json({ resault: dUsers })
  } catch (err) {
    console.log(err)
    return createError(400, "Delete not found");
  }
};
