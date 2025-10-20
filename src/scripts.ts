import { findResumeLink, scheduleIdlePrefetch, addInteractionListeners, isPrefetchDone } from './prefetch';
import { addSocialLinkClickListeners } from './listeners';

const CLICK_FEEDBACK_DURATION_MS = 500;
const CLICKED_CLASS = 'clicked';

function initPrefetch() {
    if (isPrefetchDone()) {
        return;
    }
    const anchor = findResumeLink();
    if (!anchor) {
        console.warn("Error: Resume link not found in initPrefetch");
        return;
    }
    scheduleIdlePrefetch();
    addInteractionListeners(anchor);
}

