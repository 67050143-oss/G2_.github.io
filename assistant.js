(function(){
  const SESSION_KEY = "iote_assistant_session_v1";

  function getSession(){
    try{
      return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || {
        isOpen: false,
        language: null,
        greeted: false,
        messages: []
      };
    }catch(e){
      return {
        isOpen: false,
        language: null,
        greeted: false,
        messages: []
      };
    }
  }

  function saveSession(data){
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }

  function detectLanguage(text){
    if(/[ก-๙]/.test(text)) return "th";
    return "en";
  }

  function nowTime(){
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function escapeHtml(text){
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function normalizeText(text){
    return (text || "").trim().toLowerCase();
  }

  function getCurrentPageSummary(lang){
    const file = location.pathname.split("/").pop() || "index.html";
    const knowledge = lang === "th" ? window.IOTE_KNOWLEDGE_TH : window.IOTE_KNOWLEDGE_EN;
    return knowledge.pages[file] || null;
  }

  function getKnowledge(lang){
    return lang === "th" ? window.IOTE_KNOWLEDGE_TH : window.IOTE_KNOWLEDGE_EN;
  }

  function buildResponse(text, lang, actions = [], official = false){
    const knowledge = getKnowledge(lang);
    const out = {
      text,
      actions: [],
      official: null
    };

    if(actions && actions.length){
      out.actions = actions
        .map(key => window.IOTE_ROUTES[key] ? { key, ...window.IOTE_ROUTES[key] } : null)
        .filter(Boolean);
    }

    if(official){
      out.official = {
        label: knowledge.officialLabel,
        url: knowledge.officialAdmissionUrl
      };
    }

    return out;
  }

  function findIntent(message, lang){
    const q = normalizeText(message);
    const knowledge = getKnowledge(lang);
    const ctx = {
      currentPageSummary: getCurrentPageSummary(lang)
    };

    for(const intent of knowledge.intents){
      for(const keyword of intent.keywords){
        if(q.includes(keyword.toLowerCase())){
          const text = typeof intent.response === "function" ? intent.response(ctx) : intent.response;
          return buildResponse(text, lang, intent.actions || [], intent.official || false);
        }
      }
    }

    return null;
  }

  function createWidget(){
    const root = document.createElement("div");
    root.id = "iote-assistant-root";
    root.innerHTML = `
      <button class="iote-assistant-fab" id="ioteFab" aria-label="Open assistant">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v7c0 1.38-1.12 2.5-2.5 2.5h-6.4L7 19.5V16H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="iote-assistant-panel" id="iotePanel">
        <div class="iote-assistant-header">
          <div class="iote-assistant-title">
            <div class="iote-assistant-avatar">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm-5 14a5 5 0 0 1 10 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M18.5 8.5h1m-4-5v1m0 8v1m4-4h-1m-5.5-3l.7.7m3.6 3.6l.7.7m0-5l-.7.7m-3.6 3.6l-.7.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="iote-assistant-title-text">
              <h4 id="ioteHeaderTitle">IOTE assistance</h4>
              <p id="ioteHeaderStatus">Website navigation assistant</p>
            </div>
          </div>

          <div class="iote-assistant-controls">
            <div class="iote-lang-toggle">
              <button class="iote-lang-btn" id="ioteLangTH" type="button">TH</button>
              <button class="iote-lang-btn" id="ioteLangEN" type="button">EN</button>
            </div>
            <button class="iote-close-btn" id="ioteCloseBtn" type="button" aria-label="Close">×</button>
          </div>
        </div>

        <div class="iote-assistant-body" id="ioteMessages"></div>
        <div class="iote-suggestions" id="ioteSuggestions"></div>

        <div class="iote-assistant-footer">
          <div class="iote-input-wrap">
            <input class="iote-input" id="ioteInput" type="text" />
            <button class="iote-send-btn" id="ioteSendBtn" type="button" aria-label="Send">
              ➜
            </button>
          </div>
          <div class="iote-disclaimer" id="ioteDisclaimer"></div>
        </div>
      </div>
    `;
    document.body.appendChild(root);
  }

  function addMessage(message, sender, options = {}){
    const messagesEl = document.getElementById("ioteMessages");
    const wrap = document.createElement("div");
    wrap.className = `iote-message ${sender}`;

    let actionsHtml = "";
    if(options.actions && options.actions.length){
      actionsHtml += `<div class="iote-card-actions">`;
      options.actions.forEach(action => {
        actionsHtml += `<button class="iote-nav-btn" data-url="${action.url}">${escapeHtml(action[options.lang] || action.th)}</button>`;
      });
      actionsHtml += `</div>`;
    }

    if(options.official){
      actionsHtml += `
        <div class="iote-card-actions">
          <button class="iote-nav-btn iote-official-btn" data-external="${options.official.url}">
            ${escapeHtml(options.official.label)}
          </button>
        </div>
      `;
    }

    wrap.innerHTML = `
      <div class="iote-bubble">
        ${options.html ? message : escapeHtml(message)}
        ${actionsHtml}
      </div>
      <div class="iote-message-meta">${nowTime()}</div>
    `;

    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderSuggestions(lang){
    const knowledge = getKnowledge(lang);
    const el = document.getElementById("ioteSuggestions");
    el.innerHTML = "";
    knowledge.suggestions.forEach(text => {
      const btn = document.createElement("button");
      btn.className = "iote-chip";
      btn.type = "button";
      btn.textContent = text;
      btn.addEventListener("click", () => {
        sendUserMessage(text, false);
      });
      el.appendChild(btn);
    });
  }

  function renderHeader(lang){
    const knowledge = getKnowledge(lang);
    document.getElementById("ioteHeaderTitle").textContent = knowledge.assistantName;
    document.getElementById("ioteHeaderStatus").textContent = knowledge.status;
    document.getElementById("ioteDisclaimer").textContent = knowledge.disclaimer;

    const input = document.getElementById("ioteInput");
    input.placeholder = lang === "th" ? "พิมพ์คำถามที่นี่..." : "Type your question...";
  }

  function updateLanguageButtons(lang){
    document.getElementById("ioteLangTH").classList.toggle("active", lang === "th");
    document.getElementById("ioteLangEN").classList.toggle("active", lang === "en");
  }

  function addTyping(){
    const messagesEl = document.getElementById("ioteMessages");
    const wrap = document.createElement("div");
    wrap.className = "iote-message bot";
    wrap.id = "ioteTyping";
    wrap.innerHTML = `
      <div class="iote-bubble">
        <span class="iote-typing"><span></span><span></span><span></span></span>
      </div>
    `;
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping(){
    const el = document.getElementById("ioteTyping");
    if(el) el.remove();
  }

  function loadHistory(){
    const session = getSession();
    const messagesEl = document.getElementById("ioteMessages");
    messagesEl.innerHTML = "";

    if(session.messages && session.messages.length){
      session.messages.forEach(msg => {
        addMessage(msg.text, msg.sender, {
          actions: msg.actions || [],
          official: msg.official || null,
          lang: msg.lang || session.language || "th"
        });
      });
    }
  }

  function pushSessionMessage(text, sender, extra = {}){
    const session = getSession();
    session.messages.push({
      text,
      sender,
      lang: extra.lang || session.language || "th",
      actions: extra.actions || [],
      official: extra.official || null
    });
    saveSession(session);
  }

  function getActiveLanguage(textFromUser){
    const session = getSession();
    if(session.language) return session.language;
    return detectLanguage(textFromUser || document.documentElement.lang || "th");
  }

  function setLanguage(lang, rerender = false){
    const session = getSession();
    session.language = lang;
    saveSession(session);
    renderHeader(lang);
    renderSuggestions(lang);
    updateLanguageButtons(lang);

    if(rerender){
      loadHistory();
    }
  }

  function sendBotResponse(response, lang){
    addTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(response.text, "bot", {
        actions: response.actions,
        official: response.official,
        lang
      });
      pushSessionMessage(response.text, "bot", {
        lang,
        actions: response.actions,
        official: response.official
      });
      bindActionButtons();
    }, 450);
  }

  function sendGreetingIfNeeded(){
    const session = getSession();
    const lang = session.language || detectLanguage(document.documentElement.lang || "th");
    setLanguage(lang);

    if(!session.greeted){
      const knowledge = getKnowledge(lang);
      const response = buildResponse(knowledge.greeting, lang, ["admission", "faculty"]);
      sendBotResponse(response, lang);
      session.greeted = true;
      saveSession(session);
    }
  }

  function fallbackResponse(lang){
    const knowledge = getKnowledge(lang);
    return buildResponse(knowledge.fallback, lang, ["admission", "contact"], true);
  }

  function sendUserMessage(text, fromInput = true){
    const input = document.getElementById("ioteInput");
    const raw = (text || input.value || "").trim();
    if(!raw) return;

    const lang = getActiveLanguage(raw);
    setLanguage(lang);

    addMessage(raw, "user");
    pushSessionMessage(raw, "user", { lang });

    if(fromInput) input.value = "";

    const result = findIntent(raw, lang) || fallbackResponse(lang);
    sendBotResponse(result, lang);
  }

  function bindActionButtons(){
    document.querySelectorAll(".iote-nav-btn[data-url]").forEach(btn => {
      if(btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        window.location.href = btn.dataset.url;
      });
    });

    document.querySelectorAll(".iote-nav-btn[data-external]").forEach(btn => {
      if(btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        window.open(btn.dataset.external, "_blank");
      });
    });
  }

  function initAssistant(){
    createWidget();

    const session = getSession();
    const panel = document.getElementById("iotePanel");
    const fab = document.getElementById("ioteFab");
    const closeBtn = document.getElementById("ioteCloseBtn");
    const sendBtn = document.getElementById("ioteSendBtn");
    const input = document.getElementById("ioteInput");

    const defaultLang = session.language || detectLanguage(document.documentElement.lang || "th");
    setLanguage(defaultLang);
    loadHistory();
    bindActionButtons();

    if(session.isOpen){
      panel.classList.add("open");
    }

    setTimeout(() => {
      sendGreetingIfNeeded();
    }, 700);

    fab.addEventListener("click", () => {
      panel.classList.toggle("open");
      const s = getSession();
      s.isOpen = panel.classList.contains("open");
      saveSession(s);
    });

    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open");
      const s = getSession();
      s.isOpen = false;
      saveSession(s);
    });

    sendBtn.addEventListener("click", () => sendUserMessage());

    input.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        sendUserMessage();
      }
    });

    document.getElementById("ioteLangTH").addEventListener("click", () => setLanguage("th"));
    document.getElementById("ioteLangEN").addEventListener("click", () => setLanguage("en"));
  }

  document.addEventListener("DOMContentLoaded", initAssistant);
})();