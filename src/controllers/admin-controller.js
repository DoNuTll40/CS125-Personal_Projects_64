const fs = require("fs");
const prisma = require("../configs/prisma");
const cloudUpload = require("../utils/cloudupload");
const createError = require("../utils/createError");
const {
  createUser,
  createSchedules,
  createSubjects,
  createRooms,
  createBuilds,
} = require("../validators/admin-validator");
const bcrypt = require("bcryptjs");

exports.getSubject = async (req, res, next) => {
  const sub = await prisma.subject.findMany({
    include: {
      major: true,
      room: true,
    },
  });
  res.json({ sub, message: "get sub" });
};

exports.createSubject = async (req, res, next) => {
  try {
    const value = await createSubjects.validateAsync(req.body);
    const { major_id, room_id } = req.body;
    const cSub = await prisma.subject.create({
      data: {
        ...value,
        room_id: Number(room_id),
        major_id: Number(major_id),
      },
    });
    res.json({ cSub, message: "create sub" });
  } catch (err) {
    next(err);
  }
};

exports.deleteSubjects = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const deleteSub = await prisma.subject.delete({
      where: {
        sub_id: Number(subjectId),
      },
    });
    res.json({ deleteSub });
  } catch (err) {
    next(err);
  }
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

    // req.files.forEach((file) => {
    //   fs.unlinkSync(file.path);
    // });

    res.json({ edit });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getMajor = async (req, res, next) => {
  const major = await prisma.major.findMany();
  res.json({ major, message: "Get Major" });
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

exports.createBuild = async (req, res, next) => {
  try {
    const value = await createBuilds.validateAsync(req.body);

    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);
    const cBuild = await prisma.builds.create({
      data: {
        ...value,
        build_image: imageUrlArray[0],
      },
    });

    res.json({ cBuild, message: "Create Builds" });
  } catch (err) {
    next();
    console.log(err);
    return createError(400, "Error create build");
  }
};

exports.deleteBuild = async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const dDelete = await prisma.builds.delete({
      where: {
        build_id: Number(buildId),
      },
    });
    res.json({ dDelete });
  } catch (err) {
    next();
    console.log(err);
    return createError(400, "Error delete build");
  }
};

exports.getRoom = async (req, res, next) => {
  const rooms = await prisma.room.findMany({
    include: {
      build: true,
    },
  }); // ถ้าจะกำหนด limit ใช้ take ในการ limit
  res.json({ rooms, message: "Get Rooms" });
};

exports.createRoom = async (req, res, next) => {
  try {
    const value = await createRooms.validateAsync(req.body);
    const { build_id } = req.body;
    const room = await prisma.room.create({
      data: {
        ...value,
        build: {
          connect: {
            build_id: Number(build_id),
          },
        },
      },
    });
    res.json({ room, message: "Create Rooms" });
  } catch (err) {
    next(err);
    console.log(err);
    return createError(400, "Error create room");
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const removeRoom = await prisma.room.delete({
      where: {
        room_id: Number(roomId),
      },
    });
    res.json({ removeRoom });
  } catch (err) {
    next(err);
    console.log(err);
    createError(400, "Error delete room");
  }
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
                build: true,
              },
            },
            major: true,
          },
        },
      },
    });
    res.json({ schedule });
  } catch (err) {
    next(err);
    createError(400, "Error Get Schedule");
  }
};

exports.createSchedule = async (req, res, next) => {
  try {
    const value = await createSchedules.validateAsync(req.body);

    const checkSched = await prisma.schedule.findMany({
      where: {
        AND: [
          { class_id: value.class_id },
          { sched_day: value.sched_day },
          { sched_time: value.sched_time },
        ],
      },
    });
    console.log(checkSched);
    if (checkSched.length > 0) {
      const output = checkSched.map( el => ({
        sched_day: el.sched_day,
        sched_time: el.sched_time,
      }))
      createError(400, `ระบบไม่สามารถเพิ่มข้อมูลได้เนื่องจากมีรายการที่ซ้ำกันกับข้อมูลก่อนหน้านี้ ${JSON.stringify(output)}`);
    }

    // const createSchedule = await prisma.schedule.create({
    //   data: {
    //     ...value,
    //   },
    // });
    res.json({ checkSched });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rs = await prisma.schedule.delete({
      where: {
        sched_id: +id,
      },
    });
    res.json({ rs });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.teacherSchedule = async (req, res, next) => {
  try {
    const getSchedule = await prisma.schedule.findMany({
      include: {
        class: {
          include: {
            section: true,
          },
        },
        subject: {
          include: {
            major: true,
            room: {
              include: {
                build: true,
              },
            },
          },
        },
      },
      where: {
        user_id: Number(req.user.user_id),
      },
    });
    res.json({ getSchedule });
  } catch (err) {
    next(err);
    console.log(err);
    createError(400, "Error teacher schedule");
  }
};
