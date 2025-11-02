# TinyPine.js Documentation

🌲 Official documentation website for TinyPine.js - a minimal, reactive JavaScript framework.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build

```bash
# Build for production (default: /tinypine-docs/)
npm run build

# Build with custom base URL (e.g., for custom domain)
BASE_URL=/ npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

```bash
# Deploy manually
npm run deploy
```

Or push to the `main` branch and GitHub Actions will automatically deploy.

## ⚙️ Configuration

### Base URL

The project uses `/tinypine-docs/` as the base URL for GitHub Pages by default. If you're deploying to:

- **GitHub Pages with different repo name**: Set `BASE_URL` environment variable
  ```bash
  BASE_URL=/your-repo-name/ npm run build
  ```

- **Custom domain or root path**: Use `/` as base
  ```bash
  BASE_URL=/ npm run build
  ```

- **Subdirectory**: Specify your path
  ```bash
  BASE_URL=/subdirectory/ npm run build
  ```

### GitHub Pages Setup

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select **Source: GitHub Actions**
3. Push to `main` branch - deployment will start automatically
4. Your site will be available at `https://username.github.io/repo-name/`

## 📦 Tech Stack

- **Framework**: [TinyPine.js](https://github.com/DigitalCoreHub/tinypine)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Markdown**: [Marked](https://marked.js.org/)
- **Syntax Highlighting**: [Highlight.js](https://highlightjs.org/)

## 🌐 Live Site

Visit the documentation at: [https://digitalcorehub.github.io/tinypine-docs/](https://digitalcorehub.github.io/tinypine-docs/)

## 📝 License

MIT © DigitalCoreHub
