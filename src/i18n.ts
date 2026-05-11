export type LocaleId = 'en' | 'es' | 'ja' | 'hi' | 'de' | 'fr' | 'ko' | 'pt';

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
    | 'localeMenuLabel';

export interface LocaleDefinition {
    id: LocaleId;
    /** Shown next to the theme toggle; ISO-style, max two characters. */
    shortLabel: string;
    /** Language name in that language, for the dropdown. */
    nativeName: string;
    messages: Record<MessageKey, string>;
}

const en: LocaleDefinition = {
    id: 'en',
    shortLabel: 'En',
    nativeName: 'English',
    messages: {
        pageTitle: 'Stiven',
        headline: "Hi. I'm Stiven",
        bio1: 'I study computer science and economics at <a href="https://www.minerva.edu/">Minerva University</a>. I\'m interested in the modelling of social systems at scale.',
        bio2: 'I was previously a SWE intern at <a href="https://domu.ai">Domu</a> (YC S24), a technical student consultant for <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a>, and a coding fellow at <a href="https://makers.ngo">Makers</a>.',
        bio3: 'I\'ve won four hackathons, dialed 500k+ calls with an AI Agent for one of the largest banks in Central America, and built a bunch of things <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: 'I am a runner, techno‑optimist, and effective altruist/accelerationist. Currently thinking about social prediction in Bogotá.',
        blogHeader: 'Blog',
        linksHeader: 'Links',
        themeAriaToLight: 'Switch to light mode',
        themeAriaToDark: 'Switch to dark mode',
        localeMenuLabel: 'Language',
    },
};

const es: LocaleDefinition = {
    id: 'es',
    shortLabel: 'Es',
    nativeName: 'Español',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Hola. Soy Stiven',
        bio1: 'Estudio ciencias computacionales y economía en <a href="https://www.minerva.edu/">Minerva University</a>. Me interesa el modelado de sistemas sociales a escala.',
        bio2: 'Antes fui becario de ingeniería de software en <a href="https://domu.ai">Domu</a> (YC S24), consultor técnico estudiantil para <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> y becario de programación en <a href="https://makers.ngo">Makers</a>.',
        bio3: 'He ganado cuatro hackathons, gestioné más de 500 mil llamadas con un agente de IA para uno de los mayores bancos de Centroamérica y construí varias cosas <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: 'Soy corredor, tecnooptimista y altruista eficaz/aceleracionista. Ahora pienso en predicción social en Bogotá.',
        blogHeader: 'Blog',
        linksHeader: 'Enlaces',
        themeAriaToLight: 'Cambiar a modo claro',
        themeAriaToDark: 'Cambiar a modo oscuro',
        localeMenuLabel: 'Idioma',
    },
};

const ja: LocaleDefinition = {
    id: 'ja',
    shortLabel: 'Ja',
    nativeName: '日本語',
    messages: {
        pageTitle: 'スティーベン',
        headline: 'スティーベンです',
        bio1: '<a href="https://www.minerva.edu/">ミネルバ大学</a>で計算機科学と経済学を学んでいます。大規模な社会システムのモデリングに関心があります。',
        bio2: 'これまで<a href="https://domu.ai">Domu</a>（YC S24）でソフトウェアエンジニアのインターン、<a href="https://www.spaceappschallenge.org/">NASA Space Apps</a>のテクニカル学生コンサルタント、<a href="https://makers.ngo">Makers</a>のコーディングフェローなどを務めました。',
        bio3: 'ハッカソンで4回優勝し、中米の大手銀行向けにAIエージェントで50万件超の通話をかけ、さまざまなものを作ってきました <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>。',
        bio4: 'ランナーで、テクノオプティミスト、そして効果的利他主義／アクセラレーショニストです。現在はボゴタでの社会的予測について考えています。',
        blogHeader: 'ブログ',
        linksHeader: 'リンク',
        themeAriaToLight: 'ライトモードに切り替え',
        themeAriaToDark: 'ダークモードに切り替え',
        localeMenuLabel: '言語',
    },
};

