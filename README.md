# Open Brain Science

A research resource advisor for East Asian neuroimaging. It helps researchers find brain templates and imaging datasets for Chinese, Taiwanese, Korean and Japanese populations, with an Indian template for comparison.

## Features

- **AI advisor**: describe your study and get up to three recommendations from the catalog, each with its fit and limitations. You bring your own OpenAI, Claude or Gemini API key. The key is held only in page memory and is sent straight from your browser to that provider; it never touches a server of ours.
- **Explore**: search and filter the resources by population, resource type and access status.
- **Compare**: put up to three resources side by side.

The catalog lives in [`app/catalog.json`](app/catalog.json). Its links and access status come from a curated spreadsheet and have not been re-verified.

## Run locally

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Deploy

The live site is served by GitHub Pages from the `gh-pages` branch. To publish your latest changes, run:

```bash
npm run deploy:pages
```

This builds a static version into `dist-pages/` and pushes it to `gh-pages`.

## Project layout

- `app/page.tsx`: the user interface
- `lib/recommend.ts`: calls the selected AI provider from the browser and validates its answers against the catalog
- `pages/`: entry point for the static GitHub Pages build
- `app/catalog.json`: the resource records
- `app/site.css`: page styles

The app is built on the vinext starter (Next.js on Vite, deployable to Cloudflare Workers). The starter's original notes are in [`docs/starter-README.md`](docs/starter-README.md).
