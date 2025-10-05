
const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;

let prefetchDone = false;

function findResumeLink() {
  return document.querySelector(`a[href="${RESUME_PATH}"]`);
}

function tagExists() {
  return document.querySelector(`link[href="${RESUME_PATH}"]`);
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

function scheduleIdlePrefetch() {
  const hasIdleCallback = 'requestIdleCallback' in window;
  if (hasIdleCallback) {
    requestIdleCallback(createPrefetchTag, { timeout: IDLE_CALLBACK_TIMEOUT_MS });
    return;
  }
  setTimeout(createPrefetchTag, IDLE_TIMEOUT_MS);
}

function addInteractionListeners(anchor) {
  if (!anchor) return;
  anchor.addEventListener('mouseenter', createPrefetchTag, { once: true });
  anchor.addEventListener('touchstart', createPrefetchTag, { once: true });
}

function initPrefetch() {
  const anchor = findResumeLink();
  if (!anchor) return;
  scheduleIdlePrefetch();
  addInteractionListeners(anchor);
}

function handleVisibilityChange() {
  if (document.visibilityState !== 'hidden') return;
  const activeElement = document.activeElement;
  if (!activeElement) return;
  const isSocialLink = activeElement.closest('.social-links');
  if (!isSocialLink) return;
  activeElement.blur();
}

function addVisibilityListener() {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

function initializeApp() {
  initPrefetch();
  addVisibilityListener();
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
