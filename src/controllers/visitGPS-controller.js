
const prisma = require("../configs/prisma");

exports.saveVisitData = async (req, res, next) => {
    try {

        const visitData = req.body;

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
                visitCount: existingVisit.visitCount + 1,
              },
            });
        } else {
            await prisma.visit.create({
              data: visitData,
            });
        }
    }catch(err){
        console.log(err)
    }
};
