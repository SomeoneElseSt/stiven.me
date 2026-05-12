This is a repository for my personal website: stiven.me.

## Writing a blog post

Add a markdown file to `blog/posts/` and register it in `blog/posts.json`. Compile it to preview it, and once the post is final, run it with `--translate` to generate all locale versions. You'll need local Cursor auth for that. 

```
pnpm compile
pnpm compile --translate
```

## Testing

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
