
const prisma = require("../configs/prisma");

exports.saveVisitData = async (req, res, next) => {
    try {

        const visitData = req.body;

        console.log(visitData);

        const existingVisit = await prisma.visit.findUnique({
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
        console.log("error visit_gps")
    }
};
