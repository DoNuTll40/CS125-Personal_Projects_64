
const prisma = require("../src/configs/prisma");
const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("1234", 10);
const passAdmin = bcrypt.hashSync("admin", 10);
const addUser = [
  {
    user_username: "student01",
    user_password: password,
    user_role: "USER",
    user_firstname: "ณัฐภูมิ",
    user_lastname: "ชาวนา",
    user_nickname: "ภูมิ",
    user_email: "nuttapoom.ch10@mail.com",
    user_phone: "080-002-XXXX",
    user_address: "123, Mukdahan",
    user_brithday: "2010-02-11T00:00:00.000Z",
    user_identity: "1495700XXXXX1",
    class_id: 1,
  },
  {
    user_username: "student02",
    user_password: password,
    user_role: "USER",
    user_firstname: "ณัฐวุฒิ",
    user_lastname: "ชาวนา",
    user_nickname: "โดนัท",
    user_email: "nuttawoot.ch64@snru.ac.th",
    user_phone: "080-363-XXXX",
    user_address: "123, SNRU",
    user_brithday: "2002-03-26T00:00:00.000Z",
    user_identity: "1499900XXXXX3",
    class_id: 2,
  },
  {
    user_username: "teacher01",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "ประยุทธ",
    user_lastname: "สุภาคาร",
    user_nickname: "เอิร์ธ",
    user_email: "prayut.su85@mail.com",
    user_phone: "080-654-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1985-01-22T00:00:00.000Z",
    user_identity: "3649200XXXXX2",
    class_id: 1,
  },
  {
    user_username: "teacher02",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "สุรีย์พร",
    user_lastname: "เขียวขำ",
    user_nickname: "โน๊ต",
    user_email: "sureporn.ki97@mail.com",
    user_phone: "080-393-XXXX",
    user_address: "123, SNRU",
    user_brithday: "1997-05-08T00:00:00.000Z",
    user_identity: "4532800XXXXX4",
    class_id: 2,
  },
  {
    user_username: "teacher03",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "ภัคภณ",
    user_lastname: "เกียรติสกุล",
    user_nickname: "ภีม",
    user_email: "pukkapon.ge90@mail.com",
    user_phone: "080-379-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1990-12-30T00:00:00.000Z",
    user_identity: "4538900XXXXX9",
    class_id: 3,
  },
  {
    user_username: "teacher04",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "นันทวัฒน์",
    user_lastname: "ศรีทอง",
    user_nickname: "วัฒน์",
    user_email: "nanthawut.sr99@mail.com",
    user_phone: "060-123-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1999-06-28T00:00:00.000Z",
    user_identity: "4567890XXXXX2",
    class_id: 3,
  },
  {
    user_username: "teacher05",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "ชัยวัฒน์",
    user_lastname: "ศรีสุริยจันทร์",
    user_nickname: "น้อย",
    user_email: "chaiywut.sri89@mail.com",
    user_phone: "087-463-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1989-09-09T00:00:00.000Z",
    user_identity: "4983210XXXXX8",
    class_id: 3,
  },
  {
    user_username: "teacher06",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "ชุติกาญจน์",
    user_lastname: "กิตติเตชะคุณ",
    user_nickname: "นิว",
    user_email: "chutikarn.ki96@mail.com",
    user_phone: "096-324-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1996-05-20T00:00:00.000Z",
    user_identity: "4567320XXXXX1",
    class_id: 3,
  },
  {
    user_username: "teacher07",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "เฉลียว",
    user_lastname: "สว่างเสนา",
    user_nickname: "ชาญ",
    user_email: "chaleaw.sa76@mail.com",
    user_phone: "086-978-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1976-12-10T00:00:00.000Z",
    user_identity: "3256780XXXXX2",
    class_id: 3,
  },
  {
    user_username: "teacher08",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "รมิดา",
    user_lastname: "ศรีสดุดี",
    user_nickname: "มายด์",
    user_email: "ramida.sr99@mail.com",
    user_phone: "082-985-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1999-05-08T00:00:00.000Z",
    user_identity: "2546800XXXXX1",
    class_id: 3,
  },
  {
    user_username: "teacher09",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "โชคชัย",
    user_lastname: "รัตนาอาทิตย์",
    user_nickname: "กช",
    user_email: "chokchai.ru85@mail.com",
    user_phone: "080-927-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1985-05-30T00:00:00.000Z",
    user_identity: "3452800XXXXX7",
    class_id: 3,
  },
  {
    user_username: "teacher10",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "อาทิตยา",
    user_lastname: "ผ่องรักษา",
    user_nickname: "หมิว",
    user_email: "arthitaya.ph82@mail.com",
    user_phone: "081-820-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1982-01-01T00:00:00.000Z",
    user_identity: "5660800XXXXX6",
    class_id: 3,
  },
  {
    user_username: "teacher11",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "แสงมณี",
    user_lastname: "อยู่พุข",
    user_nickname: "แสง",
    user_email: "sangmanee.yu78@mail.com",
    user_phone: "089-782-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1978-03-12T00:00:00.000Z",
    user_identity: "3245800XXXXX4",
    class_id: 3,
  },
  {
    user_username: "teacher12",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "สิทธิพร",
    user_lastname: "ห้าวหาญ",
    user_nickname: "เจฟ",
    user_email: "sitiporn.ha81@mail.com",
    user_phone: "092-763-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1981-02-27T00:00:00.000Z",
    user_identity: "2398100XXXXX2",
    class_id: 3,
  },
  {
    user_username: "teacher13",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "ธนยศ",
    user_lastname: "พิจิตเจริญวงศ์",
    user_nickname: "ออฟ",
    user_email: "thanayot.pi85@mail.com",
    user_phone: "086-235-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1985-05-22T00:00:00.000Z",
    user_identity: "2113800XXXXX5",
    class_id: 3,
  },
  {
    user_username: "teacher14",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "จักรกฤช",
    user_lastname: "รัตนกิจสกุล",
    user_nickname: "ธีร์",
    user_email: "jukkrit.ru82@mail.com",
    user_phone: "082-127-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1982-12-01T00:00:00.000Z",
    user_identity: "1278900XXXXX4",
    class_id: 3,
  },
  {
    user_username: "teacher15",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "จุฑาทิพย์",
    user_lastname: "ธาดาวรวงศ์",
    user_nickname: "พลอย",
    user_email: "juthathip.th97@mail.com",
    user_phone: "080-939-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1997-07-06T00:00:00.000Z",
    user_identity: "5642800XXXXX1",
    class_id: 3,
  },
  {
    user_username: "teacher16",
    user_password: password,
    user_role: "TEACHER",
    user_firstname: "จุรีรัตน์",
    user_lastname: "รัศมีโชติ",
    user_nickname: "น้ำผึ้ง",
    user_email: "jurerut.ru98@mail.com",
    user_phone: "080-383-XXXX",
    user_address: "123, Thailand",
    user_brithday: "1998-05-08T00:00:00.000Z",
    user_identity: "3582800XXXXX4",
    class_id: 3,
  },
  {
    user_username: "admin",
    user_password: passAdmin,
    user_role: "ADMIN",
    user_firstname: "ณัฐวุฒิ",
    user_lastname: "ชาวนา",
    user_nickname: "โดนัท",
    user_email: "nuttawoot.ch64@snru.ac.th",
    user_phone: "080-393-XXXX",
    user_address: "123, SNRU",
    user_brithday: "2002-03-26T00:00:00.000Z",
    user_identity: "1499900XXXXX5",
    user_image: "https://lh3.googleusercontent.com/a/ACg8ocLkyuW8eiDKRYlpvR5RsqzXYeTBt3c181MSQ9Wy5PHPkg=s360-c-no",
    class_id: 125,
  },
];