const hi: LocaleDefinition = {
    id: 'hi',
    shortLabel: 'Hi',
    nativeName: 'हिन्दी',
    messages: {
        pageTitle: 'स्टिवेन',
        headline: 'नमस्ते। मैं स्टिवेन हूँ',
        bio1: 'मैं <a href="https://www.minerva.edu/">मिनर्वा विश्वविद्यालय</a> में संगणक विज्ञान और अर्थशास्त्र पढ़ता हूँ। बड़े पैमाने पर सामाजिक प्रणालियों के मॉडलिंग में मेरी रुचि है।',
        bio2: 'पहले मैं <a href="https://domu.ai">Domu</a> (YC S24) में सॉफ्टवेयर इंजीनियरिंग इंटर्न, <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> के लिए तकनीकी छात्र सलाहकार, और <a href="https://makers.ngo">Makers</a> में कोडिंग फेलो रह चुका हूँ।',
        bio3: 'मैंने चार हैकाथॉन जीते हैं, मध्य अमेरिका के एक बड़े बैंक के लिए AI एजेंट से 5 लाख से अधिक कॉल की हैं, और कई चीज़ें बनाई हैं <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>।',
        bio4: 'मैं धावक, तकनीक‑आशावादी, और प्रभावी उदारवादी/त्वरणवादी हूँ। अभी बोगोटा में सामाजिक पूर्वानुमान के बारे में सोच रहा हूँ।',
        blogHeader: 'ब्लॉग',
        linksHeader: 'लिंक',
        themeAriaToLight: 'लाइट मोड पर जाएँ',
        themeAriaToDark: 'डार्क मोड पर जाएँ',
        localeMenuLabel: 'भाषा',
    },
};

const de: LocaleDefinition = {
    id: 'de',
    shortLabel: 'De',
    nativeName: 'Deutsch',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Hallo. Ich bin Stiven',
        bio1: 'Ich studiere Computerwissenschaften und Volkswirtschaft an der <a href="https://www.minerva.edu/">Minerva University</a>. Mich interessiert die Modellierung sozialer Systeme im großen Maßstab.',
        bio2: 'Zuvor war ich Software‑Engineering‑Praktikant bei <a href="https://domu.ai">Domu</a> (YC S24), technischer Studierendenberater für <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> und Coding‑Fellow bei <a href="https://makers.ngo">Makers</a>.',
        bio3: 'Ich habe vier Hackathons gewonnen, mit einem KI‑Agenten über 500.000 Anrufe für eine der größten Banken in Mittelamerika getätigt und einiges gebaut <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: 'Ich laufe gern, bin Techno‑Optimist und effektiver Altruist/Accelerationist. Gerade denke ich über soziale Vorhersage in Bogotá nach.',
        blogHeader: 'Blog',
        linksHeader: 'Links',
        themeAriaToLight: 'Zum Hellmodus wechseln',
        themeAriaToDark: 'Zum Dunkelmodus wechseln',
        localeMenuLabel: 'Sprache',
    },
};

const fr: LocaleDefinition = {
    id: 'fr',
    shortLabel: 'Fr',
    nativeName: 'Français',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Salut. Je suis Stiven',
        bio1: 'J\'étudie les sciences informatiques et l\'économie à <a href="https://www.minerva.edu/">Minerva University</a>. Je m\'intéresse à la modélisation des systèmes sociaux à grande échelle.',
        bio2: 'J\'ai été stagiaire ingénieur logiciel chez <a href="https://domu.ai">Domu</a> (YC S24), consultant étudiant technique pour <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a>, et fellow code chez <a href="https://makers.ngo">Makers</a>.',
        bio3: 'J\'ai remporté quatre hackathons, passé plus de 500 000 appels avec un agent IA pour l\'une des plus grandes banques d\'Amérique centrale, et construit plusieurs projets <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: 'Je suis coureur, techno‑optimiste et altruiste efficace/accélérationniste. Je réfléchis en ce moment à la prédiction sociale à Bogotá.',
        blogHeader: 'Blog',
        linksHeader: 'Liens',
        themeAriaToLight: 'Passer en mode clair',
        themeAriaToDark: 'Passer en mode sombre',
        localeMenuLabel: 'Langue',
    },
};

