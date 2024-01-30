
exports.getSubject = (req, res, next) => {
    const { sub } = req.params;
    res.json({  sub, message : "get sub" })
};

exports.createSubject = (req, res, next) => {
    const { name, number, major_id } = req.body;
    res.json({ name, number, major_id, message : "create sub" })
};

exports.getUsers = (req, res, next) => {
    res.json({ message : "Get Users" })
};

exports.createUser = (req, res, next) => {
    res.json({ message : "Create Users" })
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