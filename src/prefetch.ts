const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;

let prefetchDone = false;

function tagExists(): HTMLLinkElement | null {
    const element = document.querySelector(`link[href="${RESUME_PATH}"]`);
    return element instanceof HTMLLinkElement ? element : null;
}

function createPrefetchTag() {
    if (prefetchDone) return;
    if (tagExists()) return;

    const tag = document.createElement('link');
    tag.rel = 'prefetch';
    tag.href = RESUME_PATH;
    tag.as = 'document';
    document.head.appendChild(tag);
    prefetchDone = true;
}

export function isPrefetchDone(): boolean {
    return prefetchDone;
}

export function findResumeLink(): HTMLAnchorElement | null {
    const element = document.querySelector(`a[href="${RESUME_PATH}"]`);
    return element instanceof HTMLAnchorElement ? element : null;
}

export function scheduleIdlePrefetch() {
    const hasIdleCallback = 'requestIdleCallback' in window;
    if (hasIdleCallback) {
        requestIdleCallback(createPrefetchTag, { timeout: IDLE_CALLBACK_TIMEOUT_MS });
        return;
    }
    setTimeout(createPrefetchTag, IDLE_TIMEOUT_MS);
}

export function addInteractionListeners(anchor: HTMLAnchorElement | null) {
    if (!anchor) {
        console.warn("Error: Anchor not found in addInteractionListeners");
        return;
    }
    anchor.addEventListener('mouseenter', createPrefetchTag, { once: true });
    anchor.addEventListener('touchstart', createPrefetchTag, { once: true });
}