const ko: LocaleDefinition = {
    id: 'ko',
    shortLabel: 'Kr',
    nativeName: '한국어',
    messages: {
        pageTitle: '스티븐',
        headline: '안녕하세요. 스티븐입니다',
        bio1: '<a href="https://www.minerva.edu/">미네르바 대학교</a>에서 컴퓨터 과학과 경제학을 공부하고 있습니다. 대규모 사회 시스템 모델링에 관심이 있습니다.',
        bio2: '이전에는 <a href="https://domu.ai">Domu</a>(YC S24)에서 소프트웨어 엔지니어링 인턴, <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> 기술 학생 컨설턴트, <a href="https://makers.ngo">Makers</a> 코딩 펠로우로 활동했습니다.',
        bio3: '해커톤에서 네 번 우승했고, 중미 최대 은행 중 하나를 위해 AI 에이전트로 50만 통 이상의 전화를 걸었으며 여러 프로젝트를 만들었습니다 <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: '러너이며 테크노 옵티미스트이고 효과적 이타주의/가속주의 성향입니다. 지금은 보고타에서의 사회적 예측을 생각하고 있습니다.',
        blogHeader: '블로그',
        linksHeader: '링크',
        themeAriaToLight: '라이트 모드로 전환',
        themeAriaToDark: '다크 모드로 전환',
        localeMenuLabel: '언어',
    },
};

const pt: LocaleDefinition = {
    id: 'pt',
    shortLabel: 'Pt',
    nativeName: 'Português',
    messages: {
        pageTitle: 'Stiven',
        headline: 'Olá. Eu sou o Stiven',
        bio1: 'Estudo ciências computacionais e economia na <a href="https://www.minerva.edu/">Minerva University</a>. Interesso‑me pela modelagem de sistemas sociais em escala.',
        bio2: 'Fui estagiário de engenharia de software na <a href="https://domu.ai">Domu</a> (YC S24), consultor técnico estudantil para a <a href="https://www.spaceappschallenge.org/">NASA Space Apps</a> e fellow de programação na <a href="https://makers.ngo">Makers</a>.',
        bio3: 'Ganhei quatro hackathons, realizei mais de 500 mil chamadas com um agente de IA para um dos maiores bancos da América Central e construí vários projetos <a href="https://github.com/SomeoneElseSt/cityzero-cli" target="_blank">[1]</a><a href="https://gravitas-new.streamlit.app" target="_blank">[2]</a><a href="https://teleme.me" target="_blank">[3]</a><a href="https://github.com/SomeoneElseSt/CityZero" target="_blank">[4]</a>.',
        bio4: 'Sou corredor, techno‑otimista e altruísta eficaz/aceleracionista. Neste momento penso em predição social em Bogotá.',
        blogHeader: 'Blog',
        linksHeader: 'Links',
        themeAriaToLight: 'Mudar para modo claro',
        themeAriaToDark: 'Mudar para modo escuro',
        localeMenuLabel: 'Idioma',
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
] as const;

const LOCALE_BY_ID: Map<LocaleId, LocaleDefinition> = new Map(
    LOCALE_DEFINITIONS.map((def) => [def.id, def]),
);

export const DEFAULT_LOCALE: LocaleId = 'en';

const STORAGE_KEY = 'locale';

export function isLocaleId(value: string): value is LocaleId {
    return LOCALE_BY_ID.has(value as LocaleId);
}

export function getLocaleFromStorage(): LocaleId {
    if (typeof localStorage === 'undefined') {
        return DEFAULT_LOCALE;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || !isLocaleId(raw)) {
        return DEFAULT_LOCALE;
    }
    return raw;
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
