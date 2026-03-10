window.IOTE_KNOWLEDGE_EN = {
  assistantName: "IOTE assistance",
  status: "Website navigation assistant",
  disclaimer: "This information is based only on the IOTE website and official KMITL admission sources. Please verify the latest official announcement before applying.",
  greeting: "Hi, I’m IOTE assistance. I can help you navigate the website and answer general admission questions.",
  fallback: "Sorry, I can currently answer only based on the IOTE website and official university sources. You can ask about admission rounds, projects, contact information, or ask me to guide you to a related page.",
  officialLabel: "Official KMITL admission announcement",
  officialAdmissionUrl: "https://new.reg.kmitl.ac.th/admission/#/",
  suggestions: [
    "What is Round 1?",
    "How many Quota projects are there?",
    "Take me to Admission",
    "Contact faculty",
    "Summarize this page"
  ],
  pages: {
    "index.html": "This is the homepage of the IOTE website. It helps users start exploring the program and navigate to key sections.",
    "about.html": "This page contains information about the IoT and Information Engineering program.",
    "academics.html": "This page contains curriculum and study-related information.",
    "admission.html": "This page is the main admission page. It includes Round 1 Portfolio, Round 2 Quota, and Round 3 Admission.",
    "portfolio.html": "This page lists projects in Round 1 Portfolio.",
    "quota.html": "This page lists projects in Round 2 Quota.",
    "admission3.html": "This page contains details for Round 3 Admission.",
    "faculty.html": "This page contains faculty member information and related contact details.",
    "contact.html": "This page contains general contact information.",
    "port1.html": "This page contains details for the Young Engineering Talent project.",
    "port2.html": "This page contains details for the Outstanding Students project.",
    "port3.html": "This page contains details for the Awards and Certificates project.",
    "port4.html": "This page contains details for the Science School project.",
    "port5.html": "This page contains details for the Engineering Pathway project.",
    "port6.html": "This page contains details for the POSN / Olympiad project.",
    "port7.html": "This page contains details for the children of KMITL staff project.",
    "quota1.html": "This page contains details for the Outstanding Students Quota.",
    "quota2.html": "This page contains details for the KMITL One Quota.",
    "quota3.html": "This page contains details for the K-Engineering Activity Quota."
  },
  intents: [
    {
      id: "page_summary",
      keywords: ["this page", "what page", "summarize this page", "current page"],
      response: (ctx) => ctx.currentPageSummary || "I can summarize the current page if it is included in the website knowledge."
    },
    {
      id: "round1_overview",
      keywords: ["round 1", "portfolio"],
      response: "Round 1 Portfolio includes several project-based admission options with different requirements.",
      actions: ["portfolio"]
    },
    {
      id: "round2_overview",
      keywords: ["round 2", "quota"],
      response: "Round 2 Quota includes 3 projects: Outstanding Students, KMITL One, and K-Engineering Activity.",
      actions: ["quota", "quota1", "quota2", "quota3"]
    },
    {
      id: "round3_overview",
      keywords: ["round 3", "admission 3", "admission3"],
      response: "Round 3 Admission follows university admission criteria. You can view the detailed requirements on the Round 3 page.",
      actions: ["admission3"]
    },
    {
      id: "portfolio_count",
      keywords: ["how many portfolio projects", "how many projects in round 1"],
      response: "Round 1 Portfolio has 7 projects.",
      actions: ["portfolio"]
    },
    {
      id: "quota_count",
      keywords: ["how many quota projects", "how many projects in round 2"],
      response: "Round 2 Quota has 3 projects.",
      actions: ["quota"]
    },
    {
      id: "contact_faculty",
      keywords: ["contact faculty", "faculty", "lecturer", "teacher"],
      response: "You can view faculty information and related details on the Faculty page.",
      actions: ["faculty", "contact"]
    },
    {
      id: "contact_general",
      keywords: ["contact", "contact information", "how to contact"],
      response: "You can find general contact information on the Contact page.",
      actions: ["contact"]
    },
    {
      id: "go_admission",
      keywords: ["go to admission", "take me to admission", "admission page"],
      response: "Here is the admission page for the program.",
      actions: ["admission"]
    },
    {
      id: "go_portfolio",
      keywords: ["go to portfolio", "take me to portfolio"],
      response: "Here is the Round 1 Portfolio page.",
      actions: ["portfolio"]
    },
    {
      id: "go_quota",
      keywords: ["go to quota", "take me to quota"],
      response: "Here is the Round 2 Quota page.",
      actions: ["quota"]
    },
    {
      id: "go_round3",
      keywords: ["go to round 3", "take me to round 3"],
      response: "Here is the Round 3 Admission page.",
      actions: ["admission3"]
    },
    {
      id: "go_home",
      keywords: ["home", "go home", "homepage"],
      response: "Here is the homepage of the IOTE website.",
      actions: ["home"]
    },
    {
      id: "go_about",
      keywords: ["about", "program info"],
      response: "You can view program information on the About page.",
      actions: ["about"]
    },
    {
      id: "go_academics",
      keywords: ["academics", "curriculum", "courses", "study"],
      response: "You can view curriculum and study information on the Academics page.",
      actions: ["academics"]
    },
    {
      id: "go_port1",
      keywords: ["young engineering talent", "port1"],
      response: "Here are the details for the Young Engineering Talent project.",
      actions: ["port1"]
    },
    {
      id: "go_port2",
      keywords: ["outstanding students", "port2"],
      response: "Here are the details for the Outstanding Students project.",
      actions: ["port2"]
    },
    {
      id: "go_port3",
      keywords: ["awards", "certificates", "port3"],
      response: "Here are the details for the Awards and Certificates project.",
      actions: ["port3"]
    },
    {
      id: "go_port4",
      keywords: ["science school", "port4"],
      response: "Here are the details for the Science School project.",
      actions: ["port4"]
    },
    {
      id: "go_port5",
      keywords: ["engineering pathway", "port5"],
      response: "Here are the details for the Engineering Pathway project.",
      actions: ["port5"]
    },
    {
      id: "go_port6",
      keywords: ["posn", "olympiad", "port6"],
      response: "Here are the details for the POSN / Olympiad project.",
      actions: ["port6"]
    },
    {
      id: "go_port7",
      keywords: ["children of staff", "port7"],
      response: "Here are the details for the children of KMITL staff project.",
      actions: ["port7"]
    },
    {
      id: "go_quota1",
      keywords: ["outstanding students quota", "quota1"],
      response: "Here are the details for the Outstanding Students Quota.",
      actions: ["quota1"]
    },
    {
      id: "go_quota2",
      keywords: ["kmitl one", "quota2"],
      response: "Here are the details for the KMITL One Quota.",
      actions: ["quota2"]
    },
    {
      id: "go_quota3",
      keywords: ["k-engineering", "activity quota", "quota3"],
      response: "Here are the details for the K-Engineering Activity Quota.",
      actions: ["quota3"]
    },
    {
      id: "official_announcement",
      keywords: ["official announcement", "official admission", "reg kmitl", "application link"],
      response: "You can check the official university announcement from this link.",
      official: true
    }
  ]
};  