
require('dotenv').config()
const express = require("express");
const web = express();
const port = process.env.PORT;
const http = require('http');
const { wss } = require('./src/middlewares/websocket')
const cors = require('cors')
const compression = require('compression');

const userRoute = require("./src/routes/user-route")
const adminRoute = require("./src/routes/admin-route")
const authRoute = require("./src/routes/auth-route")
const authenticate = require("./src/middlewares/authenticate")
const user = require('./src/middlewares/user');
const admin = require("./src/middlewares/admin")

const errorHandler = require("./src/middlewares/error");
const notFoundError = require("./src/middlewares/not-found");

const prisma = require('./src/configs/prisma');
const gpsRoute = require('./src/routes/gps-route');

web.use(cors({ origin: '*' }))
web.use(express.json());
web.use(compression());
web.get("/", (req, res) => {
  res.json("Hello Welcome to myApi Personal Project");
});
web.use("/user", authenticate, user, userRoute);
web.use("/admin", authenticate, admin, adminRoute);
web.use("/api", authenticate, admin, gpsRoute)
web.use("/auth", authRoute);
web.use("/header", userRoute); // ดึงข้อมูล เพื่อเอามาใช้กับ header ใน frontend
web.use("/banner", async (req, res, next) => {
    try {
      const dateTime = new Date()
      const banner = await prisma.banner.findMany({
        where: {
          b_enddate: {
            gt: dateTime
          },
          b_status: {
            not: 0
          }
        }
      });
      res.json({banner, resault: "success!", dateTime})
    }catch(err){
      next(err)
      console.log(err)
    }
})

const server = http.createServer(web);

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

server.listen(port, () => {
    console.log(`\nServer run on port ${port} | URL : http://localhost:${port} \n`);
})

web.use(errorHandler)
web.use("*", notFoundError)
