const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const markedFootnote = require('marked-footnote');
const markedKatex = require('marked-katex-extension');
const { glob } = require('glob');

const POSTS_JSON_PATH = path.join(__dirname, 'blog/posts.json');
const POSTS_DIR = path.join(__dirname, 'blog/posts');
const BLOG_OUTPUT_DIR = path.join(__dirname, 'blog');
const HTML_TEMPLATE_PATH = path.join(__dirname, 'index.html');
const POST_TEMPLATE_PATH = path.join(__dirname, 'blog', 'post.html');
const HTML_OUTPUT_PATH = path.join(__dirname, 'index.html');

marked.use(markedFootnote());
marked.use(markedKatex({
  throwOnError: false,
  output: 'html'
}));

async function readPostsMetadata() {
  const exists = await fs.pathExists(POSTS_JSON_PATH);
  if (!exists) {
    return [null, new Error('Error: blog/posts.json not found.')];
  }

  try {
    const postsMetadata = await fs.readJson(POSTS_JSON_PATH);
    console.log(`Found metadata for ${postsMetadata.length} posts.`);
    return [postsMetadata, null];
  } catch (error) {
    return [null, new Error(`Error parsing blog/posts.json: ${error.message}`)];
  }
}

async function findMarkdownFiles() {
  try {
    const files = await glob(`${POSTS_DIR}/**/*.md`);
    console.log(`Found ${files.length} markdown files.`);
    return [files, null];
  } catch (error) {
    return [null, new Error(`Error finding markdown files: ${error.message}`)];
  }
}

async function combineAllPostData(postsMetadata, markdownFiles) {
  const metadataMap = new Map(postsMetadata.map(function(p) { return [p.file, p]; }));
  const combinedPosts = [];

  for (const filePath of markdownFiles) {
    const fileName = path.basename(filePath);
    const postMeta = metadataMap.get(fileName);

    if (!postMeta) {
      console.warn(`- Skipping ${fileName}: No metadata found in posts.json.`);
      continue;
    }

    let markdownContent;
    try {
      markdownContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      console.error(`- Error reading ${fileName}, skipping: ${error.message}`);
      continue;
    }

    const htmlContent = marked.parse(markdownContent);
    combinedPosts.push({ ...postMeta, htmlContent });
  }
  return combinedPosts;
}

function generateBlogListHTML(posts) {
  return posts
    .map(
      (post) => `
    <div class="blog-post-item">
      <a href="/blog/${post.id}/" class="blog-post-link" data-title-length="${post.title.length}">
        <span class="blog-post-title">${post.title}</span>
        <span class="blog-post-date">${post.date}</span>
      </a>
    </div>
  `
    )
    .join('');
}

function structureFinalData(posts) {
  posts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const postsById = posts.reduce(function(acc, post) {
    acc[post.id] = post;
    return acc;
  }, {});

  return { posts, postsById };
}

function fillPostTemplate(template, post) {
  if (!post || !template) {
    return '';
  }
  return template
    .replaceAll('%%POST_TITLE%%', post.title)
    .replaceAll('%%POST_DATE%%', post.date)
    .replaceAll('%%POST_CONTENT%%', post.htmlContent);
}

async function generatePostPages(posts) {
  const templateExists = await fs.pathExists(POST_TEMPLATE_PATH);
  if (!templateExists) {
    return [null, new Error('Error: blog/post.html template not found.')];
  }

  try {
    const postTemplate = await fs.readFile(POST_TEMPLATE_PATH, 'utf-8');
    await fs.ensureDir(BLOG_OUTPUT_DIR);

    for (const post of posts) {
      const postHtml = fillPostTemplate(postTemplate, post);
      
      const postDir = path.join(BLOG_OUTPUT_DIR, post.id);
      await fs.ensureDir(postDir);
      const outputFilePath = path.join(postDir, 'index.html');
      await fs.writeFile(outputFilePath, postHtml, 'utf-8');
    }
    
    console.log(`Generated ${posts.length} blog pages.`);
    return [true, null];
  } catch (error) {
    return [null, new Error(`Error generating post pages: ${error.message}`)];
  }
}

async function main() {
  console.log('Starting blog build process...');

  const [postsMetadata, metadataError] = await readPostsMetadata();
  if (metadataError) {
    console.error(metadataError.message);
    process.exit(1);
  }

  const [markdownFiles, filesError] = await findMarkdownFiles();
  if (filesError) {
    console.error(filesError.message);
    process.exit(1);
  }

  const processedPosts = await combineAllPostData(postsMetadata, markdownFiles);
  const finalData = structureFinalData(processedPosts);

  const [, postPagesError] = await generatePostPages(finalData.posts);
  if (postPagesError) {
    console.error(postPagesError.message);
    process.exit(1);
  }

  const blogListHTML = generateBlogListHTML(finalData.posts);

  try {
    const template = await fs.readFile(HTML_TEMPLATE_PATH, 'utf-8');
    const startMarker = '<div id="blog-list">';
    const startIdx = template.indexOf(startMarker);
    if (startIdx === -1) {
      console.error('Error: Could not find <div id="blog-list"> in template');
      process.exit(1);
    }

    let i = startIdx + startMarker.length;
    let depth = 1; // we are inside #blog-list
    while (i < template.length && depth > 0) {
      const nextOpen = template.indexOf('<div', i);
      const nextClose = template.indexOf('</div>', i);
      if (nextClose === -1) {
        break; 
      }
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        i = nextOpen + 4;
      } else {
        depth -= 1;
        i = nextClose + 6;
      }
    }

    if (depth !== 0) {
      console.error('Error: Could not find matching </div> for #blog-list');
      process.exit(1);
    }

    const before = template.slice(0, startIdx);
    const after = template.slice(i);
    const finalHtml = `${before}${startMarker}${blogListHTML}</div>${after}`;

    await fs.writeFile(HTML_OUTPUT_PATH, finalHtml, 'utf-8');
    console.log(`Successfully injected blog list into ${HTML_OUTPUT_PATH}`);
  } catch (error) {
    console.error(`Error processing HTML template: ${error.message}`);
    process.exit(1);
  }
}

main();
