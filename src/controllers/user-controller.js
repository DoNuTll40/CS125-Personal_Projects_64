
exports.table = async (req, res, next) => {
  try {
    res.json({ message: "welcome to my table" });
  } catch (err) {
    next(err);
  }
};
