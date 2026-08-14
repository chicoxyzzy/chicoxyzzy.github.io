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
        'Trabajo con estándares de <span class="tc39">TC39</span> y <span class="w3c">W3C</span>, en el punto donde el texto de las especificaciones se cruza con navegadores, entornos de ejecución y APIs para desarrolladores.',
      "skills.heading": "Competencias clave",
      "skills.ai": "Sistemas de IA y agentes",
      "skills.agentOrchestration": "orquestación de agentes",
      "skills.toolExecution": "ejecución de herramientas",
      "skills.evaluation": "infraestructura de evaluación",
      "skills.providerRouting": "enrutamiento entre proveedores",
      "skills.modelApis": "APIs de OpenAI y Anthropic",
      "skills.web": "Plataforma web / estándares",
      "skills.browsers": "entornos de navegador y WebView",
      "skills.languages": "Lenguajes",
      "skills.platform": "Plataforma / observabilidad",
      "skills.traces": "trazas / métricas / logs",
      "project.website": "sitio web",
      "project.what": "descripción",
      "project.features": "funcionalidad",
      "project.stack": "tecnologías",
      "project.soon": "pronto",
      "project.pragmatist.soonLabel": "Lanzamiento de Pragmatist próximamente",
      "project.hecate.what": "Espacio de trabajo para IA que se ejecuta en local y reúne chats, proveedores de modelos, proyectos y agentes de programación supervisados",
      "project.hecate.features": "API compatibles con OpenAI y Anthropic · agentes integrados y externos mediante ACP · aprobaciones y revisión de cambios · contexto y memoria por proyecto · métricas de uso y OpenTelemetry",
      "project.cynic.what": "Motor de ECMAScript y WebAssembly escrito desde cero en Zig, solo en modo estricto, con realms reforzados y generación de código bajo control del host",
      "project.cynic.features": "Semántica estricta sin Annex B · primordiales congelados y harden() integrado · eval opcional · soporte de WebAssembly · suites de conformidad Test262 y Wasm",
      "project.pragmatist.what": "Herramienta con la que los agentes encuentran y demuestran errores en especificaciones ECMAScript, TypeScript, motores JavaScript y entornos de ejecución WebAssembly",
      "project.pragmatist.features":
        "Especificaciones fijadas por commit · formalización con Coq/Rocq · comparación de AST y librerías de TypeScript · pruebas diferenciales entre implementaciones · borradores de parches · verificación reproducible de cada hallazgo",
      "project.tc39mcp.what":
        "Servidor MCP que da a los agentes acceso estructurado y reproducible a ECMA-262 y ECMA-402, sin hacerles procesar un HTML de varios megabytes",
      "project.tc39mcp.features":
        "Búsqueda por cláusula y AOID · referencias bidireccionales entre especificaciones · comparación de ediciones e historial git · consulta de Test262 y propuestas · respuestas fijadas por SHA · stdio local y HTTP público",
      "project.wasmmcp.what": "Servidor MCP de solo lectura para las especificaciones Core, JavaScript API y Web API de WebAssembly, con consultas por instrucción y por sección",
      "project.wasmmcp.features": "Opcodes, firmas de pila y condiciones de trap · referencias de validación y ejecución · búsqueda en todo el texto de la especificación · índice de propuestas · respuestas deterministas fijadas por SHA · stdio local y HTTP público",
      "project.more.title": "Más proyectos",
      "project.more.personal": "repos personales",
      "project.more.key": "enlace",
      "project.more.what": "Explora más proyectos de código abierto, experimentos y utilidades en mis repositorios personales y en xyzzy labs.",
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
      "retro.skillsAi": "Sistemas de IA y agentes:",
      "retro.skillsWeb": "Plataforma web / estándares:",
      "retro.skillsLanguages": "Lenguajes:",
      "retro.skillsPlatform": "Plataforma / observabilidad:",
      "retro.projectsTitle": "🚀 MIS PROJECTZ 🚀",
      "retro.projectsCopy":
        '<b style="color:#ffff00">Hecate</b> — entorno de IA local para chats, proyectos, proveedores de modelos y agentes de programación supervisados!!! Aprobaciones, cambios, uso y trazas quedan a la vista del usuario!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">código fuente</a><br><br><b style="color:#ffff00">Cynic</b> — motor strict-only de ECMAScript + WebAssembly escrito desde cero en Zig!!! Annex B no estaba invitado!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">código fuente</a><br><br><b style="color:#ffff00">Pragmatist</b> — encuentra errores en especificaciones, TypeScript e implementaciones, y exige pruebas reproducibles para cada afirmación!!! Sin pruebas no hay hallazgo!!!<br><span class="retro-soon">Próximamente!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — entrega a los agentes ECMA-262 + ECMA-402 estructurados y fijados por SHA en lugar de una búsqueda del tesoro por 4 MB de HTML!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">código fuente</a><br><br><b style="color:#ffff00">WASM MCP</b> — servidor MCP de solo lectura para instrucciones, secciones, tipos, condiciones de trap y propuestas de WebAssembly!!! Mismo SHA, misma respuesta!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
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
        'Treball amb estàndards de <span class="tc39">TC39</span> i <span class="w3c">W3C</span>, al punt on el text de les especificacions es troba amb navegadors, entorns d’execució i API per a desenvolupadors.',
      "skills.heading": "Competències clau",
      "skills.ai": "Sistemes d'IA i agents",
      "skills.agentOrchestration": "orquestració d'agents",
      "skills.toolExecution": "execució d'eines",
      "skills.evaluation": "infraestructura d'avaluació",
      "skills.providerRouting": "encaminament entre proveïdors",
      "skills.modelApis": "API d'OpenAI i Anthropic",
      "skills.web": "Plataforma web / estàndards",
      "skills.browsers": "entorns de navegador i WebView",
      "skills.languages": "Llenguatges",
      "skills.platform": "Plataforma / observabilitat",
      "skills.traces": "traces / mètriques / logs",
      "project.website": "web",
      "project.what": "descripció",
      "project.features": "funcionalitats",
      "project.stack": "tecnologies",
      "project.soon": "aviat",
      "project.pragmatist.soonLabel": "Llançament de Pragmatist aviat",
      "project.hecate.what": "Espai de treball i runtime d'IA que funciona en local i aplega xats, proveïdors de models, projectes i agents de programació supervisats",
      "project.hecate.features": "API compatibles amb OpenAI i Anthropic · agents integrats i externs mitjançant ACP · aprovacions i revisió de canvis · context i memòria per projecte · mètriques d'ús i OpenTelemetry",
      "project.cynic.what": "Motor d'ECMAScript i WebAssembly escrit des de zero en Zig, només en mode estricte, amb realms reforçats i generació de codi sota el control de l'entorn host",
      "project.cynic.features": "Semàntica estricta sense Annex B · primordials congelats i harden() integrat · eval opcional · suport de WebAssembly · suites de conformitat Test262 i Wasm",
      "project.pragmatist.what": "Eina amb què els agents troben i demostren errors en especificacions ECMAScript, TypeScript, motors JavaScript i entorns d'execució WebAssembly",
      "project.pragmatist.features":
        "Especificacions fixades per commit · formalització amb Coq/Rocq · comparació d'AST i llibreries de TypeScript · proves diferencials entre implementacions · preparació de patches · verificació reproduïble de cada troballa",
      "project.tc39mcp.what":
        "Servidor MCP que dona als agents accés estructurat i reproduïble a ECMA-262 i ECMA-402, sense fer-los processar un HTML de diversos megabytes",
      "project.tc39mcp.features":
        "Cerca per clàusula i AOID · referències bidireccionals entre especificacions · comparació d'edicions i historial git · consulta de Test262 i propostes · respostes fixades per SHA · stdio local i HTTP públic",
      "project.wasmmcp.what": "Servidor MCP de només lectura per a les especificacions Core, JavaScript API i Web API de WebAssembly, amb consultes per instrucció i per secció",
      "project.wasmmcp.features": "Opcodes, signatures de pila i condicions de trap · referències de validació i execució · cerca en tot el text de l'especificació · índex de propostes · respostes deterministes fixades per SHA · stdio local i HTTP públic",
      "project.more.title": "Més projectes",
      "project.more.personal": "repos personals",
      "project.more.key": "enllaç",
      "project.more.what": "Explora més projectes de codi obert, experiments i utilitats als meus repositoris personals i a xyzzy labs.",
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
      "retro.skillsAi": "Sistemes d'IA i agents:",
      "retro.skillsWeb": "Plataforma web / estàndards:",
      "retro.skillsLanguages": "Llenguatges:",
      "retro.skillsPlatform": "Plataforma / observabilitat:",
      "retro.projectsTitle": "🚀 ELS MEUS PROJECTZ 🚀",
      "retro.projectsCopy":
        '<b style="color:#ffff00">Hecate</b> — entorn d’IA local per a xats, projectes, proveïdors de models i agents de programació supervisats!!! Aprovacions, canvis, ús i traces queden a la vista de l’usuari!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">codi font</a><br><br><b style="color:#ffff00">Cynic</b> — motor strict-only d’ECMAScript + WebAssembly escrit des de zero en Zig!!! Annex B no hi estava convidat!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">codi font</a><br><br><b style="color:#ffff00">Pragmatist</b> — troba errors en especificacions, TypeScript i implementacions, i exigeix proves reproduïbles per a cada afirmació!!! Sense proves no hi ha troballa!!!<br><span class="retro-soon">Properament!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — lliura als agents ECMA-262 + ECMA-402 estructurats i fixats per SHA en lloc d’una cerca del tresor per 4 MB d’HTML!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">codi font</a><br><br><b style="color:#ffff00">WASM MCP</b> — servidor MCP de només lectura per a instruccions, seccions, tipus, condicions de trap i propostes de WebAssembly!!! Mateix SHA, mateixa resposta!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
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
      "skills.ai": "AI 与智能体系统",
      "skills.agentOrchestration": "智能体编排",
      "skills.toolExecution": "工具执行",
      "skills.evaluation": "可复现评测",
      "skills.providerRouting": "模型服务路由",
      "skills.modelApis": "OpenAI / Anthropic 接口",
      "skills.web": "Web 平台 / 标准",
      "skills.browsers": "浏览器 / WebView 运行时",
      "skills.languages": "语言",
      "skills.platform": "平台 / 可观测性",
      "skills.traces": "追踪 / 指标 / 日志",
      "project.website": "网站",
      "project.what": "简介",
      "project.features": "功能",
      "project.stack": "技术",
      "project.soon": "即将发布",
      "project.pragmatist.soonLabel": "Pragmatist 即将发布",
      "project.hecate.what": "本地优先的 AI 工作台与运行环境，统一管理对话、模型服务、项目上下文和受监督的编程智能体",
      "project.hecate.features": "兼容 OpenAI 与 Anthropic 的 API · 内置智能体与 ACP 外部智能体会话 · 审批与代码差异审查 · 项目上下文和记忆 · 用量统计与 OpenTelemetry",
      "project.cynic.what": "用 Zig 从零编写的 strict-only ECMAScript 与 WebAssembly 引擎，提供加固的 realm，并由宿主控制动态代码生成",
      "project.cynic.features": "不含 Annex B 的严格语义 · 冻结的 primordials 与内置 harden() · 按需启用 eval · WebAssembly 支持 · Test262 与 Wasm 规范一致性测试",
      "project.pragmatist.what": "帮助智能体发现并证明 ECMAScript 规范、TypeScript、JavaScript 引擎和 WebAssembly 运行时错误的工具",
      "project.pragmatist.features": "按提交版本固定的规范数据 · Coq/Rocq 形式化 · TypeScript AST 与标准库差异 · 跨运行时差分测试 · 补丁草案生成 · 每个结果都可确定性复现",
      "project.tc39mcp.what": "MCP 服务器，为智能体提供结构化、可复现的 ECMA-262 与 ECMA-402 访问能力，无需解析数 MB 的 HTML 文档",
      "project.tc39mcp.features": "章节与 AOID 搜索 · 双向跨规范引用 · 版本差异与 git 历史 · Test262 与提案查询 · 固定到 SHA 的响应 · 本地 stdio 与公共 HTTP 服务",
      "project.wasmmcp.what": "面向 WebAssembly Core、JavaScript API 与 Web API 规范的只读 MCP 服务器，支持按指令和章节查询",
      "project.wasmmcp.features": "操作码、栈签名与 trap 条件 · 验证和执行规则引用 · 规范全文检索 · 提案索引 · 固定到 SHA 的确定性响应 · 本地 stdio 与公共 HTTP 服务",
      "project.more.title": "更多项目",
      "project.more.personal": "个人仓库",
      "project.more.key": "链接",
      "project.more.what": "更多开源项目、实验和小工具可在我的个人仓库与 xyzzy labs 中查看。",
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
      "retro.skillsAi": "AI 与智能体系统:",
      "retro.skillsWeb": "Web 平台 / 标准:",
      "retro.skillsLanguages": "语言:",
      "retro.skillsPlatform": "平台 / 可观测性:",
      "retro.projectsTitle": "🚀 我的项目 🚀",
      "retro.projectsCopy": '<b style="color:#ffff00">Hecate</b> — 本地 AI 工作台，统一管理对话、项目、模型服务和受监督的编程智能体!!! 审批、diff、用量与 trace 全都摆在操作者眼前!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">源代码</a><br><br><b style="color:#ffff00">Cynic</b> — 用 Zig 从零编写的 strict-only ECMAScript + WebAssembly 引擎!!! Annex B 没收到邀请!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">源代码</a><br><br><b style="color:#ffff00">Pragmatist</b> — 在规范、TypeScript 和运行时中找错误，并要求每个结论都附上可复现的证据!!! 没有证据，就没有发现!!!<br><span class="retro-soon">即将发布!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — 向智能体提供结构化、固定到 SHA 的 ECMA-262 + ECMA-402，不必在 4 MB 的 HTML 里寻宝!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">源代码</a><br><br><b style="color:#ffff00">WASM MCP</b> — 面向 WebAssembly 指令、章节、类型、trap 和提案的只读 MCP 服务器!!! 同一个 SHA，同一个答案!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
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
      "skills.ai": "AI-системы и агенты",
      "skills.agentOrchestration": "оркестрация агентов",
      "skills.toolExecution": "запуск инструментов",
      "skills.evaluation": "воспроизводимая оценка качества",
      "skills.providerRouting": "маршрутизация между провайдерами",
      "skills.modelApis": "API OpenAI и Anthropic",
      "skills.web": "Веб-платформа / стандарты",
      "skills.browsers": "браузеры / WebView",
      "skills.languages": "Языки",
      "skills.platform": "Платформа / наблюдаемость",
      "skills.traces": "трейсы / метрики / логи",
      "project.website": "сайт",
      "project.what": "описание",
      "project.features": "возможности",
      "project.stack": "технологии",
      "project.soon": "скоро",
      "project.pragmatist.soonLabel": "Pragmatist скоро выйдет",
      "project.hecate.what": "Локальная среда для AI-моделей и агентов, работающих с кодом: проекты, контекст и управление запусками остаются под контролем пользователя",
      "project.hecate.features": "API, совместимые с OpenAI и Anthropic · встроенные агенты и подключение внешних через ACP · подтверждение рискованных действий и ревью изменений · контекст и память проектов · статистика использования и OpenTelemetry",
      "project.cynic.what": "ECMAScript- и WebAssembly-движок, написанный с нуля на Zig: только строгий режим, защищённые области исполнения и динамическое создание кода с разрешения хоста",
      "project.cynic.features": "Строгая семантика без Annex B · замороженные primordials и встроенный harden() · eval только по явному разрешению · поддержка WebAssembly · проверка совместимости по Test262 и официальному набору тестов Wasm",
      "project.pragmatist.what": "Инструмент для AI-агентов, который помогает находить и доказывать ошибки в спецификациях ECMAScript, TypeScript, JavaScript-движках и средах выполнения WebAssembly",
      "project.pragmatist.features": "Данные спецификаций с привязкой к коммитам · формализация в Coq/Rocq · сравнение AST и стандартных библиотек TypeScript · дифференциальные прогоны нескольких движков · подготовка патчей · детерминированная перепроверка каждого результата",
      "project.tc39mcp.what": "MCP-сервер, который даёт агентам структурированный и воспроизводимый доступ к ECMA-262 и ECMA-402 вместо разбора многомегабайтного HTML-документа",
      "project.tc39mcp.features": "Поиск по разделам и AOID · двусторонние ссылки между спецификациями · сравнение редакций и история изменений в git · поиск по Test262 и предложениям TC39 · ответы, привязанные к SHA · локальный запуск через stdio и публичный HTTP",
      "project.wasmmcp.what": "MCP-сервер с доступом только для чтения к спецификациям WebAssembly Core, JavaScript API и Web API, с поиском по инструкциям и разделам",
      "project.wasmmcp.features": "Опкоды, сигнатуры стека и условия аварийного завершения (trap) · ссылки на правила проверки и исполнения · полнотекстовый поиск по спецификациям · индекс предложений WebAssembly · ответы, привязанные к SHA · локальный запуск через stdio и публичный HTTP",
      "project.more.title": "Другие проекты",
      "project.more.personal": "личные репозитории",
      "project.more.key": "ссылка",
      "project.more.what": "Другие проекты с открытым кодом, эксперименты и небольшие инструменты собраны в моих репозиториях и в xyzzy labs.",
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
      "retro.skillsAi": "AI-системы и агенты:",
      "retro.skillsWeb": "Веб-платформа / стандарты:",
      "retro.skillsLanguages": "Языки:",
      "retro.skillsPlatform": "Платформа / наблюдаемость:",
      "retro.projectsTitle": "🚀 МОИ PROJECTZ 🚀",
      "retro.projectsCopy": '<b style="color:#ffff00">Hecate</b> — локальная AI-среда для чатов, проектов, моделей и агентов для работы с кодом!!! Подтверждения, диффы, статистика использования и трейсы остаются на виду!!!<br>🌐 <a href="https://hecate.sh" target="_blank" rel="noopener noreferrer" class="retro-link">hecate.sh</a> · 💾 <a href="https://github.com/hecatehq/hecate" target="_blank" rel="noopener noreferrer" class="retro-link">исходный код</a><br><br><b style="color:#ffff00">Cynic</b> — strict-only ECMAScript + WebAssembly движок, написанный с нуля на Zig!!! Annex B приглашения не получил!!!<br>🌐 <a href="https://sergey.works/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">sergey.works/cynic</a> · 💾 <a href="https://github.com/chicoxyzzy/cynic" target="_blank" rel="noopener noreferrer" class="retro-link">исходный код</a><br><br><b style="color:#ffff00">Pragmatist</b> — ищет ошибки в спецификациях, TypeScript и движках, а для каждого утверждения требует воспроизводимые доказательства!!! Нет доказательств — нет бага!!!<br><span class="retro-soon">Скоро!!!</span><br><br><b style="color:#ffff00">TC39 MCP</b> — отдаёт агентам структурированные ECMA-262 + ECMA-402 с привязкой к SHA вместо квеста по 4-мегабайтному HTML!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/tc39/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/tc39/</a> · 💾 <a href="https://github.com/xyzzylabs/tc39-mcp" target="_blank" rel="noopener noreferrer" class="retro-link">исходный код</a><br><br><b style="color:#ffff00">WASM MCP</b> — MCP-сервер только для чтения: инструкции, разделы, типы, условия trap и предложения WebAssembly!!! Один SHA — один ответ!!!<br>🌐 <a href="https://mcp.xyzzylabs.ai/wasm/" target="_blank" rel="noopener noreferrer" class="retro-link">mcp.xyzzylabs.ai/wasm/</a>',
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
