const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);
const { marked } = require('marked');
const markedFootnote = require('marked-footnote');
const markedKatex = require('marked-katex-extension');
const { glob } = require('glob');

function hashSource(text) {
  return crypto.createHash('sha1').update(text).digest('hex').slice(0, 16);
}

const POSTS_JSON_PATH = path.join(__dirname, 'blog/posts.json');

const POSTS_DIR = path.join(__dirname, 'blog/posts');
const BLOG_OUTPUT_DIR = path.join(__dirname, 'blog');
const HTML_TEMPLATE_PATH = path.join(__dirname, 'index.html');
const POST_TEMPLATE_PATH = path.join(__dirname, 'blog', 'post.html');
const HTML_OUTPUT_PATH = path.join(__dirname, 'index.html');
const IMPORT_REGEX = /<<<\s+([^\s]+)/g;
const FIGURES_DIR = path.join(__dirname, 'blog', 'assets', 'figures');
const ENGLISH_FIGURE_PATH_REGEX = /\/blog\/assets\/figures\/en\/([^"'\s)]+)/g;
const IMAGE_SRC_REGEX = /<img src="([^"]+)"/g;
const LIGHT_IMAGE_SUFFIX = '-light';

// Marks each image that has a light-theme copy on disk, so the page never has to ask the server whether one exists
function addLightImageSources(html) {
  return html.replace(IMAGE_SRC_REGEX, (imageTag, src) => {
    const extension = path.extname(src);
    if (!extension) return imageTag;
    const lightSrc = `${src.slice(0, -extension.length)}${LIGHT_IMAGE_SUFFIX}${extension}`;
    const hasLightCopy = fs.pathExistsSync(path.join(__dirname, lightSrc));
    return hasLightCopy ? `${imageTag} data-light-src="${lightSrc}"` : imageTag;
  });
}

// Reading rates from Trauzettel-Klosinski & Dietz (2012), "Standardized Assessment of Reading
// Performance: The New International Reading Speed Texts IReST", IOVS 53(9), table of mean
// reading speeds per language. Japanese and Chinese are written without spaces between words,
// so they are measured in characters per minute instead of words per minute.
const WORDS_PER_MINUTE = { en: 228, es: 218, fr: 195, pt: 181, de: 179, pl: 166 };
const CHARACTERS_PER_MINUTE = { ja: 357, zh: 255 };
// IReST mean across its 17 languages; used for locales it does not cover (hi, ko).
const DEFAULT_WORDS_PER_MINUTE = 184;
const MINIMUM_READING_MINUTES = 1;

const POST_CONTENT_OPEN_TAG = '<article id="post-content">';
const POST_CONTENT_CLOSE_TAG = '</article>';
const MATH_OPEN_TAG = '<span class="katex">';
const CODE_BLOCK_REGEX = /<pre[\s>][\s\S]*?<\/pre>/g;
const FOOTNOTE_MARKER_REGEX = /<sup>[\s\S]*?<\/sup>/g;
const HTML_TAG_REGEX = /<[^>]+>/g;
const HTML_ENTITY_REGEX = /&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi;
const SPAN_TAG_REGEX = /<(\/?)span\b/g;
const WORD_REGEX = /\S*[\p{L}\p{N}]\S*/gu;
// One unit per CJK character; an embedded run of Latin letters or digits reads as one unit.
const UNSPACED_SCRIPT_UNIT_REGEX = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]|[\p{Script=Latin}\p{N}]+/gu;

marked.use(markedFootnote());
marked.use(markedKatex({
  throwOnError: false,
  output: 'html'
}));

async function readTextFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return [content, null];
  } catch (error) {
    return [null, error];
  }
}

async function buildImportReplacement(relativeImportPath) {
  const absoluteImportPath = path.join(__dirname, relativeImportPath);
  const [fileContent, readError] = await readTextFile(absoluteImportPath);
  if (readError) {
    return [null, new Error(`Error reading import ${relativeImportPath}: ${readError.message}`)];
  }

  const extension = path.extname(relativeImportPath).slice(1);
  const fence = `\`\`\`${extension}\n${fileContent}\n\`\`\``;
  return [fence, null];
}