const addClass = [
  {class_id: 1, class_name: "ม.1/1", sec_id: 3 },
  {class_id: 2, class_name: "ม.1/3", sec_id: 3 },
  {class_id: 3, class_name: "ไม่มีห้อง", sec_id: 3 },
  {class_id: 125, class_name: "ADMIN", sec_id: 4 },
];

const addBuilds = [
  {build_name: "ไพลิน", build_number: "01", build_image: "https://www.dla.go.th/upload/ebook/ebook/2013/4/2052_1.jpg"},
  {build_name: "ทับทิม", build_number: "02", build_image: "https://www.dla.go.th/upload/ebook/ebook/2013/4/2052_1.jpg"},
  {build_name: "หยก", build_number: "03", build_image: "https://www.dla.go.th/upload/ebook/ebook/2013/4/2052_1.jpg"},
  {build_name: "โมรา", build_number: "04", build_image: "https://www.dla.go.th/upload/ebook/ebook/2013/4/2052_1.jpg"},
  {build_name: "ห้องประชุม", build_number: "05", build_image: "https://www.dla.go.th/upload/ebook/ebook/2013/4/2052_1.jpg"},
  {build_name: "โดรมอเนกประสงค์", build_number: "06", build_image: "https://www.dla.go.th/upload/ebook/ebook/2013/4/2052_1.jpg"},
]

