import { shouldDisableNProgress } from './disable_np.js';
import { initPrefetch } from './prefetch.js';
import { addSocialLinkClickListeners } from './listeners.js';
import { addNpProgressListeners } from './nprogress.js';

function initializeApp(): void {
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