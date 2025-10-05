
const RESUME_PATH = '/resume.pdf';
const IDLE_TIMEOUT_MS = 1500;
const IDLE_CALLBACK_TIMEOUT_MS = 2000;
const CLICK_FEEDBACK_DURATION_MS = 500;
const CLICKED_CLASS = 'clicked';
const MAX_POSTS_TO_SHOW = 10;
const POSTS_JSON_PATH = '/blog/posts.json';
const POSTS_CACHE_KEY = 'blog_posts_cache_v1';
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

function getCachedPosts() {
  const raw = localStorage.getItem(POSTS_CACHE_KEY);
  if (!raw) return null;
  
  try {
    const parsed = JSON.parse(raw);
    if (!parsed) return null;
    
    const isExpired = Date.now() - parsed.cachedAt > POSTS_CACHE_TTL_MS;
    if (isExpired) return null;
    
    return parsed;
  } catch (error) {
    console.error('Error parsing cached posts:', error);
    return null;
  }
}

function setCachedPosts(posts) {
  const signature = computePostsSignature(posts);
  localStorage.setItem(POSTS_CACHE_KEY, JSON.stringify({ posts, signature, cachedAt: Date.now() }));
}

async function fetchBlogPosts() {
  const cache = getCachedPosts();
  if (cache && Array.isArray(cache.posts) && cache.posts.length) return cache.posts;
  try {
    const response = await fetch(POSTS_JSON_PATH, { cache: 'no-store' });
    if (!response.ok) return cache ? cache.posts : null;
    const posts = await response.json();
    setCachedPosts(posts);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return cache ? cache.posts : null;
  }
}

function getSkeletonCount() {
  const container = document.getElementById('blog-list');
  if (!container) return MAX_POSTS_TO_SHOW;
  const skeletons = container.querySelectorAll('.blog-skeleton');
  if (skeletons && skeletons.length) return skeletons.length;
  return MAX_POSTS_TO_SHOW;
}

function hideBlogSection() {
  const header = document.querySelector('.blog-header');
  const container = document.getElementById('blog-list');
  if (header && header.parentNode) header.parentNode.removeChild(header);
  if (container && container.parentNode) container.parentNode.removeChild(container);
  showSocialLinks();
}

function createBlogListItem(post) {
  const item = document.createElement('div');
  item.className = 'blog-post-item';
  item.innerHTML = `
    <a href="/blog/post.html?id=${post.id}" class="blog-post-link">
      <span class="blog-post-title">${post.title}</span>
      <span class="blog-post-date">${post.date}</span>
    </a>
  `;
  return item;
}

function createPaginationControls(totalPosts, currentPage) {
  const totalPages = Math.ceil(totalPosts / MAX_POSTS_TO_SHOW);
  if (totalPages <= 1) return null;
  
  const pagination = document.createElement('div');
  pagination.className = 'blog-pagination';
  
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;
  
  let html = '';
  if (!prevDisabled) {
    html += `<a href="#" class="pagination-prev" data-page="${currentPage - 1}">‹</a>`;
  } else {
    html += `<span class="pagination-prev disabled">‹</span>`;
  }
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<span class="pagination-current">${i}</span>`;
    } else {
      html += `<a href="#" class="pagination-page" data-page="${i}">${i}</a>`;
    }
  }
  
  if (!nextDisabled) {
    html += `<a href="#" class="pagination-next" data-page="${currentPage + 1}">›</a>`;
  } else {
    html += `<span class="pagination-next disabled">›</span>`;
  }
  
  pagination.innerHTML = html;
  return pagination;
}

function renderBlogList(posts, page) {
  const blogContainer = document.getElementById('blog-list');
  if (!blogContainer) return;
  
  if (!posts || posts.length === 0) {
    hideBlogSection();
    return;
  }
  
  const startIndex = (page - 1) * MAX_POSTS_TO_SHOW;
  const endIndex = startIndex + MAX_POSTS_TO_SHOW;
  const postsToShow = posts.slice(startIndex, endIndex);
  
  const fragment = document.createDocumentFragment();
  const visibleCount = Math.min(postsToShow.length, getSkeletonCount());
  for (let i = 0; i < visibleCount; i++) {
    const item = createBlogListItem(postsToShow[i]);
    fragment.appendChild(item);
  }
  
  const pagination = createPaginationControls(posts.length, page);
  if (pagination) {
    fragment.appendChild(pagination);
  }

  blogContainer.replaceChildren(fragment);
  
  if (pagination) {
    addPaginationListeners(posts);
  }
  showSocialLinks();
}

function renderSkeletonList() {
  const blogContainer = document.getElementById('blog-list');
  if (!blogContainer) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < MAX_POSTS_TO_SHOW; i++) {
    const skel = document.createElement('div');
    skel.className = 'blog-skeleton';
    const bar = document.createElement('div');
    bar.className = 'blog-skeleton-title';
    skel.appendChild(bar);
    fragment.appendChild(skel);
  }
  blogContainer.replaceChildren(fragment);
  showSocialLinks();
}

async function revalidateAndUpdateList() {
  const blogContainer = document.getElementById('blog-list');
  if (!blogContainer) return;

  const cached = getCachedPosts();
  const cachedSignature = cached ? cached.signature : '';

  try {
    const response = await fetch(POSTS_JSON_PATH, { cache: 'no-store' });
    if (!response.ok) return;
    const posts = await response.json();
    if (!posts || posts.length === 0) {
      setCachedPosts([]);
      hideBlogSection();
      return;
    }
    const freshSignature = computePostsSignature(posts);
    const changed = freshSignature !== cachedSignature;
    if (changed) {
      setCachedPosts(posts);
      renderBlogList(posts, 1);
      return;
    }
    setCachedPosts(posts);
  } catch (error) {
    console.error('Error revalidating posts:', error);
  }
}

function addPaginationListeners(posts) {
  const paginationLinks = document.querySelectorAll('.blog-pagination a');
  paginationLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = parseInt(link.dataset.page);
      renderBlogList(posts, page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

async function initBlogList() {
  const blogContainer = document.getElementById('blog-list');
  if (!blogContainer) return;
  
  const cached = getCachedPosts();
  if (cached && cached.posts && cached.posts.length) {
    renderBlogList(cached.posts, 1);
  } else {
    renderSkeletonList();
  }
  
  await revalidateAndUpdateList();
}

function initializeApp() {
  initPrefetch();
  initPostsPrefetch();
  addSocialLinkClickListeners();
  initBlogList();
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