const addSection = [
  {sec_type: "PRIMARY1"},
  {sec_type: "PRIMARY2"},
  {sec_type: "SECONDARY1"},
  {sec_type: "SECONDARY2"},
]

const addRoom = [
  {room_name: "ไพลิน-111", room_number: "111", build_id: 1},
  {room_name: "ไพลิน-112", room_number: "112", build_id: 1},
  {room_name: "ไพลิน-113", room_number: "113", build_id: 1},
  {room_name: "ไพลิน-121", room_number: "121", build_id: 1},
  {room_name: "ไพลิน-122", room_number: "122", build_id: 1},
  {room_name: "ไพลิน-123", room_number: "123", build_id: 1},
  {room_name: "ทับทิม-211", room_number: "211", build_id: 2},
  {room_name: "ทับทิม-212", room_number: "212", build_id: 2},
  {room_name: "ทับทิม-213", room_number: "213", build_id: 2},
  {room_name: "ทับทิม-221", room_number: "221", build_id: 2},
  {room_name: "ทับทิม-222", room_number: "222", build_id: 2},
  {room_name: "ทับทิม-223", room_number: "223", build_id: 2},
  {room_name: "หยก-311", room_number: "311", build_id: 3},
  {room_name: "หยก-312", room_number: "312", build_id: 3},
  {room_name: "หยก-313", room_number: "313", build_id: 3},
  {room_name: "หยก-321", room_number: "321", build_id: 3},
  {room_name: "หยก-322", room_number: "322", build_id: 3},
  {room_name: "หยก-323", room_number: "323", build_id: 3},
  {room_name: "โมรา-411", room_number: "411", build_id: 4},
  {room_name: "โมรา-412", room_number: "412", build_id: 4},
  {room_name: "โมรา-413", room_number: "413", build_id: 4},
  {room_name: "โมรา-421", room_number: "421", build_id: 4},
  {room_name: "โมรา-422", room_number: "422", build_id: 4},
  {room_name: "โมรา-423", room_number: "423", build_id: 4},
  {room_name: "ห้องประชุม-01", room_number: "511", build_id: 5},
  {room_name: "ห้องประชุม-02", room_number: "512", build_id: 5},
  {room_name: "ห้องประชุม-03", room_number: "513", build_id: 5},
  {room_name: "ใต้โดรม", room_number: "611", build_id: 6},
]


