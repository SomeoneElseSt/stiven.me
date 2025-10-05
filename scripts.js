
const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;
const CLICK_FEEDBACK_DURATION_MS = 500;
const CLICKED_CLASS = 'clicked';
const MAX_POSTS_TO_SHOW = 10;
const POSTS_JSON_PATH = '/public/blog-data.json';
const POSTS_CACHE_KEY = 'blog_posts_cache_v2'; 
const POSTS_CACHE_TTL_MS = 1000 * 60 * 10; 

let prefetchDone = false;
let postsPrefetchDone = false;

function computePostsSignature(posts) {
  if (!Array.isArray(posts)) return '';
  const parts = posts.map((p) => `${p.id}|${p.file}|${p.date}`).join('::');
  return `${posts.length}::${parts}`;
}

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

function createPostsPrefetchTag() {
  if (postsPrefetchDone) return;
  
  const existingTag = document.querySelector(`link[href="${POSTS_JSON_PATH}"]`);
  if (existingTag) return;
  
  const tag = document.createElement('link');
  tag.rel = 'prefetch';
  tag.href = POSTS_JSON_PATH;
  tag.as = 'fetch';
  tag.crossOrigin = 'anonymous';
  document.head.appendChild(tag);
  postsPrefetchDone = true;
}

function schedulePostsPrefetch() {
  const hasIdleCallback = 'requestIdleCallback' in window;
  if (hasIdleCallback) {
    requestIdleCallback(createPostsPrefetchTag, { timeout: IDLE_CALLBACK_TIMEOUT_MS });
    return;
  }
  setTimeout(createPostsPrefetchTag, IDLE_TIMEOUT_MS);
}

function initPostsPrefetch() {
  const blogContainer = document.getElementById('blog-list');
  if (!blogContainer) return;
  schedulePostsPrefetch();
}

function handleSocialLinkClick(event) {
  const link = event.currentTarget;
  link.classList.add(CLICKED_CLASS);
  setTimeout(() => {
    link.classList.remove(CLICKED_CLASS);
  }, CLICK_FEEDBACK_DURATION_MS);
}

function showSocialLinks() {
  const socialHeader = document.querySelector('.social-header');
  if (socialHeader) socialHeader.style.display = 'block';
  
  const socialLinks = document.querySelector('.social-links');
  if (socialLinks) socialLinks.style.display = 'flex';
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

function isSafari() {
  return typeof safari !== 'undefined';
}

function isPhone() {
  const isMobileSize = window.matchMedia("(max-width: 768px)").matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  return isMobileSize && isTouchDevice;
}

function shouldDisableNProgress() {
  return isSafari() || isPhone();
}

function initializeApp() {
  if (!shouldDisableNProgress()) {
    NProgress.configure({ showSpinner: false, minimum: 0.1, speed: 300 });
  }
  initPrefetch();
  addSocialLinkClickListeners();
  showSocialLinks();

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
      if (shouldDisableNProgress()) {
        return;
      }
      const isExternal = link.hostname && link.hostname !== window.location.hostname;
      if (isExternal || link.target === '_blank' || event.ctrlKey || event.metaKey) {
        return;
      }
      NProgress.start();
    });
  });
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
