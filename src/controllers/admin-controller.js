const fs = require("fs");
const prisma = require("../configs/prisma");
const cloudUpload = require("../utils/cloudupload");
const createError = require("../utils/createError");
const {
  createUser,
  createSections,
  updateUser,
} = require("../validators/admin-validator");
const bcrypt = require("bcryptjs");

exports.getSubject = async (req, res, next) => {
  const sub = await prisma.subject.findMany();
  res.json({ sub, message: "get sub" });
};

exports.createSubject = (req, res, next) => {
  const { name, number, major_id } = req.body;
  res.json({ name, number, major_id, message: "create sub" });
};

exports.getUsers = async (req, res, next) => {
  const user = await prisma.users.findMany({
    include: {
      class: true,
    },
  });
  res.json({ user });
};

exports.getUsersById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
      include: {
        class: true,
      },
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const value = await createUser.validateAsync(req.body);

    const { user_password, class_id } = req.body;

    const hash = await bcrypt.hash(user_password, 10);

    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);

    const userCreate = await prisma.users.create({
      data: {
        ...value,
        user_password: hash,
        user_image: imageUrlArray[0],
        class: {
          connect: {
            class_id: Number(class_id),
          },
        },
      },
    });

    res.json({ userCreate, message: "Create uers success" });
  } catch (err) {
    console.log(err);
    return createError(400, "Can't create users");
  }
};

exports.editUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const value = await createUser.validateAsync(req.body);
    const { user_password, class_id } = req.body;
    const edit = await prisma.users.update({
      where: {
        user_id: +userId,
      },
      data: {
        ...value,
        user_password,
        class: {
          connect: {
            class_id: Number(class_id),
          },
        },
      },
    });
    res.json({ edit });
  } catch (err) {
    next(err);
    console.log(err);
  }
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

exports.getRoom = async (req, res, next) => {
  const rooms = await prisma.room.findMany({}); // ถ้าจะกำหนด limit ใช้ take ในการ limit
  res.json({ rooms, message: "Get Rooms" });
};

exports.createRoom = (req, res, next) => {
  res.json({ message: "Create Rooms" });
};

exports.getClass = async (req, res, next) => {
  const useClass = await prisma.class.findMany();
  res.json({ useClass, message: "Get Rooms" });
};

exports.getClassByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const useClass = await prisma.class.findFirst({
      where: {
        class_id: Number(id),
      },
      include: {
        section: true,
      },
    });
    res.json({ useClass, message: "Get Rooms" });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const dUsers = await prisma.users.delete({
      where: {
        user_id: Number(userId),
      },
    });
    res.json({ resault: dUsers });
  } catch (err) {
    console.log(err);
    return createError(400, "Delete not found");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);

    const updateProfile = await prisma.users.update({
      where: { user_id: req.user.user_id },
      data: {
        user_image: imageUrlArray[0],
      },
    });

    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ updateProfile });
  } catch (err) {
    next(err);
  }
};

exports.getSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await prisma.schedule.findMany({
      where: {
        class_id: +id,
      },
      include: {
        class: true,
        user: true,
        subject: {
          include: {
            room: {
              include: {
                build: true
              }
            },
            major: true
          }
        },
      },
    });
    res.json({ schedule });
  } catch (err) {
    next(err);
    createError(400, "Error Get Schedule");
  }
};
