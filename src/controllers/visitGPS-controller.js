
const prisma = require("../configs/prisma");
const CryptoJS = require("crypto-js");
require('dotenv').config()

exports.saveVisitData = async (req, res, next) => {
    try {

        const visitData = req.body;
        const hashIPAddress = CryptoJS.AES.encrypt(visitData.ipAddress, process.env.CRYPTO_SECRETKEY).toString();
        const hashLat = CryptoJS.AES.encrypt(visitData.latitude, process.env.CRYPTO_SECRETKEY).toString();
        const hashLong = CryptoJS.AES.encrypt(visitData.longitude, process.env.CRYPTO_SECRETKEY).toString();

        const existingVisit = await prisma.visit.findFirst({
            where: {
              ipAddress: visitData.ipAddress,
            },
        });
        
        if (existingVisit) {

            await prisma.visit.update({
              where: {
                id: existingVisit.id,
              },
              data: {
                ...visitData,
                visitCount: existingVisit.visitCount + 1,
              },
            });
        } else {
            await prisma.visit.create({
              data: {
                ipAddress: hashIPAddress,
                longitude: hashLong,
                latitude: hashLat,
                visitCount: 1,
                ...visitData,
              },
            });
        }
    }catch(err){
      next(err)
      console.log(err)
    }
};

exports.viewVisit = async (req, res, next) => {
  try {
    const rs = await prisma.visit.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
    res.json({ status: "success!", result: rs })
  }catch(err){
    next(err)
    console.log(err)
  }
}
