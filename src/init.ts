import { logCuriousGreeting } from './console_greeting.js';
import { shouldDisableNProgress } from './disable_np.js';
import { type LocaleId } from './i18n.js';
import { initLocaleSwitcher } from './locale_switcher.js';
import { initPrefetch } from './prefetch.js';
import { addSocialLinkClickListeners } from './listeners.js';
import { addNpProgressListeners } from './nprogress.js';

let hasPrintedCuriousGreeting = false;

function handleLocaleChange(event: Event): void {
    const detail = (event as CustomEvent<{ locale: LocaleId }>).detail;
    if (!detail?.locale) {
        return;
    }
    if (hasPrintedCuriousGreeting) {
        console.clear();
    }
    logCuriousGreeting(detail.locale);
    hasPrintedCuriousGreeting = true;
}

function initializeApp(): void {
    document.addEventListener('localechange', handleLocaleChange);
    initLocaleSwitcher();
    if (!shouldDisableNProgress()) {
        addNpProgressListeners();
    }
    initPrefetch();
    addSocialLinkClickListeners();
}

function startWhenReady(): void {
    const isLoading = document.readyState === 'loading';
    if (isLoading) {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }
    initializeApp();
}

startWhenReady();
