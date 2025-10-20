import { shouldDisableNProgress } from './disable_np';
import { initPrefetch } from './prefetch';
import { addSocialLinkClickListeners } from './listeners';
import { addProgressListeners } from './np_config';

function initializeApp() {
    if (!shouldDisableNProgress()) {
        addProgressListeners();
    }
    initPrefetch();
    addSocialLinkClickListeners();
}

function startWhenReady() {
    const isLoading = document.readyState === 'loading';
    if (isLoading) {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }
    initializeApp();
}

startWhenReady();