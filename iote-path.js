(() => {
  const section = document.getElementById("iote-path");
  if (!section) return;

  const browserLang = (navigator.language || "en").toLowerCase().startsWith("th") ? "th" : "en";

  const state = {
    lang: browserLang,
    currentQuestion: 0,
    answers: [],
    chart: null,
    views: {
      intro: document.getElementById("iote-path-intro"),
      quiz: document.getElementById("iote-path-quiz"),
      analysis: document.getElementById("iote-path-analysis"),
      result: document.getElementById("iote-path-result")
    },
    scores: {
      iot: 0,
      embedded: 0,
      software: 0,
      ai: 0,
      network: 0,
      innovation: 0
    }
  };

  const content = {
    en: {
      badge: "Interactive Assessment",
      title: "Find Your IOTE Path",
      subtitle: "Discover which area of IOTE matches your strengths through a short interactive assessment.",
      metaQuestions: "10 Questions",
      metaLanguage: "Auto language detection",
      startBtn: "Start Assessment",
      questionLabel: "Question",
      analysisTitle: "Analyzing your technology profile...",
      analysisSubtitle: "Building your personalized IOTE path",
      resultBadge: "Your Result",
      chartTitle: "Strength Profile",
      strengthTitle: "Top Strengths",
      matchTitle: "Why this matches IOTE",
      ctaAcademics: "Explore Curriculum",
      ctaAdmission: "Admission Information",
      restart: "Retake Assessment",
      axisLabels: [
        "IoT Systems",
        "Embedded / Hardware",
        "Software Development",
        "AI / Data",
        "Networking",
        "Innovation"
      ]
    },
    th: {
      badge: "แบบประเมินเชิงโต้ตอบ",
      title: "Find Your IOTE Path",
      subtitle: "ค้นหาว่าจุดแข็งของคุณเหมาะกับด้านไหนใน IOTE ผ่านแบบประเมินสั้น ๆ",
      metaQuestions: "10 คำถาม",
      metaLanguage: "ตรวจจับภาษาอัตโนมัติ",
      startBtn: "เริ่มทำแบบประเมิน",
      questionLabel: "คำถาม",
      analysisTitle: "กำลังวิเคราะห์โปรไฟล์ด้านเทคโนโลยีของคุณ...",
      analysisSubtitle: "กำลังสร้างเส้นทาง IOTE ที่เหมาะกับคุณ",
      resultBadge: "ผลลัพธ์ของคุณ",
      chartTitle: "โปรไฟล์จุดแข็ง",
      strengthTitle: "จุดแข็งสูงสุด",
      matchTitle: "ทำไมผลลัพธ์นี้จึงเหมาะกับ IOTE",
      ctaAcademics: "ดูหลักสูตร",
      ctaAdmission: "ข้อมูลการรับสมัคร",
      restart: "ทำแบบประเมินอีกครั้ง",
      axisLabels: [
        "IoT Systems",
        "Embedded / Hardware",
        "Software Development",
        "AI / Data",
        "Networking",
        "Innovation"
      ]
    }
  };

  const profiles = {
    connectedArchitect: {
      en: {
        title: "Connected Systems Architect",
        description: "You tend to think in terms of systems, devices, and connectivity. You are interested in how different technologies work together in real-world environments.",
        match: "This profile aligns well with IOTE because the program brings together smart devices, connected platforms, and system-level thinking for future technologies."
      },
      th: {
        title: "Connected Systems Architect",
        description: "คุณมีแนวโน้มคิดเชิงระบบ มองภาพรวมของอุปกรณ์ การเชื่อมต่อ และการทำงานร่วมกันของเทคโนโลยีในโลกจริง",
        match: "ผลลัพธ์นี้สอดคล้องกับ IOTE เพราะหลักสูตรเน้นการผสานอุปกรณ์อัจฉริยะ ระบบเชื่อมต่อ และการออกแบบเทคโนโลยีที่ทำงานร่วมกันได้จริง"
      }
    },
    smartBuilder: {
      en: {
        title: "Smart Device Builder",
        description: "You are drawn to devices, sensors, physical systems, and hands-on engineering. You enjoy turning ideas into real, working technology.",
        match: "This profile fits IOTE through embedded systems, smart devices, and hands-on development with hardware-oriented technologies."
      },
      th: {
        title: "Smart Device Builder",
        description: "คุณสนใจอุปกรณ์ เซนเซอร์ ระบบที่จับต้องได้ และชอบลงมือสร้างเทคโนโลยีให้ใช้งานได้จริง",
        match: "ผลลัพธ์นี้เหมาะกับ IOTE ในด้าน embedded systems, smart devices และการพัฒนางานเชิงฮาร์ดแวร์แบบลงมือทำ"
      }
    },
    softwareCreator: {
      en: {
        title: "Software Systems Creator",
        description: "You naturally focus on building digital systems, writing code, and shaping user-facing or backend software experiences.",
        match: "This profile connects strongly with IOTE through software engineering, application development, and digital system design."
      },
      th: {
        title: "Software Systems Creator",
        description: "คุณมีแนวโน้มเด่นด้านการสร้างระบบดิจิทัล การเขียนโค้ด และการพัฒนาซอฟต์แวร์ที่ตอบโจทย์ผู้ใช้งาน",
        match: "ผลลัพธ์นี้เชื่อมโยงกับ IOTE ผ่านการพัฒนาซอฟต์แวร์ การออกแบบระบบ และการสร้างประสบการณ์ดิจิทัล"
      }
    },
    aiExplorer: {
      en: {
        title: "AI & Data Explorer",
        description: "You are interested in patterns, intelligence, and using data to understand or improve systems.",
        match: "This profile matches IOTE through intelligent systems, analytics, machine learning, and data-driven decision-making."
      },
      th: {
        title: "AI & Data Explorer",
        description: "คุณสนใจข้อมูล รูปแบบ ความฉลาดของระบบ และการใช้ข้อมูลเพื่อวิเคราะห์หรือพัฒนาเทคโนโลยี",
        match: "ผลลัพธ์นี้เหมาะกับ IOTE ในด้าน intelligent systems, data analytics, machine learning และการตัดสินใจบนฐานข้อมูล"
      }
    },
    networkEngineer: {
      en: {
        title: "Networked Technology Engineer",
        description: "You think about communication, connectivity, and infrastructure. You are interested in how systems exchange information efficiently.",
        match: "This profile fits IOTE through networking, smart infrastructure, and the communication backbone of connected technologies."
      },
      th: {
        title: "Networked Technology Engineer",
        description: "คุณให้ความสำคัญกับการสื่อสาร การเชื่อมต่อ และโครงสร้างพื้นฐานของระบบที่ต้องทำงานร่วมกันอย่างมีประสิทธิภาพ",
        match: "ผลลัพธ์นี้เหมาะกับ IOTE ในด้านเครือข่าย โครงสร้างพื้นฐานอัจฉริยะ และระบบสื่อสารของเทคโนโลยีที่เชื่อมต่อกัน"
      }
    },
    innovationTechnologist: {
      en: {
        title: "Innovation-Driven Technologist",
        description: "You are motivated by creativity, new possibilities, and solving problems in fresh ways using technology.",
        match: "This profile reflects IOTE's interdisciplinary nature, where innovation, experimentation, and problem solving play a major role."
      },
      th: {
        title: "Innovation-Driven Technologist",
        description: "คุณขับเคลื่อนด้วยความคิดสร้างสรรค์ การมองหาแนวทางใหม่ และการใช้เทคโนโลยีแก้ปัญหาอย่างแตกต่าง",
        match: "ผลลัพธ์นี้สะท้อนความเป็นสหวิทยาการของ IOTE ที่ให้ความสำคัญกับนวัตกรรม การทดลอง และการแก้ปัญหาเชิงสร้างสรรค์"
      }
    }
  };

  const questions = [
    {
      en: "When working on a future technology project, what excites you the most?",
      th: "เวลาได้ทำโปรเจกต์เทคโนโลยีแห่งอนาคต อะไรทำให้คุณตื่นเต้นที่สุด?",
      options: [
        { en: "Designing how devices and systems work together", th: "ออกแบบการทำงานร่วมกันของอุปกรณ์และระบบ", scores: { iot: 2, network: 1 } },
        { en: "Building the physical device or hardware prototype", th: "สร้างต้นแบบอุปกรณ์หรือฮาร์ดแวร์จริง", scores: { embedded: 2, innovation: 1 } },
        { en: "Developing the software behind the experience", th: "พัฒนาซอฟต์แวร์ที่อยู่เบื้องหลังการใช้งาน", scores: { software: 2, iot: 1 } },
        { en: "Using data or AI to make the system smarter", th: "ใช้ข้อมูลหรือ AI ทำให้ระบบฉลาดขึ้น", scores: { ai: 2, innovation: 1 } },
        { en: "Making the system communicate smoothly and reliably", th: "ทำให้ระบบสื่อสารกันได้ลื่นไหลและเสถียร", scores: { network: 2, iot: 1 } },
        { en: "Turning ideas into new and useful solutions", th: "เปลี่ยนไอเดียให้เป็นโซลูชันใหม่ที่ใช้งานได้จริง", scores: { innovation: 2, software: 1 } }
      ]
    },
    {
      en: "Which role feels most natural to you in a team project?",
      th: "ในโปรเจกต์กลุ่ม บทบาทแบบไหนที่คุณรู้สึกว่าเหมาะกับตัวเองที่สุด?",
      options: [
        { en: "System planner", th: "คนวางภาพรวมของระบบ", scores: { iot: 2, innovation: 1 } },
        { en: "Hardware builder", th: "คนลงมือสร้างอุปกรณ์", scores: { embedded: 2, iot: 1 } },
        { en: "Software developer", th: "คนพัฒนาซอฟต์แวร์", scores: { software: 2, innovation: 1 } },
        { en: "Data analyst or AI thinker", th: "คนวิเคราะห์ข้อมูลหรือคิดเชิง AI", scores: { ai: 2, software: 1 } },
        { en: "Connectivity and communication designer", th: "คนดูแลการเชื่อมต่อและการสื่อสารของระบบ", scores: { network: 2, iot: 1 } },
        { en: "Idea initiator", th: "คนเริ่มต้นแนวคิดใหม่ ๆ", scores: { innovation: 2, ai: 1 } }
      ]
    },
    {
      en: "Which kind of challenge do you enjoy the most?",
      th: "คุณชอบความท้าทายแบบไหนมากที่สุด?",
      options: [
        { en: "Making many parts work as one system", th: "ทำให้หลายส่วนทำงานเป็นระบบเดียวกัน", scores: { iot: 2, network: 1 } },
        { en: "Making devices work accurately in real life", th: "ทำให้อุปกรณ์ทำงานได้จริงและแม่นยำ", scores: { embedded: 2, innovation: 1 } },
        { en: "Writing efficient and clean logic", th: "เขียนระบบให้มีตรรกะดีและใช้งานได้ลื่น", scores: { software: 2, innovation: 1 } },
        { en: "Finding insights from information", th: "ค้นหาความหมายหรือ insight จากข้อมูล", scores: { ai: 2, software: 1 } },
        { en: "Improving communication between systems", th: "ปรับการสื่อสารระหว่างระบบให้ดีขึ้น", scores: { network: 2, iot: 1 } },
        { en: "Creating something people have not seen before", th: "สร้างสิ่งใหม่ที่คนยังไม่ค่อยเห็นมาก่อน", scores: { innovation: 2, embedded: 1 } }
      ]
    },
    {
      en: "Which school activity sounds most appealing?",
      th: "กิจกรรมในโรงเรียนแบบไหนที่น่าสนใจสำหรับคุณมากที่สุด?",
      options: [
        { en: "Smart city or smart home design", th: "ออกแบบ smart city หรือ smart home", scores: { iot: 2, network: 1 } },
        { en: "Robotics or electronics lab", th: "ห้องแล็บหุ่นยนต์หรืออิเล็กทรอนิกส์", scores: { embedded: 2, iot: 1 } },
        { en: "App or website development", th: "พัฒนาแอปหรือเว็บไซต์", scores: { software: 2, innovation: 1 } },
        { en: "AI, prediction, or data visualization", th: "AI การพยากรณ์ หรือ data visualization", scores: { ai: 2, software: 1 } },
        { en: "Network setup or connected devices demo", th: "ทดลองระบบเครือข่ายหรืออุปกรณ์เชื่อมต่อ", scores: { network: 2, embedded: 1 } },
        { en: "Innovation contest or startup pitching", th: "ประกวดนวัตกรรมหรือ pitch ไอเดีย", scores: { innovation: 2, iot: 1 } }
      ]
    },
    {
      en: "When you imagine future technology, what do you focus on first?",
      th: "เมื่อคุณนึกถึงเทคโนโลยีแห่งอนาคต คุณมักสนใจเรื่องไหนก่อน?",
      options: [
        { en: "How everything connects together", th: "สิ่งต่าง ๆ เชื่อมต่อกันอย่างไร", scores: { iot: 2, network: 1 } },
        { en: "What devices are needed", th: "ต้องใช้อุปกรณ์อะไรบ้าง", scores: { embedded: 2, iot: 1 } },
        { en: "What software powers the experience", th: "ซอฟต์แวร์อะไรขับเคลื่อนประสบการณ์นั้น", scores: { software: 2, ai: 1 } },
        { en: "How intelligence can improve decisions", th: "ความฉลาดของระบบจะช่วยตัดสินใจได้อย่างไร", scores: { ai: 2, innovation: 1 } },
        { en: "How information travels between components", th: "ข้อมูลเดินทางระหว่างส่วนต่าง ๆ อย่างไร", scores: { network: 2, iot: 1 } },
        { en: "How to turn the idea into something impactful", th: "จะเปลี่ยนไอเดียให้เกิดผลกระทบจริงได้อย่างไร", scores: { innovation: 2, software: 1 } }
      ]
    },
    {
      en: "Which tool would you most likely enjoy using?",
      th: "เครื่องมือแบบไหนที่คุณน่าจะสนุกกับการใช้งานมากที่สุด?",
      options: [
        { en: "System architecture board", th: "บอร์ดวางโครงสร้างระบบ", scores: { iot: 2, innovation: 1 } },
        { en: "Microcontrollers and sensors", th: "ไมโครคอนโทรลเลอร์และเซนเซอร์", scores: { embedded: 2, iot: 1 } },
        { en: "Code editor and developer tools", th: "โปรแกรมเขียนโค้ดและเครื่องมือพัฒนา", scores: { software: 2, innovation: 1 } },
        { en: "Python notebooks and AI tools", th: "Python notebook และเครื่องมือ AI", scores: { ai: 2, software: 1 } },
        { en: "Network simulators and communication tools", th: "ตัวจำลองเครือข่ายและเครื่องมือสื่อสาร", scores: { network: 2, iot: 1 } },
        { en: "Idea boards and prototyping tools", th: "บอร์ดระดมความคิดและเครื่องมือทำต้นแบบ", scores: { innovation: 2, embedded: 1 } }
      ]
    },
    {
      en: "Which statement sounds most like you?",
      th: "ข้อความไหนใกล้เคียงตัวคุณมากที่สุด?",
      options: [
        { en: "I like seeing the big picture of how technology fits together", th: "ฉันชอบมองภาพรวมว่าเทคโนโลยีแต่ละส่วนเชื่อมกันอย่างไร", scores: { iot: 2, network: 1 } },
        { en: "I enjoy working with tangible devices and real-world systems", th: "ฉันชอบทำงานกับอุปกรณ์จริงและระบบที่จับต้องได้", scores: { embedded: 2, innovation: 1 } },
        { en: "I like building digital experiences through code", th: "ฉันชอบสร้างประสบการณ์ดิจิทัลผ่านการเขียนโค้ด", scores: { software: 2, ai: 1 } },
        { en: "I am curious about how data can guide better outcomes", th: "ฉันอยากรู้ว่าข้อมูลช่วยให้ตัดสินใจหรือพัฒนาระบบได้อย่างไร", scores: { ai: 2, innovation: 1 } },
        { en: "I care about how things communicate and stay connected", th: "ฉันสนใจว่าระบบต่าง ๆ สื่อสารและเชื่อมต่อกันอย่างไร", scores: { network: 2, iot: 1 } },
        { en: "I enjoy creating new approaches to solve problems", th: "ฉันชอบคิดวิธีใหม่ ๆ เพื่อแก้ปัญหา", scores: { innovation: 2, software: 1 } }
      ]
    },
    {
      en: "If you joined an IOTE project, what would you want to contribute most?",
      th: "ถ้าคุณได้เข้าร่วมโปรเจกต์ของ IOTE คุณอยากมีส่วนร่วมกับอะไรที่สุด?",
      options: [
        { en: "Designing the overall smart system", th: "ออกแบบระบบอัจฉริยะภาพรวม", scores: { iot: 2, network: 1 } },
        { en: "Building devices and embedded components", th: "สร้างอุปกรณ์และส่วน embedded", scores: { embedded: 2, iot: 1 } },
        { en: "Developing software or application logic", th: "พัฒนาซอฟต์แวร์หรือ logic ของแอป", scores: { software: 2, innovation: 1 } },
        { en: "Adding intelligence through AI and analytics", th: "เพิ่มความฉลาดผ่าน AI และการวิเคราะห์", scores: { ai: 2, software: 1 } },
        { en: "Designing communication between devices", th: "ออกแบบการสื่อสารระหว่างอุปกรณ์", scores: { network: 2, embedded: 1 } },
        { en: "Inventing the concept and user value", th: "คิดคอนเซปต์และคุณค่าของโครงการ", scores: { innovation: 2, iot: 1 } }
      ]
    },
    {
      en: "What kind of outcome feels most rewarding to you?",
      th: "ผลลัพธ์แบบไหนที่ทำให้คุณรู้สึกภูมิใจมากที่สุด?",
      options: [
        { en: "A complete connected solution", th: "ได้ระบบเชื่อมต่อที่สมบูรณ์", scores: { iot: 2, network: 1 } },
        { en: "A physical prototype that really works", th: "ได้ต้นแบบอุปกรณ์ที่ใช้งานได้จริง", scores: { embedded: 2, innovation: 1 } },
        { en: "A well-built application or platform", th: "ได้แอปหรือแพลตฟอร์มที่สร้างมาดี", scores: { software: 2, ai: 1 } },
        { en: "A smart model or meaningful insight", th: "ได้โมเดลอัจฉริยะหรือ insight ที่มีคุณค่า", scores: { ai: 2, innovation: 1 } },
        { en: "A reliable communication system", th: "ได้ระบบสื่อสารที่เสถียรและเชื่อถือได้", scores: { network: 2, iot: 1 } },
        { en: "A fresh solution with strong impact", th: "ได้โซลูชันใหม่ที่สร้างผลกระทบชัดเจน", scores: { innovation: 2, software: 1 } }
      ]
    },
    {
      en: "Which future path sounds most exciting to explore?",
      th: "เส้นทางอนาคตแบบไหนที่คุณอยากลองสำรวจมากที่สุด?",
      options: [
        { en: "Designing connected ecosystems", th: "ออกแบบ ecosystem ที่เชื่อมต่อกัน", scores: { iot: 2, network: 1 } },
        { en: "Creating smart devices and embedded products", th: "สร้างอุปกรณ์อัจฉริยะและผลิตภัณฑ์ embedded", scores: { embedded: 2, iot: 1 } },
        { en: "Building powerful software platforms", th: "สร้างซอฟต์แวร์หรือแพลตฟอร์มที่ทรงพลัง", scores: { software: 2, innovation: 1 } },
        { en: "Exploring AI-driven systems", th: "สำรวจระบบที่ขับเคลื่อนด้วย AI", scores: { ai: 2, software: 1 } },
        { en: "Developing connected infrastructure and communications", th: "พัฒนาระบบโครงสร้างพื้นฐานและการสื่อสาร", scores: { network: 2, embedded: 1 } },
        { en: "Creating new technology solutions for future users", th: "สร้างโซลูชันเทคโนโลยีใหม่สำหรับผู้ใช้ในอนาคต", scores: { innovation: 2, iot: 1 } }
      ]
    }
  ];

  function resetScores() {
    state.scores = {
      iot: 0,
      embedded: 0,
      software: 0,
      ai: 0,
      network: 0,
      innovation: 0
    };
  }

  function setView(name) {
    Object.values(state.views).forEach(view => view.classList.remove("active"));
    state.views[name].classList.add("active");
  }

  function applyLanguage() {
    const t = content[state.lang];

    document.getElementById("path-badge").textContent = t.badge;
    document.getElementById("path-title").textContent = t.title;
    document.getElementById("path-subtitle").textContent = t.subtitle;
    document.getElementById("path-meta-questions").textContent = t.metaQuestions;
    document.getElementById("path-meta-language").textContent = t.metaLanguage;
    document.getElementById("path-start-btn").textContent = t.startBtn;
    document.getElementById("iote-analysis-title").textContent = t.analysisTitle;
    document.getElementById("iote-analysis-subtitle").textContent = t.analysisSubtitle;
    document.getElementById("result-badge").textContent = t.resultBadge;
    document.getElementById("iote-chart-title").textContent = t.chartTitle;
    document.getElementById("iote-strength-title").textContent = t.strengthTitle;
    document.getElementById("iote-match-title").textContent = t.matchTitle;
    document.getElementById("iote-cta-academics").textContent = t.ctaAcademics;
    document.getElementById("iote-cta-admission").textContent = t.ctaAdmission;
    document.getElementById("iote-restart-btn").textContent = t.restart;

    document.querySelectorAll(".iote-lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === state.lang);
    });

    if (state.views.quiz.classList.contains("active")) {
      renderQuestion();
    }

    if (state.views.result.classList.contains("active")) {
      renderResult();
    }
  }

  function startAssessment() {
    state.currentQuestion = 0;
    state.answers = [];
    resetScores();
    setView("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const t = content[state.lang];
    const question = questions[state.currentQuestion];

    document.getElementById("path-question-count").textContent =
      `${t.questionLabel} ${state.currentQuestion + 1} / ${questions.length}`;

    document.getElementById("iote-question-text").textContent = question[state.lang];

    const progress = ((state.currentQuestion) / questions.length) * 100;
    document.getElementById("iote-progress-fill").style.width = `${progress}%`;

    const answerList = document.getElementById("iote-answer-list");
    answerList.innerHTML = "";

    question.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "iote-answer-btn";
      btn.type = "button";
      btn.textContent = option[state.lang];
      btn.addEventListener("click", () => handleAnswer(option.scores));
      answerList.appendChild(btn);
    });
  }

  function handleAnswer(scoreMap) {
    Object.keys(scoreMap).forEach(key => {
      state.scores[key] += scoreMap[key];
    });

    state.currentQuestion += 1;

    if (state.currentQuestion < questions.length) {
      renderQuestion();
      return;
    }

    document.getElementById("iote-progress-fill").style.width = "100%";
    setView("analysis");

    setTimeout(() => {
      setView("result");
      renderResult();
    }, 1400);
  }

  function getTopAxes() {
    return Object.entries(state.scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([key]) => key);
  }

  function axisLabel(axisKey) {
    const map = {
      iot: { en: "IoT Systems", th: "IoT Systems" },
      embedded: { en: "Embedded / Hardware", th: "Embedded / Hardware" },
      software: { en: "Software Development", th: "Software Development" },
      ai: { en: "AI / Data", th: "AI / Data" },
      network: { en: "Networking", th: "Networking" },
      innovation: { en: "Innovation", th: "Innovation" }
    };
    return map[axisKey][state.lang];
  }

  function resolveProfile() {
    const top = getTopAxes();

    if (top.includes("iot") && top.includes("network")) return "connectedArchitect";
    if (top.includes("embedded") && top.includes("iot")) return "smartBuilder";
    if (top.includes("software") && top.includes("innovation")) return "softwareCreator";
    if (top.includes("ai") && top.includes("software")) return "aiExplorer";
    if (top.includes("network") && top.includes("embedded")) return "networkEngineer";
    if (top.includes("innovation") && top.includes("iot")) return "innovationTechnologist";

    const highest = Object.entries(state.scores).sort((a, b) => b[1] - a[1])[0][0];

    const fallbackMap = {
      iot: "connectedArchitect",
      embedded: "smartBuilder",
      software: "softwareCreator",
      ai: "aiExplorer",
      network: "networkEngineer",
      innovation: "innovationTechnologist"
    };

    return fallbackMap[highest];
  }

  function renderStrengths(topAxes) {
    const container = document.getElementById("iote-top-strengths");
    container.innerHTML = "";

    topAxes.forEach((axis, index) => {
      const item = document.createElement("div");
      item.className = "iote-strength-item";
      item.innerHTML = `
        <div class="iote-strength-number">${index + 1}</div>
        <div class="iote-strength-label">${axisLabel(axis)}</div>
      `;
      container.appendChild(item);
    });
  }

