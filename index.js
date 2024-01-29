
require('dotenv').config()
const express = require("express");
const web = express();
const port = process.env.PORT;

web.use(express.json());

web.listen(port, () => {
    console.log(`\nServer run on port ${port} | URL : http://localhost:${port} \n`);
})