const addMajor = [
  { major_name: "คณิตศาสตร์"},
  { major_name: "วิทยาศาสตร์และเทคโนโลยี"},
  { major_name: "ภาษาไทย"},
  { major_name: "ภาษาต่างประเทศ"},
  { major_name: "สังคมศึกษา ศาสนาและวัฒนธรรม"},
  { major_name: "สุขศึกษา พลศึกษา"},
  { major_name: "ศิลปศึกษา"},
  { major_name: "การงานอาชีพ"},
  { major_name: "กิจกรรมพัฒนาผู้เรียน"},
  { major_name: "งานแนะแนว"},
]

const addSubject = [
  {sub_name: "สุขศึกษา", sub_code: "พ21102", room_id: 1, major_id: 6},
  {sub_name: "คณิตศาสตร์", sub_code: "ค21102", room_id: 2, major_id: 1},
  {sub_name: "ทัศนศิลป์", sub_code: "ศ21102", room_id: 3, major_id: 7},
  {sub_name: "ภาษาไทย", sub_code: "ท21102", room_id: 4, major_id: 3},
  {sub_name: "หุ่นยนต์", sub_code: "ว21202", room_id: 5, major_id: 2},
  {sub_name: "สัมคมศึกษา", sub_code: "ส21102", room_id: 6, major_id: 5},
  {sub_name: "ประวัติศาสตร์", sub_code: "ส21104", room_id: 7, major_id: 5},
  {sub_name: "เวทคณิต", sub_code: "ค21102", room_id: 8, major_id: 1},
  {sub_name: "ภาษาอังกฤษ", sub_code: "อ21102", room_id: 9, major_id: 4},
  {sub_name: "วิทยาศาสตร์-01", sub_code: "ว21102", room_id: 10, major_id: 2},
  {sub_name: "ดนตรี", sub_code: "ศ21104", room_id: 11, major_id: 7},
  {sub_name: "ออกแบบและเทคโนโลยี", sub_code: "ว21104", room_id: 12, major_id: 2},
  {sub_name: "การงานอาชีพ", sub_code: "ง21102", room_id: 13, major_id: 10},
  {sub_name: "แนะแนว", sub_code: "-", room_id: 5, major_id: 10},
  {sub_name: "ลูกเสือ", sub_code: "-", room_id: 28, major_id: 9},
  {sub_name: "ชุมนุม", sub_code: "-", room_id: 25, major_id: 9},
  {sub_name: "วิทยาศาสตร์-02", sub_code: "ว21102", room_id: 14, major_id: 2},
  {sub_name: "ภาษาไทยเพื่อการสื่อสาร", sub_code: "ท21202", room_id: 15, major_id: 3},
  {sub_name: "พื้นฐานนาฏศิลป์ไทย", sub_code: "ศ21204", room_id: 16, major_id: 7},
  {sub_name: "ปิงปอง", sub_code: "พ21104", room_id: 25, major_id: 6},
]