function renderChart() {
  const canvas = document.getElementById("iote-result-chart");
  if (!canvas) return;

  const isLight = document.body.classList.contains("light-mode");
  const t = content[state.lang];

  if (state.chart) {
    state.chart.destroy();
  }

  state.chart = new Chart(canvas, {
    type: "radar",
    data: {
      labels: t.axisLabels,
      datasets: [{
        label: state.lang === "th" ? "โปรไฟล์ของคุณ" : "Your Profile",
        data: [
          state.scores.iot,
          state.scores.embedded,
          state.scores.software,
          state.scores.ai,
          state.scores.network,
          state.scores.innovation
        ],
        borderColor: isLight ? "#5b2cff" : "#06b6d4",
        backgroundColor: isLight
          ? "rgba(91, 44, 255, 0.16)"
          : "rgba(124, 58, 237, 0.22)",
        pointBackgroundColor: isLight ? "#ffffff" : "#ffffff",
        pointBorderColor: isLight ? "#5b2cff" : "#06b6d4",
        pointHoverBackgroundColor: isLight ? "#5b2cff" : "#06b6d4",
        pointHoverBorderColor: "#ffffff",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: isLight ? "#222222" : "#ffffff",
            font: {
              size: 12,
              weight: "500"
            }
          }
        }
      },
      scales: {
        r: {
          min: 0,
          max: 8,
          ticks: {
            stepSize: 2,
            color: isLight ? "#666666" : "rgba(255,255,255,0.8)",
            backdropColor: "transparent"
          },
          grid: {
            color: isLight
              ? "rgba(0,0,0,0.10)"
              : "rgba(255,255,255,0.12)"
          },
          angleLines: {
            color: isLight
              ? "rgba(0,0,0,0.10)"
              : "rgba(255,255,255,0.12)"
          },
          pointLabels: {
            color: isLight ? "#1a1a1a" : "#ffffff",
            font: {
              size: 12,
              weight: "500"
            }
          }
        }
      }
    }
  });
}

  function renderResult() {
    const profileKey = resolveProfile();
    const profile = profiles[profileKey][state.lang];
    const topAxes = getTopAxes();

    document.getElementById("iote-result-title").textContent = profile.title;
    document.getElementById("iote-result-description").textContent = profile.description;
    document.getElementById("iote-match-copy").textContent = profile.match;

    renderStrengths(topAxes);
    renderChart();
  }

  document.getElementById("path-start-btn").addEventListener("click", startAssessment);
  document.getElementById("iote-restart-btn").addEventListener("click", () => {
    setView("intro");
  });

  document.querySelectorAll(".iote-lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      applyLanguage();
    });
  });

  applyLanguage();
})();
