
const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'donutll40', 
  api_key: '297848371783773', 
  api_secret: process.env.CLOUDINARY_SECRET, 
});

module.exports = cloudinary;