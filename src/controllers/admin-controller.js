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
  createClassrooms,
  createMajors,
  createBanners,
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

exports.getSubjectById = async (req, res, next) => {
  try {
    const { subId } = req.params;

    const sub = await prisma.subject.findFirst({
      where: {
        sub_id: Number(subId),
      },
    });

    res.json({
      result: "success!",
      sub,
      datetime: new Date().toLocaleDateString("th-TH"),
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.createSubject = async (req, res, next) => {
  try {
    const value = await createSubjects.validateAsync(req.body);
    const { major_id, room_id } = req.body;

    const checkSubName = await prisma.subject.findFirst({
      where: { sub_name: value.sub_name },
    });

    const checkSubNumber = await prisma.subject.findFirst({
      where: { sub_code: value.sub_code },
    });

    if (checkSubName) {
      return createError(400, "พบชื่อวิชาที่ซ้ำกันในระบบ");
    }

    if (checkSubNumber) {
      return createError(400, "พบรหัสวิชาที่ซ้ำกันในระบบ");
    }

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
    console.log(err);
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const value = await createSubjects.validateAsync(req.body);
    const { subjectId } = req.params;

    const checkSubject = await prisma.subject.findFirst({
      where: {
        sub_id: Number(subjectId),
      },
    });

    if (!checkSubject) {
      return createError(400, "ไม่พบข้อมูล ID ของรายวิชา");
    }

    const checkSubName = await prisma.subject.findFirst({
      where: {
        sub_name: value.sub_name,
        NOT: {
          sub_id: Number(subjectId),
        },
      },
    });

    const checkSubNumber = await prisma.subject.findFirst({
      where: {
        sub_code: value.sub_code,
        NOT: {
          sub_id: Number(subjectId),
        },
      },
    });

    if (checkSubName) {
      return createError(400, "พบชื่อวิชาที่ซ้ำกันในระบบ");
    }

    if (checkSubNumber) {
      return createError(400, "พบรหัสวิชาที่ซ้ำกันในระบบ");
    }

    const sub = await prisma.subject.update({
      where: {
        sub_id: Number(subjectId),
      },
      data: {
        ...value,
      },
    });

    res.json({ message: "Update subject success!", sub });
  } catch (err) {
    next(err);
    console.log(err);
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
    console.log(err);
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

exports.allGetUsers = async (req, res, next) => {
  try {
    const searchTerm = req.query.search || ""; // รับคีย์เวิร์ดการค้นหาจาก query parameters
    const limit = parseInt(req.query.limit) || 10; // จำนวนข้อมูลที่ต้องการดึง (ค่าเริ่มต้นเป็น 10)
    const role = req.query.role || "";
    const classRoom = req.query.class || "";
    const page = parseInt(req.query.page) || 1; // หน้าที่ต้องการดึง (ค่าเริ่มต้นเป็น 1)
    const skip = (page - 1) * limit;

    const search = decodeURIComponent(searchTerm);

    const totalUsers = await prisma.users.count({
      where: {
        AND: [
          {
            OR: [
              {
                user_firstname: {
                  contains: search,
                },
              },
              {
                user_lastname: {
                  contains: search,
                },
              },
              {
                user_nickname: {
                  contains: search,
                },
              },
              {
                user_identity: {
                  contains: search,
                },
              },
              {
                user_phone: {
                  contains: search.replace(/-/g, ""),
                },
              },
              {
                user_email: {
                  contains: search,
                },
              },
            ],
          },
          role !== "" ? { user_role: role } : {},
          {
            NOT: {
              user_role: "ADMIN",
            },
          },
          classRoom !== "" ? { class_id: Number(classRoom) } : {},
        ],
      },
    });

    const get_user = await prisma.users.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                user_firstname: {
                  contains: searchTerm,
                },
              },
              {
                user_lastname: {
                  contains: searchTerm,
                },
              },
              {
                user_nickname: {
                  contains: searchTerm,
                },
              },
              {
                user_identity: {
                  contains: searchTerm,
                },
              },
              {
                user_phone: {
                  contains: searchTerm,
                },
              },
              {
                user_email: {
                  contains: searchTerm,
                },
              },
            ],
          },
          role !== "" ? { user_role: role } : {},
          {
            NOT: {
              user_role: "ADMIN",
            },
          },
          classRoom !== "" ? { class_id: Number(classRoom) } : {},
        ],
      },
      include: {
        class: true, // รวมข้อมูล class ที่เกี่ยวข้องด้วย
      },
      take: limit, // จำกัดจำนวนข้อมูลที่ดึงมา
      skip: skip, // ข้ามข้อมูลตามจำนวนที่คำนวณได้
    });

    if (get_user.length === 0) {
      return createError(400, "ไม่พบข้อมูลผู้ใช้ในระบบ");
    }

    const countMen = get_user.filter((user) =>
      ["เด็กชาย", "นาย"].includes(user.user_nameprefix)
    ).length;
    const countWoman = get_user.filter((user) =>
      ["เด็กหญิง", "นางสาว", "นาง"].includes(user.user_nameprefix)
    ).length;

    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      resault: "success!",
      get_user,
      count: get_user.length,
      page,
      totalPages,
      skip,
      limit,
      woman: countWoman,
      man: countMen,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
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
    console.log(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const value = await createUser.validateAsync(req.body);

    const { user_password, class_id } = req.body;

    const checkIdentCreateUser = await prisma.users.findFirst({
      where: { user_identity: value.user_identity },
    });

    const checkEmailCreateUser = await prisma.users.findFirst({
      where: { user_email: value.user_email },
    });

    const checkUsernameCreateUser = await prisma.users.findFirst({
      where: { user_username: value.user_username },
    });

    if (checkIdentCreateUser) {
      return createError(400, "มีข้อมูลหมายเลขบัตรประชาชนนี้แล้ว");
    }

    if (checkEmailCreateUser) {
      return createError(400, "มีผู้ใช้งาน email นี้แล้ว");
    }
    if (checkUsernameCreateUser) {
      return createError(400, "มี username นี้อยู่ในระบบแล้ว, โปรดลองใหม่");
    }

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

    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ userCreate, message: "Create uers success" });
  } catch (err) {
    next(err);
    console.log(err);
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

    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ edit });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.changPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { password, newPassword, retypeNewPass } = req.body;

    if (!password || !newPassword || !retypeNewPass) {
      return createError(400, "กรุณากรอกข้อมูลให้ครบ");
    }

    const checkUser = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
    });

    if (!checkUser) {
      return createError(400, "ไม่พบผู้ใช้งาน");
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUser.user_password
    );

    if (!checkPassword) {
      return createError(400, "รหัสผ่านเดิมไม่ถูกต้อง โปรดเช็คอีกครั้ง");
    }

    if (newPassword !== retypeNewPass) {
      return createError(400, "รหัสผ่านไม่ตรงกัน");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const changePassword = await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        user_password: hashPassword,
      },
    });

    res.json({
      result: "success",
      user: changePassword,
      updateAt: new Date().toLocaleDateString("th-TH"),
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getMajor = async (req, res, next) => {
  const major = await prisma.major.findMany();
  res.json({ major, message: "Get Major" });
};

exports.getMajorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const major = await prisma.major.findFirst({
      where: {
        major_id: Number(id),
      },
    });

    res.json({ major });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.createMajor = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req);
    const value = await createMajors.validateAsync(req.body);

    if (value.major_name === "") {
      return createError(400, "กรุณากรอกข้อมูลให้ครบ!");
    }

    if (typeof value.major_name !== "string") {
      return createError(400, "ข้อมูลไม่ใช่รูปแบบข้อความ");
    }

    const checkMajor = await prisma.major.findFirst({
      where: {
        major_name: value.major_name,
      },
    });

    if (checkMajor) {
      return createError(400, "มีข้อมูลนี้อยู่ในระบบแล้ว");
    }

    const major = await prisma.major.create({
      data: {
        ...value,
      },
    });

    res.json({ message: "Create Major", major });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.updateMajors = async (req, res, next) => {
  try {
    const { majorId } = req.params;

    const value = await createMajors.validateAsync(req.body);

    const checkId = await prisma.major.findFirst({
      where: {
        major_id: Number(majorId),
      },
    });

    if (!checkId) {
      createError(400, "ไม่พบหมายเลข ID ที่ส่งมา");
    }

    if (value.major_name === "") {
      return createError(400, "กรุณากรอกข้อมูลให้ครบ!");
    }

    if (typeof value.major_name !== "string") {
      return createError(400, "ข้อมูลไม่ใช่รูปแบบข้อความ");
    }

    const checkMajorName = await prisma.major.findFirst({
      where: {
        major_name: value.major_name,
        NOT: {
          major_id: Number(majorId),
        },
      },
    });

    if (checkMajorName) {
      return createError(400, "มีชื่อกลุ่มวิชานี้ในระบบแล้ว");
    }

    const major = await prisma.major.update({
      where: {
        major_id: Number(majorId),
      },
      data: {
        ...value,
      },
    });

    res.json({ message: "Update major success", major });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteMajor = async (req, res, next) => {
  try {
    const { majorId } = req.params;
    const major = await prisma.major.delete({
      where: {
        major_id: Number(majorId),
      },
    });

    res.json({ message: `Delete major id ${Number(majorId)} success!` });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getBuilds = async (req, res, next) => {
  const builds = await prisma.builds.findMany();
  res.json({ builds });
};

exports.getBuildById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const build = await prisma.builds.findFirst({
      where: {
        build_id: Number(id),
      },
    });
    res.json({ build });
  } catch (err) {
    console.log(err);
  }
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

    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ cBuild, message: "Create Builds" });
  } catch (err) {
    next();
    console.log(err);
    return createError(400, "Error create build");
  }
};

