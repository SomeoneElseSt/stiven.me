const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const { glob } = require('glob');

const POSTS_JSON_PATH = path.join(__dirname, 'blog/posts.json');
const POSTS_DIR = path.join(__dirname, 'blog/posts');
const OUTPUT_DIR = path.join(__dirname, 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blog-data.json');

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

async function writeCombinedData(data) {
  try {
    await fs.ensureDir(OUTPUT_DIR);
    await fs.writeJson(OUTPUT_FILE, data, { spaces: 2 });
    console.log(`\nSuccessfully built blog data to ${OUTPUT_FILE}`);
    return [true, null];
  } catch (error) {
    return [false, new Error(`Error writing output file: ${error.message}`)];
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
  const [, writeError] = await writeCombinedData(finalData);

  if (writeError) {
    console.error(writeError.message);
    process.exit(1);
  }
}

main();
