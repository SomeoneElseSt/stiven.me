import { shouldDisableNProgress } from './disable_np.js';
import { initLocaleSwitcher } from './locale_switcher.js';
import { initPrefetch } from './prefetch.js';
import { addSocialLinkClickListeners } from './listeners.js';
import { addNpProgressListeners } from './nprogress.js';

console.log(`======
|
| Hello, curious mind. If you really are thaaat curious, you should POST stiven.me/api/hi with your name and a contact link to get in touch.
|
======`);

function initializeApp(): void {
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