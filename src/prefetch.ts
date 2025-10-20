const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;

let prefetchDone = false;

function tagExists(): HTMLLinkElement | null {
    const element = document.querySelector(`link[href="${RESUME_PATH}"]`);
    return element instanceof HTMLLinkElement ? element : null;
}

function createPrefetchTag(): void {
    if (prefetchDone) return;
    if (tagExists()) return;

    const tag = document.createElement('link');
    tag.rel = 'prefetch';
    tag.href = RESUME_PATH;
    tag.as = 'document';
    document.head.appendChild(tag);
    prefetchDone = true;
}

function findResumeLink(): HTMLAnchorElement | null {
    const element = document.querySelector(`a[href="${RESUME_PATH}"]`);
    return element instanceof HTMLAnchorElement ? element : null;
}

function scheduleIdlePrefetch(): void {
    const hasIdleCallback = 'requestIdleCallback' in window;
    if (hasIdleCallback) {
        requestIdleCallback(createPrefetchTag, { timeout: IDLE_CALLBACK_TIMEOUT_MS });
        return;
    }
    setTimeout(createPrefetchTag, IDLE_TIMEOUT_MS);
}

function addInteractionListeners(anchor: HTMLAnchorElement | null): void {
    if (!anchor) {
        console.warn("Error: Anchor not found in addInteractionListeners");
        return;
    }
    anchor.addEventListener('mouseenter', createPrefetchTag, { once: true });
    anchor.addEventListener('touchstart', createPrefetchTag, { once: true });
}

export function initPrefetch(): void {
    if (prefetchDone) {
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
