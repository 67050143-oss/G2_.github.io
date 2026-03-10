window.IOTE_KNOWLEDGE_TH = {
  assistantName: "IOTE assistance",
  status: "ผู้ช่วยนำทางเว็บไซต์",
  disclaimer: "ข้อมูลนี้อ้างอิงจากหน้าเว็บไซต์ IOTE และลิงก์ประกาศทางการของมหาวิทยาลัยเท่านั้น กรุณาตรวจสอบประกาศล่าสุดอีกครั้งก่อนสมัคร",
  greeting: "สวัสดีค่ะ ฉันคือ IOTE assistance ฉันช่วยพาไปหน้าที่เกี่ยวข้อง และตอบคำถามทั่วไปเกี่ยวกับการสมัครได้",
  fallback: "ขออภัย ขณะนี้ฉันตอบได้เฉพาะข้อมูลที่อยู่บนเว็บไซต์ IOTE และแหล่งข้อมูลทางการของมหาวิทยาลัย คุณสามารถถามเกี่ยวกับรอบสมัคร โครงการ การติดต่อ หรือให้ฉันพาไปยังหน้าที่เกี่ยวข้องได้ค่ะ",
  officialLabel: "ประกาศทางการ KMITL",
  officialAdmissionUrl: "https://new.reg.kmitl.ac.th/admission/#/",
  suggestions: [
    "รอบ 1 คืออะไร",
    "รอบ 2 มีกี่โครงการ",
    "พาไปหน้า Admission",
    "ติดต่ออาจารย์",
    "สรุปหน้านี้"
  ],
  pages: {
    "index.html": "หน้านี้เป็นหน้าหลักของเว็บไซต์ IOTE ใช้สำหรับเริ่มต้นดูข้อมูลคณะและนำทางไปยังส่วนต่าง ๆ",
    "about.html": "หน้านี้เป็นข้อมูลเกี่ยวกับสาขา IoT and Information Engineering",
    "academics.html": "หน้านี้เป็นข้อมูลหลักสูตรและเนื้อหาการเรียน",
    "admission.html": "หน้านี้เป็นหน้ารวมรอบการสมัครของสาขา แบ่งเป็นรอบ 1 Portfolio รอบ 2 Quota และรอบ 3 Admission",
    "portfolio.html": "หน้านี้เป็นหน้ารวมโครงการในรอบ 1 Portfolio",
    "quota.html": "หน้านี้เป็นหน้ารวมโครงการในรอบ 2 Quota",
    "admission3.html": "หน้านี้เป็นรายละเอียดของรอบ 3 Admission",
    "faculty.html": "หน้านี้เป็นรายชื่ออาจารย์และข้อมูลติดต่อที่เกี่ยวข้อง",
    "contact.html": "หน้านี้เป็นข้อมูลการติดต่อของสาขาหรือคณะ",
    "port1.html": "หน้านี้เป็นรายละเอียดโครงการ Young Engineering Talent",
    "port2.html": "หน้านี้เป็นรายละเอียดโครงการเรียนดี ช้างเผือก",
    "port3.html": "หน้านี้เป็นรายละเอียดโครงการรางวัลและประกาศนียบัตรทางวิชาการ",
    "port4.html": "หน้านี้เป็นรายละเอียดโครงการโรงเรียนวิทยาศาสตร์",
    "port5.html": "หน้านี้เป็นรายละเอียดโครงการ Engineering Pathway",
    "port6.html": "หน้านี้เป็นรายละเอียดโครงการโควตา สอวน.",
    "port7.html": "หน้านี้เป็นรายละเอียดโครงการบุตรของบุคลากรสถาบัน",
    "quota1.html": "หน้านี้เป็นรายละเอียดโควตาเรียนดี",
    "quota2.html": "หน้านี้เป็นรายละเอียดโควตา KMITL One",
    "quota3.html": "หน้านี้เป็นรายละเอียดโควตากิจกรรม K-Engineering"
  },
  intents: [
    {
      id: "page_summary",
      keywords: ["หน้านี้", "ตอนนี้อยู่หน้าอะไร", "สรุปหน้านี้", "หน้านี้คืออะไร", "what page", "this page", "summarize this page"],
      response: (ctx) => ctx.currentPageSummary || "ฉันช่วยสรุปหน้าเว็บปัจจุบันได้ หากหน้าเว็บนี้อยู่ในระบบข้อมูลของเว็บไซต์"
    },
    {
      id: "round1_overview",
      keywords: ["รอบ 1", "portfolio", "พอร์ต", "port"],
      response: "รอบ 1 Portfolio เป็นรอบที่รวมโครงการย่อยหลายโครงการสำหรับการสมัครแบบยื่นผลงานและคุณสมบัติตามที่แต่ละโครงการกำหนด",
      actions: ["portfolio"]
    },
    {
      id: "round2_overview",
      keywords: ["รอบ 2", "quota", "โควตา"],
      response: "รอบ 2 Quota เป็นรอบที่มี 3 โครงการ ได้แก่ โควตาเรียนดี โควตา KMITL One และโควตากิจกรรม K-Engineering",
      actions: ["quota", "quota1", "quota2", "quota3"]
    },
    {
      id: "round3_overview",
      keywords: ["รอบ 3", "admission 3", "admission3", "admission รอบ 3"],
      response: "รอบ 3 Admission เป็นรอบรับสมัครตามเกณฑ์ที่มหาวิทยาลัยกำหนด โดยสามารถดูรายละเอียดคุณสมบัติและเงื่อนไขได้ในหน้ารอบ 3",
      actions: ["admission3"]
    },
    {
      id: "portfolio_count",
      keywords: ["รอบ 1 มีกี่โครงการ", "portfolio มีกี่โครงการ", "พอร์ตมีกี่โครงการ", "จำนวนโครงการรอบ 1"],
      response: "รอบ 1 Portfolio มี 7 โครงการ",
      actions: ["portfolio"]
    },
    {
      id: "quota_count",
      keywords: ["รอบ 2 มีกี่โครงการ", "quota มีกี่โครงการ", "โควตามีกี่โครงการ", "จำนวนโครงการรอบ 2"],
      response: "รอบ 2 Quota มี 3 โครงการ",
      actions: ["quota"]
    },
    {
      id: "contact_faculty",
      keywords: ["ติดต่ออาจารย์", "อาจารย์", "faculty", "รายชื่ออาจารย์"],
      response: "คุณสามารถดูรายชื่ออาจารย์และข้อมูลที่เกี่ยวข้องได้ที่หน้า Faculty",
      actions: ["faculty", "contact"]
    },
    {
      id: "contact_general",
      keywords: ["ติดต่อ", "contact", "ช่องทางติดต่อ", "สอบถาม"],
      response: "คุณสามารถดูข้อมูลการติดต่อของสาขาหรือคณะได้ที่หน้า Contact",
      actions: ["contact"]
    },
    {
      id: "go_admission",
      keywords: ["ไปหน้า admission", "พาไปหน้า admission", "ไปหน้าสมัคร", "admission"],
      response: "นี่คือหน้าการรับสมัครของสาขา",
      actions: ["admission"]
    },
    {
      id: "go_portfolio",
      keywords: ["ไปหน้า portfolio", "พาไปหน้าพอร์ต", "ไปหน้าพอร์ต", "หน้า portfolio"],
      response: "นี่คือหน้ารวมโครงการในรอบ 1 Portfolio",
      actions: ["portfolio"]
    },
    {
      id: "go_quota",
      keywords: ["ไปหน้า quota", "พาไปหน้า quota", "ไปหน้าโควตา", "หน้า quota"],
      response: "นี่คือหน้ารวมโครงการในรอบ 2 Quota",
      actions: ["quota"]
    },
    {
      id: "go_round3",
      keywords: ["ไปหน้ารอบ 3", "พาไปหน้ารอบ 3", "ไปหน้า admission 3"],
      response: "นี่คือหน้ารายละเอียดของรอบ 3 Admission",
      actions: ["admission3"]
    },
    {
      id: "go_home",
      keywords: ["ไปหน้าแรก", "กลับหน้าแรก", "home", "หน้าหลัก"],
      response: "นี่คือหน้าหลักของเว็บไซต์ IOTE",
      actions: ["home"]
    },
    {
      id: "go_about",
      keywords: ["about", "เกี่ยวกับ", "ข้อมูลสาขา"],
      response: "คุณสามารถดูข้อมูลเกี่ยวกับสาขาได้ที่หน้า About",
      actions: ["about"]
    },
    {
      id: "go_academics",
      keywords: ["หลักสูตร", "academics", "รายวิชา", "การเรียน"],
      response: "คุณสามารถดูข้อมูลหลักสูตรและการเรียนได้ที่หน้า Academics",
      actions: ["academics"]
    },
    {
      id: "go_port1",
      keywords: ["young engineering talent", "port1"],
      response: "นี่คือรายละเอียดโครงการ Young Engineering Talent",
      actions: ["port1"]
    },
    {
      id: "go_port2",
      keywords: ["ช้างเผือก", "เรียนดี", "port2"],
      response: "นี่คือรายละเอียดโครงการเรียนดี ช้างเผือก",
      actions: ["port2"]
    },
    {
      id: "go_port3",
      keywords: ["ประกาศนียบัตร", "รางวัลทางวิชาการ", "port3"],
      response: "นี่คือรายละเอียดโครงการรางวัลและประกาศนียบัตรทางวิชาการ",
      actions: ["port3"]
    },
    {
      id: "go_port4",
      keywords: ["โรงเรียนวิทยาศาสตร์", "science school", "port4"],
      response: "นี่คือรายละเอียดโครงการโรงเรียนวิทยาศาสตร์",
      actions: ["port4"]
    },
    {
      id: "go_port5",
      keywords: ["engineering pathway", "port5"],
      response: "นี่คือรายละเอียดโครงการ Engineering Pathway",
      actions: ["port5"]
    },
    {
      id: "go_port6",
      keywords: ["สอวน", "โอลิมปิกวิชาการ", "port6"],
      response: "นี่คือรายละเอียดโครงการโควตานักเรียนทุนส่งเสริมโอลิมปิกวิชาการ",
      actions: ["port6"]
    },
    {
      id: "go_port7",
      keywords: ["บุตรของบุคลากร", "port7"],
      response: "นี่คือรายละเอียดโครงการบุตรของบุคลากรสถาบัน",
      actions: ["port7"]
    },
    {
      id: "go_quota1",
      keywords: ["โควตาเรียนดี", "quota1"],
      response: "นี่คือรายละเอียดโควตาเรียนดี",
      actions: ["quota1"]
    },
    {
      id: "go_quota2",
      keywords: ["kmitl one", "quota2"],
      response: "นี่คือรายละเอียดโควตา KMITL One",
      actions: ["quota2"]
    },
    {
      id: "go_quota3",
      keywords: ["k-engineering", "โควตากิจกรรม", "quota3"],
      response: "นี่คือรายละเอียดโควตากิจกรรม K-Engineering",
      actions: ["quota3"]
    },
    {
      id: "official_announcement",
      keywords: ["ประกาศรับสมัคร", "ประกาศทางการ", "official", "reg kmitl", "ลิงก์สมัคร"],
      response: "คุณสามารถตรวจสอบประกาศทางการของมหาวิทยาลัยได้จากลิงก์นี้",
      official: true
    }
  ]
};