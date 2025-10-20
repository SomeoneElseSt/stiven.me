import { shouldDisableNProgress } from './disable_np';
import { initPrefetch } from './prefetch';
import { addSocialLinkClickListeners } from './listeners';
import { addNpProgressListeners } from './np_config';

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