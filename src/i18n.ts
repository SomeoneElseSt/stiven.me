import { LOCALE_METADATA } from './locales.js';

export type LocaleId = typeof LOCALE_METADATA[number]['id'];

const metaById = Object.fromEntries(LOCALE_METADATA.map((m) => [m.id, m]));

export type MessageKey =
    | 'pageTitle'
    | 'headline'
    | 'bio1'
    | 'bio2'
    | 'bio3'
    | 'bio4'
    | 'blogHeader'
    | 'linksHeader'
    | 'themeAriaToLight'
    | 'themeAriaToDark'
    | 'localeMenuLabel'
    | 'consoleGreeting'
    | 'consoleInstruction';

export interface LocaleDefinition {
    id: LocaleId;
    englishName: string;
    /** Shown next to the theme toggle; ISO-style, max two characters. */
    shortLabel: string;
    /** Language name in that language, for the dropdown. */
    nativeName: string;
    messages: Record<MessageKey, string>;
}

const en: LocaleDefinition = {
    ...metaById['en'],
    id: 'en',
    messages: {
        pageTitle: 'Stiven',
        headline: "Hi. I'm Stiven",
        bio1: 'I study computer science and economics at <a href="https://www.minerva.edu/">Minerva University</a>. I\'m interested in the modelling of social systems at scale.',
        bio2: 'I have interned as a software engineer at <a href="https://domu.ai">Domu</a> (YC S24) and <a href="https://build.inc">Build.inc</a>, been a technical consultant for <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a>, and a coding fellow at <a href="https://makers.ngo">Makers</a>.',
        bio3: 'I\'ve won four hackathons, made 500k+ calls with an AI Agent for one of the largest banks in Central America, and built a bunch of things <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `I'm a runner, techno‑optimist, and effective altruist/accelerationist. Currently in San Francisco.`,
        blogHeader: 'Blog',
        linksHeader: 'Links',
        themeAriaToLight: 'Switch to light mode',
        themeAriaToDark: 'Switch to dark mode',
        localeMenuLabel: 'Language',
        consoleGreeting: 'Hello, curious mind.',
        consoleInstruction:
            'If you really are thaaat curious, POST your "name", "contact", and "note" to stiven.me/api/hi',
    },
};

const es: LocaleDefinition = {
    ...metaById['es'],
    id: 'es',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Hola. Soy Stiven',
        bio1: 'Estudio ciencias computacionales y economía en <a href="https://www.minerva.edu/">Minerva University</a>. Me interesa el modelado de sistemas sociales a escala.',
        bio2: 'He sido becario de ingeniería de software en <a href="https://domu.ai">Domu</a> (YC S24) y <a href="https://build.inc">Build.inc</a>, consultor técnico para <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> y becario de programación en <a href="https://makers.ngo">Makers</a>.',
        bio3: 'He ganado cuatro hackathons, hice más de 500 mil llamadas con un agente de IA para uno de los mayores bancos de Centroamérica y construí varias cosas <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `Soy corredor, tecnooptimista y altruista eficaz/aceleracionista. Actualmente en San Francisco.`,
        blogHeader: 'Blog',
        linksHeader: 'Enlaces',
        themeAriaToLight: 'Cambiar a modo claro',
        themeAriaToDark: 'Cambiar a modo oscuro',
        localeMenuLabel: 'Idioma',
        consoleGreeting: 'Hola, mente curiosa.',
        consoleInstruction:
            'Si de verdad eres taaan curioso/a, haz POST con tu "name", "contact" y "note" a stiven.me/api/hi',
    },
};

const ja: LocaleDefinition = {
    ...metaById['ja'],
    id: 'ja',
    messages: {
        pageTitle: 'スティーベン',
        headline: 'スティーベンです',
        bio1: '<a href="https://www.minerva.edu/">ミネルバ大学</a>で計算機科学と経済学を学んでいます。大規模な社会システムのモデリングに関心があります。',
        bio2: '<a href="https://domu.ai">Domu</a>（YC S24）と<a href="https://build.inc">Build.inc</a>でソフトウェアエンジニアのインターン、<a href="https://www.spaceappschallenge.org/">NASA Space Apps</a>のテクニカルコンサルタント、<a href="https://makers.ngo">Makers</a>のコーディングフェローを務めました。',
        bio3: 'ハッカソンで4回優勝し、中米の大手銀行向けにAIエージェントで50万件超の通話を行い、さまざまなものを作ってきました <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>。',
        bio4: `ランナーで、テクノオプティミスト、そして効果的利他主義／アクセラレーショニストです。現在はサンフランシスコにいます。`,
        blogHeader: 'ブログ',
        linksHeader: 'リンク',
        themeAriaToLight: 'ライトモードに切り替え',
        themeAriaToDark: 'ダークモードに切り替え',
        localeMenuLabel: '言語',
        consoleGreeting: 'こんにちは、好奇心旺盛な方へ。',
        consoleInstruction:
            '本当にそんなに curious なら、"name"、"contact"、"note" を stiven.me/api/hi に POST してください',
    },
};

const hi: LocaleDefinition = {
    ...metaById['hi'],
    id: 'hi',
    messages: {
        pageTitle: 'स्टिवेन',
        headline: 'नमस्ते। मैं स्टिवेन हूँ',
        bio1: 'मैं <a href="https://www.minerva.edu/">मिनर्वा विश्वविद्यालय</a> में संगणक विज्ञान और अर्थशास्त्र पढ़ता हूँ। बड़े पैमाने पर सामाजिक प्रणालियों के मॉडलिंग में मेरी रुचि है।',
        bio2: 'मैं <a href="https://domu.ai">Domu</a> (YC S24) और <a href="https://build.inc">Build.inc</a> में सॉफ्टवेयर इंजीनियरिंग इंटर्न, <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> के लिए तकनीकी सलाहकार, और <a href="https://makers.ngo">Makers</a> में कोडिंग फेलो रह चुका हूँ।',
        bio3: 'मैंने चार हैकाथॉन जीते हैं, मध्य अमेरिका के एक बड़े बैंक के लिए AI एजेंट से 5 लाख से अधिक कॉल किए हैं, और कई चीज़ें बनाई हैं <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>।',
        bio4: `मैं धावक, तकनीक‑आशावादी, और प्रभावी उदारवादी/त्वरणवादी हूँ। अभी सैन फ़्रांसिस्को में हूँ।`,
        blogHeader: 'ब्लॉग',
        linksHeader: 'लिंक',
        themeAriaToLight: 'लाइट मोड पर जाएँ',
        themeAriaToDark: 'डार्क मोड पर जाएँ',
        localeMenuLabel: 'भाषा',
        consoleGreeting: 'नमस्ते, जिज्ञासु मन।',
        consoleInstruction:
            'अगर आप सच में curious हैं, तो "name", "contact" और "note" stiven.me/api/hi पर POST करें',
    },
};

const de: LocaleDefinition = {
    ...metaById['de'],
    id: 'de',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Hallo. Ich bin Stiven',
        bio1: 'Ich studiere Computerwissenschaften und Volkswirtschaft an der <a href="https://www.minerva.edu/">Minerva University</a>. Mich interessiert die Modellierung sozialer Systeme im großen Maßstab.',
        bio2: 'Ich war Software‑Engineering‑Praktikant bei <a href="https://domu.ai">Domu</a> (YC S24) und <a href="https://build.inc">Build.inc</a>, technischer Berater für <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> und Coding‑Fellow bei <a href="https://makers.ngo">Makers</a>.',
        bio3: 'Ich habe vier Hackathons gewonnen, mit einem KI‑Agenten über 500.000 Anrufe für eine der größten Banken in Mittelamerika gemacht und einiges gebaut <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `Ich laufe gern, bin Techno‑Optimist und effektiver Altruist/Accelerationist. Derzeit in San Francisco.`,
        blogHeader: 'Blog',
        linksHeader: 'Links',
        themeAriaToLight: 'Zum Hellmodus wechseln',
        themeAriaToDark: 'Zum Dunkelmodus wechseln',
        localeMenuLabel: 'Sprache',
        consoleGreeting: 'Hallo, neugieriger Geist.',
        consoleInstruction:
            'Wenn du wirklich sooo neugierig bist, POSTe "name", "contact" und "note" an stiven.me/api/hi',
    },
};

const fr: LocaleDefinition = {
    ...metaById['fr'],
    id: 'fr',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Salut. Je suis Stiven',
        bio1: 'J\'étudie les sciences informatiques et l\'économie à <a href="https://www.minerva.edu/">Minerva University</a>. Je m\'intéresse à la modélisation des systèmes sociaux à grande échelle.',
        bio2: 'J\'ai été stagiaire ingénieur logiciel chez <a href="https://domu.ai">Domu</a> (YC S24) et <a href="https://build.inc">Build.inc</a>, consultant technique pour <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a>, et fellow code chez <a href="https://makers.ngo">Makers</a>.',
        bio3: 'J\'ai remporté quatre hackathons, effectué plus de 500 000 appels avec un agent IA pour l\'une des plus grandes banques d\'Amérique centrale, et construit plusieurs projets <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `Je suis coureur, techno‑optimiste et altruiste efficace/accélérationniste. Actuellement à San Francisco.`,
        blogHeader: 'Blog',
        linksHeader: 'Liens',
        themeAriaToLight: 'Passer en mode clair',
        themeAriaToDark: 'Passer en mode sombre',
        localeMenuLabel: 'Langue',
        consoleGreeting: 'Bonjour, esprit curieux.',
        consoleInstruction:
            'Si tu es vraiment taaant curieux/curieuse, POST ton "name", "contact" et "note" à stiven.me/api/hi',
    },
};

const ko: LocaleDefinition = {
    ...metaById['ko'],
    id: 'ko',
    messages: {
        pageTitle: '스티븐',
        headline: '안녕하세요. 스티븐입니다',
        bio1: '<a href="https://www.minerva.edu/">미네르바 대학교</a>에서 컴퓨터 과학과 경제학을 공부하고 있습니다. 대규모 사회 시스템 모델링에 관심이 있습니다.',
        bio2: '<a href="https://domu.ai">Domu</a>(YC S24)와 <a href="https://build.inc">Build.inc</a>에서 소프트웨어 엔지니어링 인턴, <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> 기술 컨설턴트, <a href="https://makers.ngo">Makers</a> 코딩 펠로우로 활동했습니다.',
        bio3: '해커톤에서 네 번 우승했고, 중미 최대 은행 중 하나를 위해 AI 에이전트로 50만 통 이상의 전화를 했으며 여러 프로젝트를 만들었습니다 <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `러너이며 테크노 옵티미스트이고 효과적 이타주의/가속주의 성향입니다. 현재 샌프란시스코에 있습니다.`,
        blogHeader: '블로그',
        linksHeader: '링크',
        themeAriaToLight: '라이트 모드로 전환',
        themeAriaToDark: '다크 모드로 전환',
        localeMenuLabel: '언어',
        consoleGreeting: '안녕하세요, 호기심 많은 분.',
        consoleInstruction:
            '정말 curious 하시다면 "name", "contact", "note"를 stiven.me/api/hi 로 POST 하세요',
    },
};

const pt: LocaleDefinition = {
    ...metaById['pt'],
    id: 'pt',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Olá. Eu sou o Stiven',
        bio1: 'Estudo ciências computacionais e economia na <a href="https://www.minerva.edu/">Minerva University</a>. Interesso‑me pela modelagem de sistemas sociais em escala.',
        bio2: 'Fui estagiário de engenharia de software na <a href="https://domu.ai">Domu</a> (YC S24) e na <a href="https://build.inc">Build.inc</a>, consultor técnico para a <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> e fellow de programação na <a href="https://makers.ngo">Makers</a>.',
        bio3: 'Ganhei quatro hackathons, fiz mais de 500 mil chamadas com um agente de IA para um dos maiores bancos da América Central e construí vários projetos <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `Sou corredor, techno‑otimista e altruísta eficaz/aceleracionista. Atualmente em San Francisco.`,
        blogHeader: 'Blog',
        linksHeader: 'Links',
        themeAriaToLight: 'Mudar para modo claro',
        themeAriaToDark: 'Mudar para modo escuro',
        localeMenuLabel: 'Idioma',
        consoleGreeting: 'Olá, mente curiosa.',
        consoleInstruction:
            'Se és mesmo taaao curioso/a, faz POST com "name", "contact" e "note" para stiven.me/api/hi',
    },
};

const pl: LocaleDefinition = {
    ...metaById['pl'],
    id: 'pl',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Cześć. Jestem Stiven',
        bio1: 'Studiuję informatykę i ekonomię na <a href="https://www.minerva.edu/">Minerva University</a>. Interesuję się modelowaniem systemów społecznych na dużą skalę.',
        bio2: 'Byłem stażystą inżyniera oprogramowania w <a href="https://domu.ai">Domu</a> (YC S24) i <a href="https://build.inc">Build.inc</a>, konsultantem technicznym dla <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> i stypendystą programistycznym w <a href="https://makers.ngo">Makers</a>.',
        bio3: 'Wygrałem cztery hackathony, zrobiłem ponad 500 tys. połączeń za pomocą agenta AI dla jednego z największych banków w Ameryce Środkowej i zbudowałem wiele projektów <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: `Jestem biegaczem, techno‑optymistą i efektywnym altruistą/akceleracjonistą. Obecnie w San Francisco.`,
        blogHeader: 'Blog',
        linksHeader: 'Linki',
        themeAriaToLight: 'Przełącz na tryb jasny',
        themeAriaToDark: 'Przełącz na tryb ciemny',
        localeMenuLabel: 'Język',
        consoleGreeting: 'Cześć, ciekawska głowo.',
        consoleInstruction:
            'Jeśli naprawdę jesteś taaak ciekawy/a, wyślij POST z "name", "contact" i "note" na stiven.me/api/hi',
    },
};

const zh: LocaleDefinition = {
    ...metaById['zh'],
    id: 'zh',
    messages: {
        pageTitle: 'Stiven',
        headline: '你好，我是 Stiven',
        bio1: '我在 <a href="https://www.minerva.edu/">Minerva University</a> 学习计算机科学与经济学，关注大规模社会系统的建模研究。',
        bio2: '我曾在 <a href="https://domu.ai">Domu</a>（YC S24）和 <a href="https://build.inc">Build.inc</a>担任软件工程实习生，担任 <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> 技术顾问，以及 <a href="https://makers.ngo">Makers</a> 编程学员。',
        bio3: '我赢得了四场黑客马拉松，使用 AI 智能体为中美洲最大银行之一进行了超过 50 万次电话，并构建了许多项目 <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>。',
        bio4: `我是一名跑者、技术乐观主义者，以及有效利他主义者/加速主义者。目前在旧金山。`,
        blogHeader: '博客',
        linksHeader: '链接',
        themeAriaToLight: '切换到浅色模式',
        themeAriaToDark: '切换到深色模式',
        localeMenuLabel: '语言',
        consoleGreeting: '你好，好奇的朋友。',
        consoleInstruction:
            '如果你真的那么 curious，请向 stiven.me/api/hi POST 你的 "name"、"contact" 和 "note"',
    },
};

export const LOCALE_DEFINITIONS: readonly LocaleDefinition[] = [
    en,
    es,
    ja,
    hi,
    de,
    fr,
    ko,
    pt,
    pl,
    zh,
] as const;

const LOCALE_BY_ID: Map<LocaleId, LocaleDefinition> = new Map(
    LOCALE_DEFINITIONS.map((def) => [def.id, def]),
);

export const DEFAULT_LOCALE: LocaleId = 'en';

const STORAGE_KEY = 'locale';

export function isLocaleId(value: string): value is LocaleId {
    return LOCALE_BY_ID.has(value as LocaleId);
}

export function getInitialLocale(): LocaleId {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && isLocaleId(stored)) {
            return stored;
        }
    }
    if (typeof navigator !== 'undefined') {
        const primary = (navigator.language ?? '').split('-')[0].toLowerCase();
        if (isLocaleId(primary)) {
            return primary;
        }
    }
    return DEFAULT_LOCALE;
}

export function saveLocaleToStorage(locale: LocaleId): void {
    if (typeof localStorage === 'undefined') {
        return;
    }
    localStorage.setItem(STORAGE_KEY, locale);
}

export function getLocaleDefinition(locale: LocaleId): LocaleDefinition {
    const def = LOCALE_BY_ID.get(locale);
    if (!def) {
        return LOCALE_BY_ID.get(DEFAULT_LOCALE) as LocaleDefinition;
    }
    return def;
}

export function getMessage(locale: LocaleId, key: MessageKey): string {
    return getLocaleDefinition(locale).messages[key];
}

/** Current UI is light → button switches to dark. */
export function getThemeAriaLabel(isCurrentlyLightMode: boolean, locale: LocaleId): string {
    const m = getLocaleDefinition(locale).messages;
    if (isCurrentlyLightMode) {
        return m.themeAriaToDark;
    }
    return m.themeAriaToLight;
}
