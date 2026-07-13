const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "index.html");

const site = {
  name: "Sergey Rubanov",
  imageAlt: "Social preview card for Sergey Rubanov, highlighting software engineering, web platform standards, and AI agents",
  baseUrl: "https://sergey.works",
};

const common = {
  "link.github": "GitHub profile",
  "link.linkedin": "LinkedIn profile",
  "link.x": "X profile",
  "link.bluesky": "Bluesky profile",
  "privacy.label": "Privacy",
  "privacy.notice": "privacy notice",
  "privacy.noticeAria": "Privacy notice",
  "console.title": "sergey.works tty0",
  "console.esc": "Esc to close",
  "common.close": "Close",
};

const locales = [
  {
    code: "es",
    htmlLang: "es",
    ogLocale: "es_ES",
    imageAlt: "Tarjeta de vista previa del sitio de Sergey Rubanov: ingeniería, estándares web y agentes de IA",
    description:
      "Desarrollo e investigación independiente en infraestructura para agentes de IA, plataforma web, herramientas para desarrolladores y código abierto.",
    messages: {
      ...common,
      "skip.main": "Saltar al contenido principal",
      "nav.primary": "Enlaces principales",
      "nav.languages": "Versiones de idioma",
      "cv.label": "CV",
      "cv.openHtml": "Abrir CV en HTML",
      "cv.openHtmlFull": "Abrir el CV de Sergey Rubanov en HTML",
      "cv.downloadPdf": "Descargar el CV de Sergey Rubanov en PDF",
      "link.github": "Perfil de GitHub",
      "link.linkedin": "Perfil de LinkedIn",
      "link.x": "Perfil de X",
      "link.bluesky": "Perfil de Bluesky",
      "privacy.label": "Privacidad",
      "privacy.notice": "aviso de privacidad",
      "privacy.noticeAria": "Aviso de privacidad",
      "hero.name": "Sergey Rubanov",
      "hero.nameCaps": "SERGEY RUBANOV",
      "hero.tagline": "Investigación · estándares web · agentes de IA · código abierto",
      "hero.summary":
        "Desarrollo e investigación independiente en infraestructura para agentes de IA, plataforma web, herramientas para desarrolladores y código abierto.",
      "hero.standards":
        'Trabajo con estándares de <span class="tc39">TC39</span> y <span class="w3c">W3C</span>, en el punto donde el texto de las especificaciones se cruza con navegadores, runtimes y APIs para desarrolladores.',
      "skills.heading": "Competencias clave",
      "skills.ai": "Sistemas AI / LLM",
      "skills.agentOrchestration": "orquestación de agentes",
      "skills.promptTool": "flujos de prompts y herramientas",
      "skills.harness": "bancos de prueba",
      "skills.web": "Plataforma web / estándares",
      "skills.browsers": "navegadores/webviews",
      "skills.languages": "Lenguajes",
      "skills.platform": "Plataforma / observabilidad",
      "skills.traces": "trazas/métricas/logs",
      "project.website": "sitio web",
      "project.what": "descripción",
      "project.features": "funcionalidad",
      "project.stack": "tecnologías",
      "project.soon": "pronto",
      "project.pragmatist.soonLabel": "Lanzamiento de Pragmatist próximamente",
      "project.hecate.what": "Consola local-first para ejecutar modelos de IA locales o en la nube, con Hecate Chat",
      "project.hecate.features": "Sesiones supervisadas con agentes de código · aprobación de tareas · visibilidad del uso · OpenTelemetry",
      "project.cynic.what": "Motor ECMAScript strict-only en Zig para entornos que no son navegador, como edge JS, Workers y JS de servidor",
      "project.pragmatist.what": "Herramienta para encontrar, reproducir y verificar errores en ECMA-262, TypeScript y motores JavaScript",
      "project.pragmatist.features":
        "Consultas sobre especificaciones · mecanización en Coq/Rocq · diffs del parser y las librerías de TypeScript · pruebas diferenciales entre motores · plantillas de parches para test262/spec · verificación determinista",
      "project.tc39mcp.what":
        "Servidor MCP que expone las especificaciones TC39 como datos por cláusula, fijados por SHA, para agentes y herramientas",
      "project.tc39mcp.features":
        "Búsqueda por AOID · referencias entre especificaciones · diffs entre ediciones · historial git · búsqueda en test262 y propuestas · stdio offline y HTTP público",
      "project.wasmmcp.what": "Endpoint MCP para especificaciones WebAssembly y contexto de tooling para agentes y herramientas",
      "project.wasmmcp.features": "Contexto de especificaciones WebAssembly · búsqueda orientada a agentes · endpoint HTTP público",
      "project.more.title": "Más proyectos",
      "project.more.personal": "repos personales",
      "project.more.key": "enlace",
      "project.more.what": "Más proyectos de código abierto, experimentos y herramientas pequeñas están en GitHub.",
      "contact.openTo": "áreas: agentes de IA · plataforma web · herramientas para desarrolladores · observabilidad · estándares",
      "contact.location": "Barcelona, España · disponible para trabajo remoto",
      "controls.timeMachine": "Máquina del tiempo",
      "controls.timeMachineTitle": "Viajar a 1997",
      "controls.tweaks": "Vista / accesibilidad",
      "controls.tweaksTitle": "Ajustes visuales y de accesibilidad",
      "a11y.title": "Paleta legible",
      "a11y.default": "Predeterminado",
      "a11y.deuteranopia": "Deuteranopía",
      "a11y.protanopia": "Protanopía",
      "a11y.tritanopia": "Tritanopía",
      "a11y.highContrast": "Alto contraste",
      "console.close": "Cerrar terminal",
      "console.input": "Entrada de comandos del terminal",
      "console.tab": "tab: autocompletar",
      "console.history": "historial: ↑↓",
      "tweaks.close": "Cerrar ajustes visuales y de accesibilidad",
      "tweaks.theme": "Tema de color",
      "tweaks.background": "Efecto de fondo",
      "tweaks.intensity": "intensidad",
      "tweaks.fontSize": "Tamaño de fuente",
      "tweaks.medium": "Medio",
      "retro.close": "Cerrar [X]",
      "retro.closeLabel": "Cerrar modo noventero",
      "retro.marquee": "⭐ BIENVENIDO A LA HOMEPAGE DE SERGEY RUBANOV ⭐ NETSCAPE NAVIGATOR 4.0 SE VE MEJOR A 800×600 ⭐ FIRMA MI LIBRO DE VISITAS ⭐",
      "retro.name": "SERGEY RUBANOV",
      "retro.tagline": '<span class="blink">★</span> AI Agents <span class="blink">★</span> Web Platform <span class="blink">★</span> Developer Tools <span class="blink">★</span>',
      "retro.visitor": "ERES VISITANTE #",
      "retro.location": "Barcelona, España",
      "retro.bestViewed": "Se ve mejor en",
      "retro.loading": "Cargando applet Java...",
      "retro.updated": "Última actualización:<br>HOY!!!!",
      "retro.aboutTitle": "🌟 SOBRE MÍ!!! 🌟",
      "retro.aboutCopy":
        'HOLA!!! Me llamo Sergey y soy <b style="color:#00ffff">INGENIERO DE SOFTWARE!!!</b> Trabajo en <b style="color:#ffff00">agentes de IA</b>, la <b style="color:#00ff00">plataforma web</b> y herramientas para desarrolladores!!! También trabajo con estándares <span class="blink" style="color:#ff00ff"><b>TC39 + W3C</b></span>: leo especificaciones para que tú no tengas que hacerlo!!!',
      "retro.aboutNote": "Esta página está hecha a mano con cariño, colores cuestionables y maquetación con tablas históricamente correcta!!!",
      "retro.linksTitle": "🔗 MIS LINKS EN LA AUTOPISTA DE LA INFORMACIÓN 🔗",
      "retro.readCv": "Leer mi CV",
      "retro.savePdf": "Guardar como PDF",
      "retro.cvNote": "PDF muy serio!!!",
      "retro.githubNote": "Mi CÓDIGO!!!",
      "retro.linkedinNote": "Perfil profesional",
      "retro.xNote": "Microblog!!",
      "retro.bskyNote": "Perfil actual!!!",
      "retro.skillsTitle": "💾 MIS SKILLZ 💾",
      "retro.skillsAi": "Sistemas AI / LLM:",
      "retro.skillsWeb": "Plataforma web / estándares:",
      "retro.skillsLanguages": "Lenguajes:",
      "retro.skillsPlatform": "Plataforma / observabilidad:",
      "retro.projectsTitle": "🚀 MIS PROJECTZ 🚀",
      "retro.projectsCopy":
        '<b style="color:#ffff00">Hecate</b> — consola local-first para modelos locales o en la nube, Hecate Chat, sesiones supervisadas con agentes de código, aprobación de tareas, visibilidad del uso y OpenTelemetry!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">código fuente</a><br><br><b style="color:#ffff00">Cynic</b> — motor ECMAScript strict-only en Zig para entornos que no son navegadores!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">código fuente</a><br><br><b style="color:#ffff00">Pragmatist</b> — herramienta para encontrar, reproducir y verificar errores en ECMA-262, TypeScript y motores JS!!! Consulta especificaciones, compara motores, prepara parches para test262/spec y no se fía de las corazonadas!!!<br><span class="retro-soon">Disponible pronto!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — servidor MCP para especificaciones TC39!!! Los agentes reciben cláusulas ECMA-262 + ECMA-402 fijadas por SHA, búsqueda AOID, referencias, diffs, historial, test262 y propuestas sin extraer datos de un HTML gigante!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">código fuente</a><br><br><b style="color:#ffff00">WASM MCP</b> — endpoint MCP para especificaciones WebAssembly y contexto de tooling!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
      "retro.guestbookTitle": "📖 FIRMA MI LIBRO DE VISITAS!!! 📖",
      "retro.guestbookHandle": "TU NOMBRE:",
      "retro.guestbookMessage": "MENSAJE PARA SERGEY:",
      "retro.guestbookSubmit": "Firmar libro de visitas",
      "retro.guestbookEntries": "Entradas del libro de visitas",
      "retro.copyright": "© 1997 Sergey Rubanov · Todos los derechos reservados",
      "retro.bestViewedFooter": "Esta página se ve mejor en 800×600",
      "retro.modalLabel": "Guardando mensaje del libro de visitas",
      "retro.modalTitle": "Preparando libro de visitas",
      "retro.modalSaving": "Guardando tu firma en el libro de visitas...",
      "retro.modalStep": "Arrancando almacenamiento noventero",
      "retro.modalProgress": "0% completado",
    },
  },
  {
    code: "ca",
    htmlLang: "ca",
    ogLocale: "ca_ES",
    imageAlt: "Targeta de previsualització del lloc de Sergey Rubanov: enginyeria, estàndards web i agents d'IA",
    description:
      "Desenvolupament i recerca independent en infraestructura per a agents d’IA, plataforma web, eines per a desenvolupadors i codi obert.",
    messages: {
      ...common,
      "skip.main": "Ves al contingut principal",
      "nav.primary": "Enllaços principals",
      "nav.languages": "Versions d'idioma",
      "cv.label": "CV",
      "cv.openHtml": "Obrir el CV en HTML",
      "cv.openHtmlFull": "Obrir el CV de Sergey Rubanov en HTML",
      "cv.downloadPdf": "Descarregar el CV de Sergey Rubanov en PDF",
      "link.github": "Perfil de GitHub",
      "link.linkedin": "Perfil de LinkedIn",
      "link.x": "Perfil d'X",
      "link.bluesky": "Perfil de Bluesky",
      "privacy.label": "Privacitat",
      "privacy.notice": "avís de privacitat",
      "privacy.noticeAria": "Avís de privacitat",
      "hero.name": "Sergey Rubanov",
      "hero.nameCaps": "SERGEY RUBANOV",
      "hero.tagline": "Recerca · estàndards web · agents d'IA · codi obert",
      "hero.summary":
        "Desenvolupament i recerca independent en infraestructura per a agents d'IA, plataforma web, eines per a desenvolupadors i codi obert.",
      "hero.standards":
        'Treball amb estàndards de <span class="tc39">TC39</span> i <span class="w3c">W3C</span>, al punt on el text de les especificacions es troba amb navegadors, runtimes i APIs per a desenvolupadors.',
      "skills.heading": "Competències clau",
      "skills.ai": "Sistemes AI / LLM",
      "skills.agentOrchestration": "orquestració d'agents",
      "skills.promptTool": "fluxos de prompts i eines",
      "skills.harness": "bancs de proves",
      "skills.web": "Plataforma web / estàndards",
      "skills.browsers": "navegadors/webviews",
      "skills.languages": "Llenguatges",
      "skills.platform": "Plataforma / observabilitat",
      "skills.traces": "traces/mètriques/logs",
      "project.website": "web",
      "project.what": "descripció",
      "project.features": "funcionalitats",
      "project.stack": "tecnologies",
      "project.soon": "aviat",
      "project.pragmatist.soonLabel": "Llançament de Pragmatist aviat",
      "project.hecate.what": "Consola local-first per executar models d'IA locals o al núvol, amb Hecate Chat",
      "project.hecate.features": "Sessions supervisades amb agents de codi · aprovació de tasques · visibilitat sobre l'ús · OpenTelemetry",
      "project.cynic.what": "Motor ECMAScript strict-only en Zig per a entorns que no són navegador, com edge JS, Workers i JS de servidor",
      "project.pragmatist.what": "Eina per trobar, reproduir i verificar errors a ECMA-262, TypeScript i motors JavaScript",
      "project.pragmatist.features":
        "Consultes sobre especificacions · mecanització en Coq/Rocq · diffs del parser i les llibreries de TypeScript · plantilles de patches per a test262/spec · proves diferencials entre motors · verificació determinista",
      "project.tc39mcp.what":
        "Servidor MCP que exposa les especificacions TC39 com a dades per clàusula, fixades per SHA, per a agents i eines",
      "project.tc39mcp.features":
        "Cerca per AOID · referències entre especificacions · diffs entre edicions · historial git · cerca a test262 i propostes · stdio offline i HTTP públic",
      "project.wasmmcp.what": "Endpoint MCP per a especificacions WebAssembly i context de tooling per a agents i eines",
      "project.wasmmcp.features": "Context d'especificacions WebAssembly · cerca orientada a agents · endpoint HTTP públic",
      "project.more.title": "Més projectes",
      "project.more.personal": "repos personals",
      "project.more.key": "enllaç",
      "project.more.what": "Hi ha més projectes de codi obert, experiments i eines petites a GitHub.",
      "contact.openTo": "àrees: agents d'IA · plataforma web · eines per a desenvolupadors · observabilitat · estàndards",
      "contact.location": "Barcelona, Espanya · disponible en remot",
      "controls.timeMachine": "Màquina del temps",
      "controls.timeMachineTitle": "Viatjar a 1997",
      "controls.tweaks": "Vista / accessibilitat",
      "controls.tweaksTitle": "Ajustos visuals i d'accessibilitat",
      "a11y.title": "Paleta llegible",
      "a11y.default": "Predeterminat",
      "a11y.deuteranopia": "Deuteranopia",
      "a11y.protanopia": "Protanopia",
      "a11y.tritanopia": "Tritanopia",
      "a11y.highContrast": "Alt contrast",
      "console.close": "Tancar terminal",
      "console.input": "Entrada d'ordres del terminal",
      "console.tab": "tab: autocompletar",
      "console.history": "historial: ↑↓",
      "tweaks.close": "Tancar ajustos visuals i d'accessibilitat",
      "tweaks.theme": "Tema de color",
      "tweaks.background": "Efecte de fons",
      "tweaks.intensity": "intensitat",
      "tweaks.fontSize": "Mida de font",
      "tweaks.medium": "Mitjana",
      "retro.close": "Tancar [X]",
      "retro.closeLabel": "Tancar mode noranter",
      "retro.marquee": "⭐ BENVINGUT A LA HOMEPAGE DE SERGEY RUBANOV ⭐ NETSCAPE NAVIGATOR 4.0 ES VEU MILLOR A 800×600 ⭐ SIGNA EL MEU LLIBRE DE VISITES ⭐",
      "retro.name": "SERGEY RUBANOV",
      "retro.tagline": '<span class="blink">★</span> AI Agents <span class="blink">★</span> Web Platform <span class="blink">★</span> Developer Tools <span class="blink">★</span>',
      "retro.visitor": "ETS EL VISITANT #",
      "retro.location": "Barcelona, Espanya",
      "retro.bestViewed": "Es veu millor amb",
      "retro.loading": "Carregant applet Java...",
      "retro.updated": "Última actualització:<br>AVUI!!!!",
      "retro.aboutTitle": "🌟 SOBRE MI!!! 🌟",
      "retro.aboutCopy":
        'HOLA!!! Em dic Sergey i soc <b style="color:#00ffff">ENGINYER DE SOFTWARE!!!</b> Treballo en <b style="color:#ffff00">agents d’IA</b>, la <b style="color:#00ff00">plataforma web</b> i eines per a desenvolupadors!!! També treballo amb estàndards <span class="blink" style="color:#ff00ff"><b>TC39 + W3C</b></span>: llegeixo especificacions perquè tu no ho hagis de fer!!!',
      "retro.aboutNote": "Aquesta pàgina està feta a mà amb cura, colors qüestionables i maquetació amb taules històricament correcta!!!",
      "retro.linksTitle": "🔗 ELS MEUS LINKS A L'AUTOPISTA DE LA INFORMACIÓ 🔗",
      "retro.readCv": "Llegir el meu CV",
      "retro.savePdf": "Guardar com a PDF",
      "retro.cvNote": "PDF molt seriós!!!",
      "retro.githubNote": "El meu CODI!!!",
      "retro.linkedinNote": "Perfil professional",
      "retro.xNote": "Microblog!!",
      "retro.bskyNote": "Perfil actual!!!",
      "retro.skillsTitle": "💾 LES MEVES SKILLZ 💾",
      "retro.skillsAi": "Sistemes AI / LLM:",
      "retro.skillsWeb": "Plataforma web / estàndards:",
      "retro.skillsLanguages": "Llenguatges:",
      "retro.skillsPlatform": "Plataforma / observabilitat:",
      "retro.projectsTitle": "🚀 ELS MEUS PROJECTZ 🚀",
      "retro.projectsCopy":
        '<b style="color:#ffff00">Hecate</b> — consola local-first per a models locals o al núvol, Hecate Chat, sessions supervisades amb agents de codi, aprovació de tasques, visibilitat sobre l’ús i OpenTelemetry!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">codi font</a><br><br><b style="color:#ffff00">Cynic</b> — motor ECMAScript strict-only en Zig per a entorns que no són navegadors!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">codi font</a><br><br><b style="color:#ffff00">Pragmatist</b> — eina per trobar, reproduir i verificar errors a ECMA-262, TypeScript i motors JS!!! Consulta especificacions, compara motors, prepara patches per a test262/spec i no es refia de les intuïcions!!!<br><span class="retro-soon">Disponible aviat!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — servidor MCP per a especificacions TC39!!! Els agents reben clàusules ECMA-262 + ECMA-402 fixades per SHA, cerca AOID, referències, diffs, historial, test262 i propostes sense extreure dades d’un HTML gegant!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">codi font</a><br><br><b style="color:#ffff00">WASM MCP</b> — endpoint MCP per a especificacions WebAssembly i context de tooling!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
      "retro.guestbookTitle": "📖 SIGNA EL MEU LLIBRE DE VISITES!!! 📖",
      "retro.guestbookHandle": "EL TEU NOM:",
      "retro.guestbookMessage": "MISSATGE PER A SERGEY:",
      "retro.guestbookSubmit": "Signar el llibre de visites",
      "retro.guestbookEntries": "Entrades del llibre de visites",
      "retro.copyright": "© 1997 Sergey Rubanov · Tots els drets reservats",
      "retro.bestViewedFooter": "Aquesta pàgina es veu millor a 800×600",
      "retro.modalLabel": "Desant missatge del llibre de visites",
      "retro.modalTitle": "Preparant el llibre de visites",
      "retro.modalSaving": "Desant la teva signatura al llibre de visites...",
      "retro.modalStep": "Arrencant l'emmagatzematge dels 90",
      "retro.modalProgress": "0% completat",
    },
  },
  {
    code: "zh",
    htmlLang: "zh-Hans",
    ogLocale: "zh_CN",
    imageAlt: "Sergey Rubanov 网站的社交预览卡片：工程、Web 平台标准和 AI 智能体",
    description: "从事 AI 智能体基础设施、Web 平台、开发者工具和开源方向的开发与独立研究。",
    messages: {
      ...common,
      "skip.main": "跳到主要内容",
      "nav.primary": "主要链接",
      "nav.languages": "语言版本",
      "cv.label": "简历",
      "cv.openHtml": "打开 HTML 简历",
      "cv.openHtmlFull": "打开 Sergey Rubanov 的 HTML 简历",
      "cv.downloadPdf": "下载 Sergey Rubanov 的 PDF 简历",
      "link.github": "GitHub 主页",
      "link.linkedin": "LinkedIn 主页",
      "link.x": "X 主页",
      "link.bluesky": "Bluesky 主页",
      "privacy.label": "隐私",
      "privacy.notice": "隐私说明",
      "privacy.noticeAria": "隐私说明",
      "hero.name": "Sergey Rubanov",
      "hero.nameCaps": "SERGEY RUBANOV",
      "hero.tagline": "研究 · Web 平台标准 · AI 智能体 · 开源",
      "hero.summary": "从事 AI 智能体基础设施、Web 平台、开发者工具和开源方向的开发与独立研究。",
      "hero.standards": '参与 <span class="tc39">TC39</span> 与 <span class="w3c">W3C</span> 标准相关工作，关注规范文本、浏览器行为、运行时和开发者 API 的交界处。',
      "skills.heading": "核心技能",
      "skills.ai": "AI / LLM 系统",
      "skills.agentOrchestration": "智能体编排",
      "skills.promptTool": "提示词/工具流程",
      "skills.harness": "测试框架",
      "skills.web": "Web 平台 / 标准",
      "skills.browsers": "浏览器/WebView",
      "skills.languages": "语言",
      "skills.platform": "平台 / 可观测性",
      "skills.traces": "追踪/指标/日志",
      "project.website": "网站",
      "project.what": "简介",
      "project.features": "功能",
      "project.stack": "技术",
      "project.soon": "即将发布",
      "project.pragmatist.soonLabel": "Pragmatist 即将发布",
      "project.hecate.what": "本地优先的 AI 控制台，用于运行本地/云端模型和 Hecate Chat",
      "project.hecate.features": "受控的代码智能体会话 · 任务审批 · 用量可见性 · OpenTelemetry",
      "project.cynic.what": "用 Zig 编写的 strict-only ECMAScript 引擎，面向 edge JS、Workers 和服务端 JS 等非浏览器宿主",
      "project.pragmatist.what": "用于在 ECMA-262、TypeScript 和 JavaScript 引擎中发现、复现并验证错误的工具",
      "project.pragmatist.features": "规范查询 · Coq/Rocq 机械化 · TypeScript 解析器和库的差异分析 · 跨引擎差分运行 · test262/spec 补丁脚手架 · 确定性验证",
      "project.tc39mcp.what": "MCP 服务器，将 TC39 规范暴露为按条款组织、由 SHA 固定的数据，供智能体和开发工具使用",
      "project.tc39mcp.features": "AOID 搜索 · 跨规范引用 · 版本差异 · git 历史 · test262 和提案查询 · 离线 stdio 与公开 HTTP",
      "project.wasmmcp.what": "面向 WebAssembly 规范和工具上下文的 MCP endpoint，供智能体和开发工具使用",
      "project.wasmmcp.features": "WebAssembly 规范上下文 · 面向智能体的查询 · 公开 HTTP endpoint",
      "project.more.title": "更多项目",
      "project.more.personal": "个人仓库",
      "project.more.key": "链接",
      "project.more.what": "更多开源工作、实验和小工具在 GitHub 上。",
      "contact.openTo": "方向：AI 智能体 · Web 平台 · 开发者工具 · 可观测性 · 标准",
      "contact.location": "常驻西班牙巴塞罗那 · 可远程合作",
      "controls.timeMachine": "时间机器",
      "controls.timeMachineTitle": "回到 1997",
      "controls.tweaks": "显示 / 无障碍",
      "controls.tweaksTitle": "视觉与无障碍设置",
      "a11y.title": "易读配色",
      "a11y.default": "默认",
      "a11y.deuteranopia": "绿色盲",
      "a11y.protanopia": "红色盲",
      "a11y.tritanopia": "蓝黄色盲",
      "a11y.highContrast": "高对比度",
      "console.close": "关闭终端",
      "console.input": "终端命令输入",
      "console.tab": "tab: 自动补全",
      "console.history": "历史: ↑↓",
      "tweaks.close": "关闭视觉与无障碍设置",
      "tweaks.theme": "颜色主题",
      "tweaks.background": "背景效果",
      "tweaks.intensity": "强度",
      "tweaks.fontSize": "字体大小",
      "tweaks.medium": "中",
      "retro.close": "关闭 [X]",
      "retro.closeLabel": "关闭 90 年代模式",
      "retro.marquee": "⭐ 欢迎来到 SERGEY RUBANOV 的主页 ⭐ NETSCAPE NAVIGATOR 4.0 最佳分辨率 800×600 ⭐ 给我的留言本签名 ⭐",
      "retro.name": "SERGEY RUBANOV",
      "retro.tagline": '<span class="blink">★</span> AI 智能体 <span class="blink">★</span> Web 平台 <span class="blink">★</span> 开发者工具 <span class="blink">★</span>',
      "retro.visitor": "你是第 # 位访客",
      "retro.location": "西班牙巴塞罗那",
      "retro.bestViewed": "最佳观看环境",
      "retro.loading": "正在加载 Java applet...",
      "retro.updated": "最后更新:<br>今天!!!!",
      "retro.aboutTitle": "🌟 关于我!!! 🌟",
      "retro.aboutCopy": '嗨!!! 我叫 Sergey，是一名 <b style="color:#00ffff">软件工程师!!!</b> 我做 <b style="color:#ffff00">AI 智能体</b>、<b style="color:#00ff00">Web 平台</b> 和开发者工具!!! 也参与 <span class="blink" style="color:#ff00ff"><b>TC39 + W3C</b></span> 的标准工作，替你阅读那些规范文本!!!',
      "retro.aboutNote": "这个页面手工制作，配色可疑，并且使用了历史准确的表格布局!!!",
      "retro.linksTitle": "🔗 信息高速公路上的我的链接 🔗",
      "retro.readCv": "阅读我的简历",
      "retro.savePdf": "保存为 PDF",
      "retro.cvNote": "很正式的 PDF!!!",
      "retro.githubNote": "我的代码!!!",
      "retro.linkedinNote": "职业资料",
      "retro.xNote": "微博客!!",
      "retro.bskyNote": "当前主页!!!",
      "retro.skillsTitle": "💾 我的技能 💾",
      "retro.skillsAi": "AI / LLM 系统:",
      "retro.skillsWeb": "Web 平台 / 标准:",
      "retro.skillsLanguages": "语言:",
      "retro.skillsPlatform": "平台 / 可观测性:",
      "retro.projectsTitle": "🚀 我的项目 🚀",
      "retro.projectsCopy": '<b style="color:#ffff00">Hecate</b> — 本地优先的 AI 控制台，支持本地/云端模型、Hecate Chat、受控的代码智能体会话、任务审批、用量可见性和 OpenTelemetry!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">源代码</a><br><br><b style="color:#ffff00">Cynic</b> — 用 Zig 写的 strict-only ECMAScript 引擎，面向非浏览器宿主!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">源代码</a><br><br><b style="color:#ffff00">Pragmatist</b> — 用于发现、复现并验证 ECMA-262、TypeScript 和 JS 引擎错误的工具!!! 它查询规范、比较引擎、准备 test262/spec 补丁，并且拒绝只凭感觉!!!<br><span class="retro-soon">即将发布!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — 面向 TC39 规范的 MCP 服务器!!! 智能体可以获得由 SHA 固定的 ECMA-262 + ECMA-402 条款、AOID 搜索、引用、diff、历史、test262 和提案，不用抓取巨大的 HTML 文件!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">源代码</a><br><br><b style="color:#ffff00">WASM MCP</b> — 面向 WebAssembly 规范和工具上下文的 MCP endpoint!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
      "retro.guestbookTitle": "📖 在我的留言本签名!!! 📖",
      "retro.guestbookHandle": "你的名字:",
      "retro.guestbookMessage": "给 SERGEY 的留言:",
      "retro.guestbookSubmit": "签名留言本",
      "retro.guestbookEntries": "留言本条目",
      "retro.copyright": "© 1997 Sergey Rubanov · 版权所有",
      "retro.bestViewedFooter": "本页最佳观看分辨率为 800×600",
      "retro.modalLabel": "正在保存留言",
      "retro.modalTitle": "留言本设置",
      "retro.modalSaving": "正在保存你的留言本签名...",
      "retro.modalStep": "正在启动 90 年代存储层",
      "retro.modalProgress": "0% 完成",
    },
  },
  {
    code: "ru",
    htmlLang: "ru",
    ogLocale: "ru_RU",
    displayName: "Сергей Рубанов",
    imageAlt: "Карточка предпросмотра сайта Сергея Рубанова: инженерная работа, стандарты веб-платформы и AI-агенты",
    description:
      "Разработка и независимые исследования в области AI-агентов, веб-платформы, инструментов для разработчиков и open source.",
    messages: {
      ...common,
      "skip.main": "Перейти к основному содержимому",
      "nav.primary": "Основные ссылки",
      "nav.languages": "Языковые версии",
      "cv.label": "РЕЗЮМЕ",
      "cv.openHtml": "Открыть резюме в HTML",
      "cv.openHtmlFull": "Открыть резюме Сергея Рубанова в HTML",
      "cv.downloadPdf": "Скачать резюме Сергея Рубанова в PDF",
      "link.github": "Профиль GitHub",
      "link.linkedin": "Профиль LinkedIn",
      "link.x": "Профиль X",
      "link.bluesky": "Профиль Bluesky",
      "privacy.label": "Приватность",
      "privacy.notice": "уведомление о приватности",
      "privacy.noticeAria": "Уведомление о приватности",
      "hero.name": "Сергей Рубанов",
      "hero.nameCaps": "СЕРГЕЙ РУБАНОВ",
      "hero.tagline": "Исследования · веб-стандарты · AI-агенты · open source",
      "hero.summary": "Разработка и независимые исследования в области AI-агентов, веб-платформы, инструментов для разработчиков и open source.",
      "hero.standards": 'Стандарты <span class="tc39">TC39</span> и <span class="w3c">W3C</span>: стык текста спецификаций, поведения браузеров, рантаймов и API для разработчиков.',
      "skills.heading": "Ключевые навыки",
      "skills.ai": "AI / LLM системы",
      "skills.agentOrchestration": "оркестрация агентов",
      "skills.promptTool": "prompt/tool-пайплайны",
      "skills.harness": "тестовые стенды",
      "skills.web": "Веб-платформа / стандарты",
      "skills.browsers": "браузеры/WebView",
      "skills.languages": "Языки",
      "skills.platform": "Платформа / наблюдаемость",
      "skills.traces": "трейсы/метрики/логи",
      "project.website": "сайт",
      "project.what": "описание",
      "project.features": "возможности",
      "project.stack": "технологии",
      "project.soon": "скоро",
      "project.pragmatist.soonLabel": "Pragmatist скоро выйдет",
      "project.hecate.what": "Local-first консоль для работы с локальными и облачными AI-моделями, включая Hecate Chat",
      "project.hecate.features": "Сессии coding-агентов под контролем · подтверждение задач · учёт использования · OpenTelemetry",
      "project.cynic.what": "Strict-only ECMAScript-движок на Zig для небраузерных сред: edge JS, Workers и серверный JavaScript",
      "project.pragmatist.what": "Инструмент для поиска, воспроизведения и проверки ошибок в ECMA-262, TypeScript и JavaScript-движках",
      "project.pragmatist.features": "Запросы к спецификациям · механизация Coq/Rocq · сравнение TypeScript parser/lib · дифференциальные прогоны JS-движков · заготовки патчей для test262/spec · воспроизводимая проверка результатов",
      "project.tc39mcp.what": "MCP-сервер, который отдаёт спецификации TC39 как данные, разбитые по разделам и привязанные к SHA, для агентов и инструментов",
      "project.tc39mcp.features": "AOID-поиск · cross-spec ссылки · диффы редакций · git-история · поиск по test262 и proposals · offline stdio и публичный HTTP",
      "project.wasmmcp.what": "MCP endpoint для спецификаций WebAssembly и инструментального контекста для агентов и инструментов разработчика",
      "project.wasmmcp.features": "Контекст спецификаций WebAssembly · поиск для агентов · публичный HTTP endpoint",
      "project.more.title": "Другие проекты",
      "project.more.personal": "личные репозитории",
      "project.more.key": "ссылка",
      "project.more.what": "Больше open-source проектов, экспериментов и небольших инструментов — на GitHub.",
      "contact.openTo": "темы: AI-агенты · веб-платформа · инструменты для разработчиков · наблюдаемость · стандарты",
      "contact.location": "Барселона, Испания · открыт для удалённой работы",
      "controls.timeMachine": "Машина времени",
      "controls.timeMachineTitle": "Переместиться в 1997",
      "controls.tweaks": "Вид / доступность",
      "controls.tweaksTitle": "Визуальные настройки и доступность",
      "a11y.title": "Режимы читаемости",
      "a11y.default": "По умолчанию",
      "a11y.deuteranopia": "Дейтеранопия",
      "a11y.protanopia": "Протанопия",
      "a11y.tritanopia": "Тританопия",
      "a11y.highContrast": "Высокий контраст",
      "console.close": "Закрыть терминал",
      "console.input": "Ввод команды терминала",
      "console.tab": "tab: автодополнение",
      "console.history": "история: ↑↓",
      "tweaks.close": "Закрыть настройки вида и доступности",
      "tweaks.theme": "Цветовая тема",
      "tweaks.background": "Фоновый эффект",
      "tweaks.intensity": "интенсивность",
      "tweaks.fontSize": "Размер шрифта",
      "tweaks.medium": "Средний",
      "retro.close": "Закрыть [X]",
      "retro.closeLabel": "Закрыть режим 90-х",
      "retro.marquee": "⭐ ДОБРО ПОЖАЛОВАТЬ НА HOMEPAGE СЕРГЕЯ РУБАНОВА ⭐ NETSCAPE NAVIGATOR 4.0 ЛУЧШЕ ВСЕГО В 800×600 ⭐ ПОДПИШИ ГОСТЕВУЮ КНИГУ ⭐",
      "retro.name": "СЕРГЕЙ РУБАНОВ",
      "retro.tagline": '<span class="blink">★</span> AI Agents <span class="blink">★</span> Web Platform <span class="blink">★</span> Developer Tools <span class="blink">★</span>',
      "retro.visitor": "ТЫ ПОСЕТИТЕЛЬ #",
      "retro.location": "Барселона, Испания",
      "retro.bestViewed": "Лучше смотреть в",
      "retro.loading": "Загружается Java applet...",
      "retro.updated": "Последнее обновление:<br>СЕГОДНЯ!!!!",
      "retro.aboutTitle": "🌟 ОБО МНЕ!!! 🌟",
      "retro.aboutCopy": 'ПРИВЕТ!!! Меня зовут Сергей, и я <b style="color:#00ffff">РАЗРАБОТЧИК!!!</b> Я работаю над <b style="color:#ffff00">AI-агентами</b>, <b style="color:#00ff00">веб-платформой</b> и инструментами для разработчиков!!! А ещё читаю стандарты <span class="blink" style="color:#ff00ff"><b>TC39 + W3C</b></span>, чтобы тебе не пришлось!!!',
      "retro.aboutNote": "Эта страница сделана вручную, с любовью, сомнительными цветами и исторически достоверной табличной вёрсткой!!!",
      "retro.linksTitle": "🔗 МОИ ССЫЛКИ НА ИНФОРМАЦИОННОЙ СУПЕРМАГИСТРАЛИ 🔗",
      "retro.readCv": "Открыть резюме",
      "retro.savePdf": "Сохранить PDF",
      "retro.cvNote": "Очень серьёзный PDF!!!",
      "retro.githubNote": "Мой КОД!!!",
      "retro.linkedinNote": "Профессиональный профиль",
      "retro.xNote": "Микроблог!!",
      "retro.bskyNote": "Текущий профиль!!!",
      "retro.skillsTitle": "💾 МОИ SKILLZ 💾",
      "retro.skillsAi": "AI / LLM системы:",
      "retro.skillsWeb": "Веб-платформа / стандарты:",
      "retro.skillsLanguages": "Языки:",
      "retro.skillsPlatform": "Платформа / наблюдаемость:",
      "retro.projectsTitle": "🚀 МОИ PROJECTZ 🚀",
      "retro.projectsCopy": '<b style="color:#ffff00">Hecate</b> — local-first консоль для локальных и облачных AI-моделей, Hecate Chat, сессий coding-агентов, подтверждения задач, учёта использования и OpenTelemetry!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">исходный код</a><br><br><b style="color:#ffff00">Cynic</b> — strict-only ECMAScript-движок на Zig для небраузерных сред!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">исходный код</a><br><br><b style="color:#ffff00">Pragmatist</b> — инструмент для поиска, воспроизведения и проверки ошибок в ECMA-262, TypeScript и JS-движках!!! Он читает спецификации, сравнивает движки, готовит патчи для test262/spec и не верит на слово!!!<br><span class="retro-soon">Скоро релиз!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — MCP-сервер для спецификаций TC39!!! Агенты получают разделы ECMA-262 + ECMA-402, привязанные к SHA, AOID-поиск, ссылки, диффы, историю, test262 и proposals вместо парсинга огромного HTML-файла!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">исходный код</a><br><br><b style="color:#ffff00">WASM MCP</b> — MCP endpoint для спецификаций WebAssembly и инструментального контекста!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
      "retro.guestbookTitle": "📖 ПОДПИШИ МОЮ ГОСТЕВУЮ КНИГУ!!! 📖",
      "retro.guestbookHandle": "ТВОЁ ИМЯ:",
      "retro.guestbookMessage": "СООБЩЕНИЕ ДЛЯ СЕРГЕЯ:",
      "retro.guestbookSubmit": "Оставить запись",
      "retro.guestbookEntries": "Записи гостевой книги",
      "retro.copyright": "© 1997 Сергей Рубанов · Все права защищены",
      "retro.bestViewedFooter": "Эту страницу лучше смотреть в 800×600",
      "retro.modalLabel": "Сохранение записи в гостевой книге",
      "retro.modalTitle": "Гостевая книга",
      "retro.modalSaving": "Сохраняю запись в гостевой книге...",
      "retro.modalStep": "Запускаю хранилище из 90-х",
      "retro.modalProgress": "0% готово",
    },
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function setAttr(openingTag, attr, value) {
  const escaped = escapeAttr(value);
  const attrPattern = new RegExp(`\\s${escapeRegExp(attr)}="[^"]*"`);
  if (attrPattern.test(openingTag)) {
    return openingTag.replace(attrPattern, ` ${attr}="${escaped}"`);
  }
  return openingTag.replace(/>$/, ` ${attr}="${escaped}">`);
}

function setLinkHref(html, rel, href) {
  return html.replace(new RegExp(`(<link rel="${rel}" href=")[^"]*(">)`), `$1${href}$2`);
}

function replaceMeta(html, selector, content) {
  const escaped = escapeAttr(content);
  return html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(">)`), `$1${escaped}$2`);
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function updateStructuredData(html, locale, pageUrl, displayName, imageAlt) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (match, rawJson) => {
    const data = JSON.parse(rawJson);
    const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [];
    const byType = type => graph.find(node => node["@type"] === type);

    const website = byType("WebSite");
    if (website) {
      website.name = displayName;
      website.inLanguage = locale.htmlLang;
    }

    const profilePage = byType("ProfilePage");
    if (profilePage) {
      profilePage["@id"] = `${pageUrl}#profile-page`;
      profilePage.url = pageUrl;
      profilePage.name = displayName;
      profilePage.description = locale.description;
      profilePage.inLanguage = locale.htmlLang;
    }

    const person = byType("Person");
    if (person) {
      person.name = displayName;
    }

    const image = byType("ImageObject");
    if (image) {
      image.caption = imageAlt;
    }

    const projectDescriptions = new Map([
      ["https://sergey.works/#hecate", locale.messages["project.hecate.what"]],
      ["https://sergey.works/#cynic", locale.messages["project.cynic.what"]],
      ["https://sergey.works/#pragmatist", locale.messages["project.pragmatist.what"]],
      ["https://sergey.works/#tc39-mcp", locale.messages["project.tc39mcp.what"]],
      ["https://sergey.works/#wasm-mcp", locale.messages["project.wasmmcp.what"]],
    ]);

    for (const node of graph) {
      if (node["@type"] !== "SoftwareSourceCode") continue;
      const description = projectDescriptions.get(node["@id"]);
      if (description) node.description = stripHtml(description);
    }

    return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
  });
}

function markCurrentLanguage(html, code) {
  return html
    .replace(/\saria-current="page"/g, "")
    .replace(new RegExp(`(<a[^>]+data-lang-link="${code}"[^>]*)(>)`), `$1 aria-current="page"$2`);
}

function rootRelativeLinks(html) {
  const attrs = [
    ["href", "cv.html"],
    ["href", "downloads/Sergey-Rubanov-CV.pdf"],
  ];

  html = attrs.reduce(
    (next, [attr, value]) =>
      next.replace(new RegExp(`${attr}="${escapeRegExp(value)}"`, "g"), `${attr}="/${value}"`),
    html,
  );

  return html
    .replace(/\shref="styles\.css([^"]*)"/g, ' href="/styles.css$1"')
    .replace(/\ssrc="js\/main\.js([^"]*)"/g, ' src="/js/main.js$1"');
}

