
require('dotenv').config()
const express = require("express");
const web = express();
const port = process.env.PORT;

const cors = require('cors')

const userRoute = require("./src/routes/user-route")
const adminRoute = require("./src/routes/admin-route")
const authRoute = require("./src/routes/auth-route")

const authenticate = require("./src/middlewares/authenticate")
const user = require('./src/middlewares/user');
const admin = require("./src/middlewares/admin")

const errorHandler = require("./src/middlewares/error");
const notFoundError = require("./src/middlewares/not-found");

web.use(cors())
web.use(express.json());

web.use("/user", authenticate, user, userRoute);
web.use("/admin", authenticate, admin, adminRoute);
web.use("/auth", authRoute);
web.use("/header", userRoute);

web.listen(port, () => {
    console.log(`\nServer run on port ${port} | URL : http://localhost:${port} \n`);
})

web.use(errorHandler)
web.use("*", notFoundError)
