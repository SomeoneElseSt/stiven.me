This is a repository for my personal website: stiven.me.

## Writing a blog post

1. Add a Markdown file to `blog/posts/` (e.g. `blog/posts/my-post.md`).
2. Register it in `blog/posts.json`:
   ```json
   { "id": "my-post", "title": "My Post", "date": "May 11, 2026", "file": "my-post.md" }
   ```
3. Run the build to generate the English post page and inject it into the blog list:
   ```bash
   node build.js
   ```
4. Once happy with the post, run the build with the translate flag to generate all nine locale versions via the Cursor agent translation flow:
   ```bash
   node build.js --translate
   ```
   This is slow — it calls the agent once per locale per post that hasn't been translated yet (detected by source hash). Only run it when the post content is final.

Run locally with:
```
python3 -m http.server 8000
```

After starting the server locally you can expose it through a temporary url with ngrok in a separate terminal:
```
ngrok http 8000
```

The "Forwarding" url exposes the local build. 

If you recieve a ngrok unavailable ports error, you can kill existing ngrok ports with this command: 

```
pkill -f ngrok
```

---

## TypeScript

Compile Typescript + build blog:
```
pnpm compile
```

Watch mode for development:
```
pnpm dev
```

Check for TS errors:
```
pnpm check
```

Or alternatively use one of the following standalone commands.

Compile TS only:
```
pnpm tsc
```

Watch mode:
```
pnpm tsc:watch
```

Type check only:
```
pnpm tsc:check 
```

---

Originally inspired by https://github.com/dianalokada/portfolio