function applyMessages(html, messages) {
  html = html.replace(/<([a-zA-Z0-9-]+)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g, (match, tag, attrs, key, inner) => {
    if (!Object.hasOwn(messages, key)) return match;
    return `<${tag}${attrs}>${messages[key]}</${tag}>`;
  });

  html = html.replace(/<([a-zA-Z0-9-]+)([^>]*\sdata-i18n-attr="([^"]+)"[^>]*)>/g, (match, tag, attrs, spec) => {
    let opening = `<${tag}${attrs}>`;
    for (const pair of spec.split(";")) {
      const [attr, key] = pair.split(":");
      if (!attr || !key || !Object.hasOwn(messages, key)) continue;
      opening = setAttr(opening, attr, messages[key]);
    }
    return opening;
  });

  return html;
}

function localize(source, locale) {
  const pageUrl = `${site.baseUrl}/${locale.code}/`;
  const displayName = locale.displayName || site.name;
  const imageAlt = locale.imageAlt || site.imageAlt;
  let html = source;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${locale.htmlLang}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${displayName}</title>`);
  html = setLinkHref(html, "canonical", pageUrl);
  html = replaceMeta(html, 'name="description"', locale.description);
  html = replaceMeta(html, 'name="author"', displayName);
  html = replaceMeta(html, 'property="og:title"', displayName);
  html = replaceMeta(html, 'property="og:description"', locale.description);
  html = replaceMeta(html, 'property="og:site_name"', displayName);
  html = replaceMeta(html, 'property="og:image:alt"', imageAlt);
  html = replaceMeta(html, 'name="twitter:title"', displayName);
  html = replaceMeta(html, 'name="twitter:description"', locale.description);
  html = replaceMeta(html, 'name="twitter:image:alt"', imageAlt);
  html = replaceMeta(html, 'property="og:url"', pageUrl);
  html = replaceMeta(html, 'property="og:locale"', locale.ogLocale);
  html = markCurrentLanguage(html, locale.code);
  html = rootRelativeLinks(html);
  html = applyMessages(html, locale.messages);
  html = updateStructuredData(html, locale, pageUrl, displayName, imageAlt);

  return html;
}

const source = fs.readFileSync(sourcePath, "utf8");

for (const locale of locales) {
  const dir = path.join(root, locale.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), localize(source, locale));
}

console.log(`Generated ${locales.length} localized pages.`);
