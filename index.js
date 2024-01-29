
require('dotenv').config()
const express = require("express");
const web = express();
const port = process.env.PORT;

web.listen(port, () => {
    console.log(`Server run on port ${port} URL : http://localhost:${port}`);
})
