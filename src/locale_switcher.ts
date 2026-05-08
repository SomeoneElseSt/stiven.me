import {
    DEFAULT_LOCALE,
    getLocaleDefinition,
    getLocaleFromStorage,
    getMessage,
    getThemeAriaLabel,
    isLocaleId,
    LOCALE_DEFINITIONS,
    type LocaleDefinition,
    type LocaleId,
    type MessageKey,
    saveLocaleToStorage,
} from './i18n.js';

const HTML_I18N_KEYS: readonly MessageKey[] = [
    'headline',
    'bio1',
    'bio2',
    'bio3',
    'bio4',
    'blogHeader',
    'linksHeader',
];

const HTML_I18N_HTML_KEYS: ReadonlySet<MessageKey> = new Set([
    'bio1',
    'bio2',
    'bio3',
    'bio4',
]);

type LocalizedThemeAria = (isCurrentlyLightMode: boolean) => string;

function installThemeAriaBridge(locale: LocaleId): void {
    const w = window as Window & { __localizedThemeAria?: LocalizedThemeAria };
    w.__localizedThemeAria = (isCurrentlyLightMode: boolean) =>
        getThemeAriaLabel(isCurrentlyLightMode, locale);
}

function syncThemeToggleAriaFromDom(locale: LocaleId): void {
    const btn = document.getElementById('theme-toggle');
    if (!btn) {
        return;
    }
    const isLight = document.body.classList.contains('light-mode');
    btn.setAttribute('aria-label', getThemeAriaLabel(isLight, locale));
}

function applyMessagesToDom(locale: LocaleId): void {
    document.documentElement.lang = locale;
    document.title = getMessage(locale, 'pageTitle');

    for (const key of HTML_I18N_KEYS) {
        const nodes = document.querySelectorAll(`[data-i18n="${key}"]`);
        const text = getMessage(locale, key);
        const useHtml = HTML_I18N_HTML_KEYS.has(key);
        nodes.forEach((node) => {
            if (useHtml) {
                node.innerHTML = text;
                return;
            }
            node.textContent = text;
        });
    }
}

let closeMenuHandler: ((e: MouseEvent) => void) | null = null;

function setMenuOpen(menu: HTMLElement, trigger: HTMLButtonElement, open: boolean): void {
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open && closeMenuHandler) {
        document.removeEventListener('mousedown', closeMenuHandler);
        closeMenuHandler = null;
    }
    if (open) {
        closeMenuHandler = (event: MouseEvent) => {
            const t = event.target as Node;
            if (menu.contains(t) || trigger.contains(t)) {
                return;
            }
            setMenuOpen(menu, trigger, false);
        };
        document.addEventListener('mousedown', closeMenuHandler);
    }
}

function buildLocaleMenu(
    trigger: HTMLButtonElement,
    menu: HTMLElement,
    onPick: (id: LocaleId) => void,
): void {
    menu.innerHTML = '';
    menu.setAttribute('role', 'listbox');
    menu.id = 'locale-listbox';
    menu.className = 'locale-menu';
    menu.hidden = true;

    for (const def of LOCALE_DEFINITIONS) {
        const row = document.createElement('li');
        row.setAttribute('role', 'none');
        const opt = document.createElement('button');
        opt.type = 'button';
        opt.className = 'locale-option';
        opt.setAttribute('role', 'option');
        opt.dataset.localeId = def.id;
        opt.textContent = def.nativeName;
        opt.addEventListener('click', () => {
            onPick(def.id);
            setMenuOpen(menu, trigger, false);
        });
        row.appendChild(opt);
        menu.appendChild(row);
    }
}

function updateSelectedOption(menu: HTMLElement, locale: LocaleId): void {
    const buttons = menu.querySelectorAll<HTMLButtonElement>('.locale-option');
    buttons.forEach((b) => {
        const id = b.dataset.localeId;
        const selected = id === locale;
        b.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
}

function updateTriggerLabel(trigger: HTMLSpanElement, def: LocaleDefinition): void {
    trigger.textContent = def.shortLabel;
}

export function applyLocale(locale: LocaleId): void {
    saveLocaleToStorage(locale);
    installThemeAriaBridge(locale);
    applyMessagesToDom(locale);
    syncThemeToggleAriaFromDom(locale);
}

export function initLocaleSwitcher(): void {
    const mount = document.getElementById('locale-switcher-mount');
    if (!mount) {
        return;
    }

    const stored = getLocaleFromStorage();
    const initial = isLocaleId(stored) ? stored : DEFAULT_LOCALE;

    const wrap = document.createElement('div');
    wrap.className = 'locale-switcher';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'locale-trigger';
    trigger.id = 'locale-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const labelSpan = document.createElement('span');
    labelSpan.className = 'locale-trigger-label';
    const chevron = document.createElement('span');
    chevron.className = 'locale-trigger-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.innerHTML =
        '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

    trigger.appendChild(labelSpan);
    trigger.appendChild(chevron);

    const menu = document.createElement('ul');
    menu.className = 'locale-menu';

    const onPick = (id: LocaleId): void => {
        applyLocale(id);
        updateSelectedOption(menu, id);
        const def = getLocaleDefinition(id);
        updateTriggerLabel(labelSpan, def);
        const ml = getMessage(id, 'localeMenuLabel');
        trigger.setAttribute('aria-label', `${ml}: ${def.nativeName}`);
    };

    buildLocaleMenu(trigger, menu, onPick);
    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    mount.appendChild(wrap);

    trigger.setAttribute('aria-controls', menu.id);

    const menuLabel = getMessage(initial, 'localeMenuLabel');
    trigger.setAttribute('aria-label', `${menuLabel}: ${getLocaleDefinition(initial).nativeName}`);

    applyLocale(initial);
    updateTriggerLabel(labelSpan, getLocaleDefinition(initial));
    updateSelectedOption(menu, initial);

    trigger.addEventListener('click', () => {
        const nextOpen = menu.hidden;
        setMenuOpen(menu, trigger, nextOpen);
    });

    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.hidden) {
            setMenuOpen(menu, trigger, false);
            e.preventDefault();
        }
    });
}
