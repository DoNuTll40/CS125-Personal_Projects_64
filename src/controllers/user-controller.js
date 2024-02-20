const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

exports.table = async (req, res, next) => {
  try {
    res.json({ message: "welcome to my table" });
  } catch (err) {
    next(err);
  }
};

exports.getUserBID = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getUserBid = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      }
    });

    if (getUserBid === ""){
      return createError(400, "User not found");
    }

    res.json({ getUserBid })

  } catch (err) {
    console.log(err)
    return createError(400, "Error get user by id", "Error message", err)
  }
};

exports.getClass = async (req, res, next) => {
  try {
    const useClass = await prisma.class.findMany();
    res.json({ useClass })
  }catch(err){
    return createError(400, "Class is not found")
  }
}