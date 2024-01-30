
exports.getSubject = (req, res, next) => {
    const { sub } = req.params;
    res.json({  sub, message : "get sub" })
};

exports.createSubject = (req, res, next) => {
    const { name, number, major_id } = req.body;
    res.json({ name, number, major_id, message : "create sub" })
};