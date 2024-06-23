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
    const skip = (page - 1) * limit; // คำนวณตำแหน่งเริ่มต้นในการดึงข้อมูล

    console.log(role);
    const search = decodeURIComponent(searchTerm)

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
                }
              },
              {
                user_nickname: {
                  contains: search
                }
              },
              {
                user_identity: {
                  contains: search
                }
              },
              {
                user_phone: {
                  contains: search.replace(/-/g, '')
                }
              },
              {
                user_email: {
                  contains: search
                }
              }
            ]
          },
          role !== "" ? { user_role: role } : {},
          {
            NOT: {
              user_role: "ADMIN",
            },
          },
          classRoom !== "" ? { class: { class_name: { contains: classRoom } } } : {}
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
          classRoom !== "" ? { class: { class_name: classRoom } } : {}
        ],
      },
      include: {
        class: true, // รวมข้อมูล class ที่เกี่ยวข้องด้วย
      },
      take: limit, // จำกัดจำนวนข้อมูลที่ดึงมา
      skip: skip, // ข้ามข้อมูลตามจำนวนที่คำนวณได้
    });

    if(get_user.length === 0){
      return createError(400, "ไม่พบข้อมูลผู้ใช้ในระบบ")
    }

    const countMen = get_user.filter((user) => ["เด็กชาย", "นาย"].includes(user.user_nameprefix)).length;
    const countWoman = get_user.filter((user) => ["เด็กหญิง", "นางสาว", "นาง"].includes(user.user_nameprefix)).length;

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

    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

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

exports.createMajor = async (req, res, next) => {
  try {
    const value = await createMajors.validateAsync(req.body);

    if (value.major_name === "") {
      return createError(400, "กรุณากรอกข้อมูลให้ครบ!");
    }

    if (typeof value.major_name !== "string") {
      return createError(400, "ข้อมูลไม่ใช่รูปแบบข้อความ");
    }

    const checkMajor = await prisma.major.findFirst({
      where: {
        ...value,
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
      return createError(400, "ระบบไม่พบเลข ID ห้องที่อยู่ในฐานข้อมูล");
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
    createError(400, "Error delete room");
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
          ...value,
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

    const upClass = await prisma.class.update({
      where: {
        class_id: Number(id),
      },
      data: {
        ...value,
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

    if (checkSched.length > 0) {
      const output = checkSched.map((el) => ({
        sched_day: el.sched_day,
        sched_time: el.sched_time,
      }));
      createError(
        400,
        `ระบบไม่สามารถเพิ่มข้อมูลได้เนื่องจากมีรายการที่ซ้ำกันกับข้อมูลก่อนหน้านี้ ${JSON.stringify(
          output
        )}`
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
        user_id: Number(req.user.user_id),
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
    createError(400, "Error teacher schedule");
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
    const banner = await prisma.banner.create({
      data: {
        ...value,
      },
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