async function applyCodeImports(markdownContent, fileName) {
  const matches = [...markdownContent.matchAll(IMPORT_REGEX)];
  if (matches.length === 0) {
    return markdownContent;
  }

  let updatedContent = markdownContent;
  for (const match of matches) {
    const fullMatch = match[0];
    const relativeImportPath = match[1];

    const [replacement, replacementError] = await buildImportReplacement(relativeImportPath);
    if (replacementError) {
      console.warn(`- Warning: ${replacementError.message} in ${fileName}`);
      continue;
    }

    updatedContent = updatedContent.replace(fullMatch, replacement);
  }
  return updatedContent;
}

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

    const [markdownContent, markdownError] = await readTextFile(filePath);
    if (markdownError) {
      console.error(`- Error reading ${fileName}, skipping: ${markdownError.message}`);
      continue;
    }

    const processedMarkdownContent = await applyCodeImports(markdownContent, fileName);

    const htmlContent = addLightImageSources(marked.parse(processedMarkdownContent));
    const sourceHash = hashSource(markdownContent);
    combinedPosts.push({ ...postMeta, htmlContent, markdownContent, sourceHash });
  }
  return combinedPosts;
}

function escapeHtmlAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function readLocaleTitle(postId, localeId) {
  const htmlPath = path.join(__dirname, 'blog', postId, localeId, 'index.html');
  try {
    const content = await fs.readFile(htmlPath, 'utf-8');
    const match = content.match(/<title>([^<]+)<\/title>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function generateBlogListHTML(posts, TRANSLATION_LOCALES) {
  const items = await Promise.all(posts.map(async (post) => {
    const isoDate = parsePostDateAsUtc(post.date).toISOString().split('T')[0];
    const localeTitleAttrs = await Promise.all(
      TRANSLATION_LOCALES.map(async (locale) => {
        const title = await readLocaleTitle(post.id, locale.id);
        return title ? `data-title-${locale.id}="${escapeHtmlAttr(title)}"` : null;
      })
    );
    const attrs = localeTitleAttrs.filter(Boolean);
    const attrSuffix = attrs.length ? ' ' + attrs.join(' ') : '';
    return `
    <div class="blog-post-item">
      <a href="/blog/${post.id}/" class="blog-post-link" data-title-length="${post.title.length}" data-post-id="${post.id}" data-iso-date="${isoDate}"${attrSuffix}>
        <span class="blog-post-title">${post.title}</span>
        <span class="blog-post-date">${post.date}</span>
      </a>
    </div>
  `;
  }));
  return items.join('');
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

const BACK_LABELS = {
  en: 'Back',
  es: 'Atrás',
  ja: '戻る',
  hi: 'वापस',
  de: 'Zurück',
  fr: 'Retour',
  ko: '뒤로',
  pt: 'Voltar',
  pl: 'Wstecz',
  zh: '返回',
};

// Keyed by Intl.PluralRules category; "other" is the fallback for every locale.
const READING_TIME_LABELS = {
  en: { one: '%d minute to read', other: '%d minutes to read' },
  es: { one: '%d minuto de lectura', other: '%d minutos de lectura' },
  ja: { other: '%d分で読めます' },
  hi: { other: 'पढ़ने में %d मिनट' },
  de: { one: '%d Minute Lesezeit', other: '%d Minuten Lesezeit' },
  fr: { one: '%d minute de lecture', other: '%d minutes de lecture' },
  ko: { other: '읽는 데 %d분' },
  pt: { one: '%d minuto de leitura', other: '%d minutos de leitura' },
  pl: { one: '%d minuta czytania', few: '%d minuty czytania', many: '%d minut czytania', other: '%d minuty czytania' },
  zh: { other: '阅读需 %d 分钟' },
};

function findSpanElementEnd(html, elementStart) {
  const spanTagRegex = new RegExp(SPAN_TAG_REGEX);
  spanTagRegex.lastIndex = elementStart;
  let depth = 0;
  for (let tag = spanTagRegex.exec(html); tag; tag = spanTagRegex.exec(html)) {
    depth += tag[1] ? -1 : 1;
    if (depth === 0) {
      return html.indexOf('>', tag.index) + 1;
    }
  }
  return html.length;
}

function removeMathMarkup(html) {
  let remaining = html;
  for (let start = remaining.indexOf(MATH_OPEN_TAG); start !== -1; start = remaining.indexOf(MATH_OPEN_TAG)) {
    remaining = `${remaining.slice(0, start)} ${remaining.slice(findSpanElementEnd(remaining, start))}`;
  }
  return remaining;
}

// Prose only: code blocks, rendered math, footnote reference markers and all markup
// (including image paths and link URLs, which live in attributes) are left out.
function extractReadableText(htmlContent) {
  return removeMathMarkup(htmlContent.replace(CODE_BLOCK_REGEX, ' '))
    .replace(FOOTNOTE_MARKER_REGEX, '')
    .replace(HTML_TAG_REGEX, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(HTML_ENTITY_REGEX, '');
}

function computeReadingMinutes(htmlContent, localeId) {
  const readableText = extractReadableText(htmlContent);
  const charactersPerMinute = CHARACTERS_PER_MINUTE[localeId];
  const unitRegex = charactersPerMinute ? UNSPACED_SCRIPT_UNIT_REGEX : WORD_REGEX;
  const unitsPerMinute = charactersPerMinute || WORDS_PER_MINUTE[localeId] || DEFAULT_WORDS_PER_MINUTE;
  const unitCount = (readableText.match(unitRegex) || []).length;
  return Math.max(MINIMUM_READING_MINUTES, Math.ceil(unitCount / unitsPerMinute));
}

function formatReadingTime(minutes, localeId) {
  const labels = READING_TIME_LABELS[localeId];
  if (!labels) {
    return READING_TIME_LABELS.en[minutes === 1 ? 'one' : 'other'].replace('%d', minutes);
  }
  const pluralCategory = new Intl.PluralRules(localeId).select(minutes);
  return (labels[pluralCategory] || labels.other).replace('%d', minutes);
}

function parsePostDateAsUtc(dateString) {
  return new Date(`${dateString} UTC`);
}

function formatDateForLocale(dateString, localeId) {
  try {
    return new Intl.DateTimeFormat(localeId, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(parsePostDateAsUtc(dateString));
  } catch {
    return dateString;
  }
}

function fillPostTemplate(template, post, localeId, sourceHash) {
  if (!post || !template) {
    return '';
  }
  const locale = localeId || 'en';
  const isoDate = parsePostDateAsUtc(post.date).toISOString().split('T')[0];
  const displayDate = locale === 'en' ? post.date : formatDateForLocale(post.date, locale);
  return template
    .replaceAll('%%POST_TITLE%%', post.title)
    .replaceAll('%%POST_DATE%%', displayDate)
    .replaceAll('%%POST_ISO_DATE%%', isoDate)
    .replaceAll('%%POST_READING_TIME%%', formatReadingTime(computeReadingMinutes(post.htmlContent, locale), locale))
    .replaceAll('%%POST_CONTENT%%', post.htmlContent)
    .replaceAll('%%POST_LOCALE%%', locale)
    .replaceAll('%%BACK_LABEL%%', BACK_LABELS[locale] || BACK_LABELS.en)
    .replaceAll('%%SOURCE_HASH%%', sourceHash || '');
}

async function readStoredSourceHash(htmlPath) {
  try {
    const content = await fs.readFile(htmlPath, 'utf-8');
    const match = content.match(/<meta name="source-hash" content="([^"]*)"\s*\/?>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
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
      const englishHtml = fillPostTemplate(postTemplate, post, 'en', post.sourceHash);
      const postDir = path.join(BLOG_OUTPUT_DIR, post.id);
      await fs.ensureDir(postDir);
      await fs.writeFile(path.join(postDir, 'index.html'), englishHtml, 'utf-8');
    }

    console.log(`Generated ${posts.length} English blog pages.`);
    return [true, null];
  } catch (error) {
    return [null, new Error(`Error generating post pages: ${error.message}`)];
  }
}

function extractStoredPost(pageHtml) {
  const titleMatch = pageHtml.match(/<title>([^<]+)<\/title>/);
  const hashMatch = pageHtml.match(/<meta name="source-hash" content="([^"]*)"\s*\/?>/);
  const contentStart = pageHtml.indexOf(POST_CONTENT_OPEN_TAG);
  const contentEnd = pageHtml.lastIndexOf(POST_CONTENT_CLOSE_TAG);
  if (!titleMatch || !hashMatch || contentStart === -1 || contentEnd === -1) {
    return null;
  }
  return {
    title: titleMatch[1],
    sourceHash: hashMatch[1],
    htmlContent: pageHtml.slice(contentStart + POST_CONTENT_OPEN_TAG.length, contentEnd),
  };
}

// Translated pages are only written by --translate. Re-fill the current template with their
// stored translation on every build so template changes reach them without re-translating.
async function refreshTranslatedPages(posts, TRANSLATION_LOCALES) {
  const postTemplate = await fs.readFile(POST_TEMPLATE_PATH, 'utf-8');
  let refreshedCount = 0;
  for (const post of posts) {
    for (const locale of TRANSLATION_LOCALES) {
      const pagePath = path.join(BLOG_OUTPUT_DIR, post.id, locale.id, 'index.html');
      const [storedHtml, readError] = await readTextFile(pagePath);
      if (readError) {
        continue;
      }
      const storedPost = extractStoredPost(storedHtml);
      if (!storedPost) {
        console.warn(`- Warning: could not parse ${post.id}/${locale.id}, leaving it untouched`);
        continue;
      }
      const refreshedHtml = fillPostTemplate(postTemplate, { ...post, ...storedPost }, locale.id, storedPost.sourceHash);
      if (refreshedHtml === storedHtml) {
        continue;
      }
      await fs.writeFile(pagePath, refreshedHtml, 'utf-8');
      refreshedCount += 1;
    }
  }
  console.log(`Refreshed ${refreshedCount} translated blog pages.`);
}

async function runCursorAgentTranslate(prompt, post, locale) {
  // For agents: gemini-3-flash already exists, do not modify
  // Use execFile (not exec) to avoid shell expansion of $$ in LaTeX
  const args = ['-p', prompt, '--model', 'gemini-3-flash'];
  const opts = { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 };
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { stdout } = await execFileAsync('cursor-agent', args, opts);
      return stdout;
    } catch {
      const isFinalAttempt = attempt === 1;
      console.warn(
        isFinalAttempt
          ? `  [warn] cursor-agent failed again for ${post.id}/${locale.id}, skipping`
          : `  [warn] cursor-agent failed for ${post.id}/${locale.id}, retrying once...`
      );
    }
  }
  return null;
}

// Points a figure at its localized copy only when one exists, so posts without localized figures keep the English ones
function localizeFigurePaths(html, localeId) {
  return html.replace(ENGLISH_FIGURE_PATH_REGEX, (englishPath, fileName) => {
    const hasLocalizedFigure = fs.pathExistsSync(path.join(FIGURES_DIR, localeId, fileName));
    return hasLocalizedFigure ? `/blog/assets/figures/${localeId}/${fileName}` : englishPath;
  });
}

async function translatePost(post, mdContent, locale, postTemplate) {
  const outputHtmlPath = path.join(__dirname, 'blog', post.id, locale.id, 'index.html');
  const exists = await fs.pathExists(outputHtmlPath);
  if (exists) {
    const storedHash = await readStoredSourceHash(outputHtmlPath);
    if (storedHash === post.sourceHash) return { status: 'skip', locale: locale.id };
  }

  const prompt = `Translate the following markdown blog post to ${locale.name}.
Output ONLY the following format — no extra text, no preamble:

TITLE: <translated title here>
---
<translated markdown body here>

Rules:
- Preserve all markdown formatting exactly (headings, bold, italic, lists)
- Do NOT translate code blocks (content inside triple backticks), URLs, or HTML tags
- In LaTeX math, translate ONLY the text inside \\text{...} commands into the target language; preserve all other LaTeX commands and math symbols exactly
- DO translate text inside <summary> tags — these are user-facing labels that should be in the target language
- DO translate image descriptions and captions: the text inside ![...] and the quoted title after the image path, e.g. ![translate this](/path.png "and this"). Keep the image path unchanged
- Keep currency amounts exactly as written in the original, with the $ sign directly before the number (e.g. $12, $250). Do NOT move the $ after the number: a $ followed by a space or punctuation is parsed as LaTeX math and breaks the page
- Keep every spaced hyphen used as a dash exactly as written: a plain - with a space on each side (e.g. "a seller - say, a business - and"). Do NOT replace it with an em dash (—) or en dash (–), and do NOT remove the spaces around it
- Do NOT add ANY text before or after the output — no greetings, no sign-offs, no "ready for next task", no closing remarks of any kind
- Your response must end with the last line of the translated markdown and nothing else

Original title: ${post.title}
---
${mdContent}`;

  const output = await runCursorAgentTranslate(prompt, post, locale);
  if (output === null) return { status: 'warn', locale: locale.id, msg: 'agent failed' };

  const separatorIdx = output.indexOf('\n---\n');
  if (separatorIdx === -1) return { status: 'warn', locale: locale.id, msg: 'unexpected output format' };

  const titleLine = output.slice(0, separatorIdx).trim();
  const translatedTitle = titleLine.startsWith('TITLE:') ? titleLine.slice(6).trim() : post.title;
  const translatedMd = output.slice(separatorIdx + 5);
  const processedMd = await applyCodeImports(translatedMd, post.file);
  const translatedHtml = marked.parse(processedMd);
  const localizedHtml = addLightImageSources(localizeFigurePaths(translatedHtml, locale.id));

  const translatedPost = { ...post, title: translatedTitle, htmlContent: localizedHtml };
  const pageHtml = fillPostTemplate(postTemplate, translatedPost, locale.id, post.sourceHash);
  await fs.ensureDir(path.dirname(outputHtmlPath));
  await fs.writeFile(outputHtmlPath, pageHtml, 'utf-8');
  return { status: 'done', locale: locale.id };
}

async function translateAllPosts(posts, TRANSLATION_LOCALES) {
  const postTemplate = await fs.readFile(POST_TEMPLATE_PATH, 'utf-8');
  let totalDone = 0;
  for (const post of posts) {
    const mdPath = path.join(POSTS_DIR, post.file);
    const [mdContent, mdError] = await readTextFile(mdPath);
    if (mdError) {
      console.warn(`  [warn] Could not read ${post.file}, skipping translations`);
      continue;
    }
    console.log(`\nTranslating: ${post.id}`);
    const results = await Promise.all(TRANSLATION_LOCALES.map(locale => translatePost(post, mdContent, locale, postTemplate)));

    const skipped = results.filter(r => r?.status === 'skip');
    const translated = results.filter(r => r?.status === 'done');
    const warned = results.filter(r => r?.status === 'warn');

    skipped.forEach(r => console.log(`  [skip] ${r.locale}`));
    translated.forEach(r => console.log(`  [done] ${r.locale}`));
    warned.forEach(r => console.warn(`  [warn] ${r.locale}: ${r.msg}`));

    totalDone += translated.length;
  }
  if (totalDone === 0) {
    console.log('\nAll posts already translated.');
  } else {
    console.log(`\n${totalDone} translation(s) completed successfully.`);
  }
}

async function main() {
  const localesModule = await import('./src/locales.ts');
  const { LOCALE_METADATA } = localesModule.default ?? localesModule;
  const TRANSLATION_LOCALES = LOCALE_METADATA
    .filter((l) => l.id !== 'en')
    .map((l) => ({ id: l.id, name: l.englishName }));

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

  await refreshTranslatedPages(finalData.posts, TRANSLATION_LOCALES);

  if (process.argv.includes('--translate')) {
    await translateAllPosts(finalData.posts, TRANSLATION_LOCALES);
  }

  const blogListHTML = await generateBlogListHTML(finalData.posts, TRANSLATION_LOCALES);

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
