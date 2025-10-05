
const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;
const CLICK_FEEDBACK_DURATION_MS = 500;
const CLICKED_CLASS = 'clicked';

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

function handleSocialLinkClick(event) {
  const link = event.currentTarget;
  link.classList.add(CLICKED_CLASS);
  setTimeout(() => {
    link.classList.remove(CLICKED_CLASS);
  }, CLICK_FEEDBACK_DURATION_MS);
}

function findSocialLinks() {
  return document.querySelectorAll('.social-links a');
}

function addSocialLinkClickListeners() {
  const socialLinks = findSocialLinks();
  socialLinks.forEach((link) => {
    link.addEventListener('click', handleSocialLinkClick);
  });
}

function initializeApp() {
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