const addSchedule = [
  {sched_day: "จันทร์", sched_time: "08:30-09:30", class_id: 1, sub_id: 1, user_id: 5},
  {sched_day: "จันทร์", sched_time: "09:30-10:30", class_id: 1, sub_id: 2, user_id: 6},
  {sched_day: "จันทร์", sched_time: "10:30-11:30", class_id: 1, sub_id: 3, user_id: 7},
  {sched_day: "จันทร์", sched_time: "11:30-12:30", class_id: 1, sub_id: 4, user_id: 8},
  {sched_day: "จันทร์", sched_time: "13:30-14:30", class_id: 1, sub_id: 5, user_id: 3, sched_count: 2},
  {sched_day: "อังคาร", sched_time: "08:30-09:30", class_id: 1, sub_id: 6, user_id: 9},
  {sched_day: "อังคาร", sched_time: "09:30-10:30", class_id: 1, sub_id: 7, user_id: 10},
  {sched_day: "อังคาร", sched_time: "10:30-11:30", class_id: 1, sub_id: 8, user_id: 11},
  {sched_day: "อังคาร", sched_time: "11:30-12:30", class_id: 1, sub_id: 9, user_id: 12},
  {sched_day: "อังคาร", sched_time: "13:30-14:30", class_id: 1, sub_id: 10, user_id: 13, sched_count: 2},
  {sched_day: "พุธ", sched_time: "08:30-09:30", class_id: 1, sub_id: 2, user_id: 6},
  {sched_day: "พุธ", sched_time: "09:30-10:30", class_id: 1, sub_id: 8, user_id: 11},
  {sched_day: "พุธ", sched_time: "10:30-11:30", class_id: 1, sub_id: 4, user_id: 8},
  {sched_day: "พุธ", sched_time: "11:30-12:30", class_id: 1, sub_id: 6, user_id: 9},
  {sched_day: "พุธ", sched_time: "13:30-14:30", class_id: 1, sub_id: 9, user_id: 12},
  {sched_day: "พุธ", sched_time: "14:30-15:30", class_id: 1, sub_id: 14, user_id: 3},
  {sched_day: "พฤหัสบดี", sched_time: "08:30-09:30", class_id: 1, sub_id: 9, user_id: 12},
  {sched_day: "พฤหัสบดี", sched_time: "09:30-10:30", class_id: 1, sub_id: 18, user_id: 8},
  {sched_day: "พฤหัสบดี", sched_time: "10:30-11:30", class_id: 1, sub_id: 20, user_id: 5},
  {sched_day: "พฤหัสบดี", sched_time: "11:30-12:30", class_id: 1, sub_id: 11, user_id: 14},
  {sched_day: "พฤหัสบดี", sched_time: "13:30-14:30", class_id: 1, sub_id: 12, user_id: 15},
  {sched_day: "พฤหัสบดี", sched_time: "14:30-15:30", class_id: 1, sub_id: 15, user_id: 7},
  {sched_day: "ศุกร์", sched_time: "08:30-09:30", class_id: 1, sub_id: 2, user_id: 6},
  {sched_day: "ศุกร์", sched_time: "09:30-10:30", class_id: 1, sub_id: 4, user_id: 8},
  {sched_day: "ศุกร์", sched_time: "10:30-11:30", class_id: 1, sub_id: 6, user_id: 9},
  {sched_day: "ศุกร์", sched_time: "11:30-12:30", class_id: 1, sub_id: 13, user_id: 16},
  {sched_day: "ศุกร์", sched_time: "13:30-14:30", class_id: 1, sub_id: 10, user_id: 13},
  {sched_day: "ศุกร์", sched_time: "14:30-15:30", class_id: 1, sub_id: 16, user_id: 19},
]

const sectionAdd = async () => {
  await prisma.section.createMany({
    data: addSection,
  });
};

const userAdd = async () => {
  await prisma.users.createMany({
    data: addUser,
  });
};

const classAdd = async () => {
  try {
    await prisma.class.createMany({
      data: addClass,
    });
  } catch (err) {
    console.log(err);
  }
};

const majorAdd = async () => {
  try {
    await prisma.major.createMany({
      data: addMajor,
    })
  }catch(err){
    console.log(err)
  }
}

const subjectAdd = async () => {
  try {
    await prisma.subject.createMany({
      data: addSubject,
    });
  }catch(err){
    console.log(err);
  }
};

const buildAdd = async () => {
  try {
    await prisma.builds.createMany({
      data: addBuilds,
    })
  }catch(err){
    console.log(err)
  }
}

const roomAdd = async () => {
  try {
    await prisma.room.createMany({
      data: addRoom,
    })
  }catch(err){
    console.log(err);
  }
};

const scheduleAdd = async () => {
  try {
    await prisma.schedule.createMany({
      data: addSchedule,
    })
  }catch(err){
    console.log(err)
  }
}

sectionAdd();
classAdd();
buildAdd();
roomAdd();
subjectAdd();
majorAdd();
userAdd();
scheduleAdd();