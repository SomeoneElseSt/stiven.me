import { findLinks } from './utils';

const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;

let prefetchDone = false;

function createPrefetchTag(): void {
    if (prefetchDone) return;
    
    const existingTag = findLinks(`link[href="${RESUME_PATH}"]`, false);
    if (existingTag) return;

    const tag = document.createElement('link');
    tag.rel = 'prefetch';
    tag.href = RESUME_PATH;
    tag.as = 'document';
    document.head.appendChild(tag);
    prefetchDone = true;
}

export function initPrefetch(): void {
    if (prefetchDone) return;
    
    const anchor = findLinks(`a[href="${RESUME_PATH}"]`, false) as HTMLAnchorElement | null;
    if (!anchor) {
        console.warn("Error: Resume link not found in initPrefetch");
        return;
    }
    
    const hasIdleCallback = 'requestIdleCallback' in window;
    if (hasIdleCallback) {
        requestIdleCallback(createPrefetchTag, { timeout: IDLE_CALLBACK_TIMEOUT_MS });
    }
    setTimeout(createPrefetchTag, IDLE_TIMEOUT_MS);
    
    anchor.addEventListener('mouseenter', createPrefetchTag, { once: true });
    anchor.addEventListener('touchstart', createPrefetchTag, { once: true });
}
