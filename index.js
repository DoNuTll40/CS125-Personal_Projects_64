
require('dotenv').config()
const express = require("express");
const web = express();
const port = process.env.PORT;

const userRoute = require("./src/routes/user-route")
const adminRoute = require("./src/routes/admin-route")
const authRoute = require("./src/routes/auth-route")

web.use(express.json());

web.use("/user", userRoute);
web.use("/admin", adminRoute);

web.use("/auth", authRoute);

web.listen(port, () => {
    console.log(`\nServer run on port ${port} | URL : http://localhost:${port} \n`);
})
