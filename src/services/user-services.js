
const prisma = require("../configs/prisma");

exports.getUserById = (id) => {
  return prisma.users.findFirst({
    where: {
      user_id: id,
    },
  });
};

exports.getUserByUsername = (username) => {
    return prisma.users.findFirst({
        where: {
            user_username: username,
        }
    })
}

exports.checkLoginUsername = (username) => {
  return prisma.users.findFirst({
      where: {
          user_username: username,
      }
  })
}

exports.checkLoginPassword = (password) => {
  return prisma.users.findFirst({
      where: {
          user_password: password,
      }
  })
}

exports.createUser = (username, password, role, classId) => {
    return prisma.users.create({
        data: {
            user_username: username,
            user_password: password,
            user_role: role,
            class_id: classId
        }
    })
}