exports.updateBuild = async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const value = await createBuilds.validateAsync(req.body);

    if (!req.files || req.files.length === 0) {
      const upBuild = await prisma.builds.update({
        where: {
          build_id: Number(buildId),
        },
        data: {
          ...value,
        },
      });
      res.json({ message: "Update build success!", upBuild });
    } else {
      const imagePromise = req.files.map((file) => {
        return cloudUpload(file.path);
      });

      const imageUrlArray = await Promise.all(imagePromise);
      const upBuild = await prisma.builds.update({
        where: {
          build_id: Number(buildId),
        },
        data: {
          ...value,
          build_image: imageUrlArray[0],
        },
      });

      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      res.json({ message: "Update build success!", upBuild });
    }
  } catch (err) {
    next(err);
    console.log(err);
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

exports.getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.findFirst({
      where: {
        room_id: Number(id),
      },
    });

    res.json({
      result: "success!",
      room,
      datetime: new Date().toLocaleDateString("th-TH"),
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const value = await createRooms.validateAsync(req.body);
    const { build_id } = req.body;

    const checkRoomName = await prisma.room.findFirst({
      where: { room_name: value.room_name },
    });

    const checkRoomNumber = await prisma.room.findFirst({
      where: { room_number: value.room_number },
    });

    if (checkRoomName) {
      return createError(400, "มีชื่อห้องนี้แล้ว");
    }

    if (checkRoomNumber) {
      return createError(400, "มีหมายเลขห้องนี้แล้ว");
    }

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
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const value = await createRooms.validateAsync(req.body);
    const { build_id } = req.body;

    const checkRoomId = await prisma.room.findFirst({
      where: {
        room_id: Number(roomId),
      },
    });

    if (!checkRoomId) {
      return next(createError(400, "ระบบไม่พบเลข ID ห้องที่อยู่ในฐานข้อมูล"));
    }

    const checkRoomNumber = await prisma.room.findFirst({
      where: {
        room_number: value.room_number,
        NOT: { room_id: Number(roomId) },
      },
    });

    if (checkRoomNumber) {
      return next(createError(400, "ข้อมูลหมายเลขห้องซ้ำกันในระบบ"));
    }

    const room = await prisma.room.update({
      where: {
        room_id: Number(roomId),
      },
      data: {
        ...value,
        build: {
          connect: {
            build_id: Number(build_id),
          },
        },
      },
    });

    res.json({ message: "Update room success!", room });
  } catch (err) {
    next(err);
    console.log(err);
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
  }
};

exports.getClass = async (req, res, next) => {
  const useClass = await prisma.class.findMany({
    include: {
      section: true,
    },
  });
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

exports.createClass = async (req, res, next) => {
  try {
    const { sec_id } = req.body;
    const value = await createClassrooms.validateAsync(req.body);
    const checkClass = await prisma.class.findFirst({
      where: {
        class_name: value.class_name,
      },
    });

    if (checkClass) {
      return createError(
        400,
        "หมายเลขชั้นมีการซ้ำกัน โปรดตรวจสอบแล้วทำรายการใหม่"
      );
    } else {
      const createC = await prisma.class.create({
        data: {
          class_name: value.class_name,
          section: {
            connect: {
              sec_id: +sec_id,
            },
          },
        },
      });
      res.json({ createC, message: "Create class successful" });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await createClassrooms.validateAsync(req.body);

    const checkClassID = await prisma.class.findFirst({
      where: {
        class_id: Number(id),
      },
    });

    if (!checkClassID) {
      return createError(400, `ระบบไม่พบหมายเลข ${Number(id)} ในฐานข้อมูล`);
    }

    const checkClassName = await prisma.class.findFirst({
      where: {
        class_name: value.class_name,
        NOT: {
          class_id: Number(id),
        },
      },
    });

    if (checkClassName) {
      return createError(400, "ระบบตรวจพบชื่อห้องที่ซ้ำกัน");
    }

    const upClass = await prisma.class.update({
      where: {
        class_id: Number(id),
      },
      data: {
        class_name: value.class_name,
      },
    });

    res.json({ message: "Update class success!", upClass });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteClassById = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const deleteClass = await prisma.class.delete({
      where: {
        class_id: +classId,
      },
    });
    res.json({ message: "Delete class success" });
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
    next(err);
    console.log(err);
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
    console.log(err);
  }
};

exports.updateProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);

    const updateProfile = await prisma.users.update({
      where: { user_id: +userId },
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
    console.log(err);
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
    console.log(err);
  }
};

exports.getScheduleSearch = async (req, res, next) => {
  try {
    const class_id = req.query.classID || "";
    const sched_day = req.query.day || "";

    const day = decodeURIComponent(sched_day);

    const schedule = await prisma.schedule.findMany({
      where: {
        AND: [
          class_id && {
            class: {
              class_id: Number(class_id),
            },
          },
          sched_day && {
            sched_day: {
              contains: day,
            },
          },
        ].filter(Boolean),
      },
      include: {
        subject: {
          include: {
            room: {
              include: {
                build: true,
              },
            },
          },
        },
        user: true,
        class: true,
      },
      orderBy: {
        sched_time: "asc",
      },
    });

    res.json({ schedule });
  } catch (err) {
    next(err);
    console.log(err);
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
          },
        },
      },
    });

    if (checkSched.length > 0) {
      const output = checkSched.map(
        (el) =>
          `วัน: ${el.sched_day}, เวลา: ${el.sched_time}, ชื่อวิชา: ${el.subject?.sub_name}, คุณครู: ${el.user?.user_firstname} ${el.user?.user_lastname}`
      );
      createError(
        400,
        `ระบบไม่สามารถเพิ่มข้อมูลได้เนื่องจากมีรายการที่ซ้ำกันกับข้อมูลก่อนหน้านี้ ${output[0]}`
      );
    }

    const checkTeacher = await prisma.schedule.findMany({
      where: {
        AND: [
          { user_id: value.user_id },
          { user: { user_role: "TEACHER" } },
          { sched_day: value.sched_day },
          { sched_time: value.sched_time },
        ],
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
          },
        },
      },
    });

    if (checkTeacher.length > 0) {
      const output = checkTeacher.map(
        (el) =>
          `วัน: ${el.sched_day}, เวลา: ${el.sched_time}, ชื่อวิชา: ${el.subject?.sub_name}, คุณครู: ${el.user?.user_firstname} ${el.user?.user_lastname}, สอนที่ห้อง: ${el.class.class_name}`
      );
      createError(
        400,
        `ระบบไม่สามารถเพิ่มข้อมูลได้เนื่องจากการสอนใน ${output.join(", ")}`
      );
    }

    function addOneHourToTimeRange(timeRange) {
      // แยกช่วงเวลาโดยใช้ "-"
      const [startTime, endTime] = timeRange.split("-");

      // แปลงเวลาเริ่มต้นและเวลาสิ้นสุดเป็น Date objects
      const startDate = new Date(`1970-01-01T${startTime}:00`);
      const endDate = new Date(`1970-01-01T${endTime}:00`);

      // บวก 1 ชั่วโมงให้กับเวลาเริ่มต้นและเวลาสิ้นสุด
      startDate.setHours(startDate.getHours() + 1);
      endDate.setHours(endDate.getHours() + 1);

      // แปลงกลับเป็นเวลาที่จัดรูปแบบใหม่
      const newStartTime = startDate.toTimeString().slice(0, 5);
      const newEndTime = endDate.toTimeString().slice(0, 5);

      // รวมเวลาเริ่มต้นและเวลาสิ้นสุดกลับเป็นช่วงเวลา
      return `${newStartTime}-${newEndTime}`;
    }

    if (value.sched_count === 2) {
      const schedTime = addOneHourToTimeRange(value.sched_time);

      const TeacherCheckTime = await prisma.schedule.findMany({
        where: {
          AND: [
            { sched_day: value.sched_day },
            { user_id: value.user_id },
            { user: { user_role: "TEACHER" } },
            { sched_time: schedTime },
          ],
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
            },
          },
        },
      });

      if (TeacherCheckTime.length > 0) {
        const output = TeacherCheckTime.map(
          (el) =>
            `วัน: ${el.sched_day}, เวลา: ${el.sched_time}, ชื่อวิชา: ${el.subject?.sub_name}, คุณครู: ${el.user?.user_firstname} ${el.user?.user_lastname}, สอนที่ห้อง: ${el.class.class_name}`
        );
        createError(
          400,
          `ระบบไม่สามารถเพิ่มข้อมูลเป็น 2 คาบได้เนื่องจากมีการสอนในคาบถัดไป ${output[0]}`
        );
      }
    }

    function DownOneHourToTimeRange(timeRange) {
      // แยกช่วงเวลาโดยใช้ "-"
      const [startTime, endTime] = timeRange.split("-");

      // แปลงเวลาเริ่มต้นและเวลาสิ้นสุดเป็น Date objects
      const startDate = new Date(`1970-01-01T${startTime}:00`);
      const endDate = new Date(`1970-01-01T${endTime}:00`);

      // บวก 1 ชั่วโมงให้กับเวลาเริ่มต้นและเวลาสิ้นสุด
      startDate.setHours(startDate.getHours() - 1);
      endDate.setHours(endDate.getHours() - 1);

      // แปลงกลับเป็นเวลาที่จัดรูปแบบใหม่
      const newStartTime = startDate.toTimeString().slice(0, 5);
      const newEndTime = endDate.toTimeString().slice(0, 5);

      // รวมเวลาเริ่มต้นและเวลาสิ้นสุดกลับเป็นช่วงเวลา
      return `${newStartTime}-${newEndTime}`;
    }

    const schedTime = DownOneHourToTimeRange(value.sched_time)

    const teacherChackTime = await prisma.schedule.findMany({
      where: {
        AND: [
          { user_id: value.user_id },
          { user: { user_role: 'TEACHER' } },
          { sched_day: value.sched_day },
          { sched_time: schedTime },
          { sched_count: 2 },
        ]
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
          },
        },
      },
    })

    if(teacherChackTime.length > 0){
      const output = teacherChackTime.map(
        (el) =>
          `วัน: ${el.sched_day}, เวลา: ${el.sched_time}, ชื่อวิชา: ${el.subject?.sub_name}, คุณครู: ${el.user?.user_firstname} ${el.user?.user_lastname}, สอนที่ห้อง: ${el.class.class_name}`
      );
      createError(
        400,
        `ระบบไม่สามารถเพิ่มข้อมูลได้เนื่องจากคุณครูมีการเรียนการสอน ${output[0]}`
      );
    }

    const createSchedule = await prisma.schedule.create({
      data: {
        ...value,
      },
    });

    res.json({ createSchedule });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await createSchedules.validateAsync(req.body);

    const checkID = await prisma.schedule.findFirst({
      where: {
        sched_id: Number(id),
      },
    });

    if (!checkID) {
      return createError(400, "ระบบไม่พบ id ขอตารางเรียนนี้");
    }

    // const checkSched = await prisma.schedule.findMany({
    //   where: {
    //     AND: [
    //       { class_id: value.class_id },
    //       { sched_day: value.sched_day },
    //       { sched_time: value.sched_time },
    //     ],
    //   },
    // });

    // if (checkSched.length > 0) {
    //   const output = checkSched.map((el) => ({
    //     sched_day: el.sched_day,
    //     sched_time: el.sched_time,
    //   }));
    //   createError(
    //     400,
    //     `ระบบไม่สามารถเพิ่มข้อมูลได้เนื่องจากมีรายการที่ซ้ำกันกับข้อมูลก่อนหน้านี้ ${JSON.stringify(
    //       output
    //     )}`
    //   );
    // }

    const update = await prisma.schedule.update({
      where: {
        sched_id: Number(id),
      },
      data: {
        ...value,
      },
    });

    res.json({ message: "Update schedule success!", update });
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
    const userId = req.query.userId;

    const getSchedule = await prisma.schedule.findMany({
      include: {
        user: true,
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
        user_id: userId ? Number(userId) : Number(req.user.user_id),
      },
      orderBy: [
        {
          sched_day: "asc",
        },
      ],
    });
    res.json({ getSchedule });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getBanner = async (req, res, next) => {
  try {
    const dateTime = new Date();

    const banner = await prisma.banner.findMany({
      orderBy: {
        b_enddate: "desc",
      },
    });

    res.json({ banner, resault: "success!", dateTime });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.getBannerByID = async (req, res, next) => {
  try {
    const { bannerID } = req.params;
    const dateTime = new Date();

    const banner = await prisma.banner.findFirst({
      where: {
        b_id: Number(bannerID),
      },
    });

    res.json({ banner, resault: "success!", dateTime });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.updateBanner = async (req, res, next) => {
  try {
    const { bannerId } = req.params;
    const value = await createBanners.validateAsync(req.body);
    const dateTime = new Date();

    if (!req.files || req.files.length === 0) {
      const banner = await prisma.banner.update({
        where: {
          b_id: Number(bannerId),
        },
        data: {
          ...value,
        },
      });

      res.json({ banner, resault: "success!", dateTime });
    } else {
      const imagePromise = req.files.map((file) => {
        return cloudUpload(file.path);
      });

      const imageUrlArray = await Promise.all(imagePromise);

      const banner = await prisma.banner.update({
        where: {
          b_id: Number(bannerId),
        },
        data: {
          ...value,
          b_url: imageUrlArray[0],
        },
      });

      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      res.json({ banner, resault: "success!", dateTime });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.updateStatusBanner = async (req, res, next) => {
  try {
    const { b_status } = req.body;
    const { bannerId } = req.params;

    const chechId = await prisma.banner.findFirst({
      where: {
        b_id: Number(bannerId),
      },
    });

    if (!chechId) {
      return next(createError(400, "ไม่พบไอดีของแบนเนอร์แล้ว"));
    }

    const banner = await prisma.banner.update({
      where: {
        b_id: Number(bannerId),
      },
      data: {
        b_status,
      },
    });

    res.json({ banner, resault: "success!" });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.createBanner = async (req, res, next) => {
  try {
    const value = await createBanners.validateAsync(req.body);

    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);

    const banner = await prisma.banner.create({
      data: {
        ...value,
        b_url: imageUrlArray[0],
      },
    });

    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ message: "Create banner success!", banner });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const { bannerId } = req.params;
    const dateTime = new Date();

    const checkBanner = await prisma.banner.findFirst({
      where: {
        b_id: Number(bannerId),
      },
    });

    if (!checkBanner) {
      return createError(
        400,
        `ระบบไม่พบหมายเลข ID ${Number(bannerId)}, ในฐานข้อมูล`
      );
    }

    const banner = await prisma.banner.delete({
      where: {
        b_id: Number(bannerId),
      },
    });

    res.json({ banner, resault: "success!", dateTime });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
