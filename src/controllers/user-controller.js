const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

exports.table = async (req, res, next) => {
  const class_id = req.user.class.class_id;
  try {
    const schedule = await prisma.schedule.findMany({
      where: {
        class_id,
      },
      include: {
        class: true,
        user: true,
        subject: true,
      },
    });
    res.json({ schedule, message: "welcome to my table" });
  } catch (err) {
    next(err);
  }
};

exports.getTableById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const schedule = await prisma.schedule.findFirst({
      where: {
        sched_id: Number(id),
      },
      include: {
        class: {
          include: {
            section: true
          }
        },
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
    console.log(err)
    next(err);
  }
};

exports.getUserBID = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getUserBid = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
    });

    if (getUserBid === "") {
      return createError(400, "User not found");
    }

    res.json({ getUserBid });
  } catch (err) {
    console.log(err);
    return createError(400, "Error get user by id", "Error message", err);
  }
};

exports.getClass = async (req, res, next) => {
  try {
    const useClass = await prisma.class.findMany();
    res.json({ useClass });
  } catch (err) {
    return createError(400, "Class is not found");
  }
};
