# Installation

There are multiple ways to install TinyPine.js in your project. Choose the method that best fits your workflow.

## CDN (Quickest)

The fastest way to get started is via CDN. Add this script tag to your HTML:

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/tinypine@latest/dist/tinypine.js'
</script>
```

Or use unpkg:

```html
<script type="module">
  import 'https://unpkg.com/tinypine@latest/dist/tinypine.js'
</script>
```

## NPM

Install via npm for use in modern JavaScript projects:

```bash
npm install tinypine
```

Then import in your JavaScript:

```javascript
import 'tinypine'
```

## Yarn

If you prefer Yarn:

```bash
yarn add tinypine
```

## PNPM

Using pnpm:

```bash
pnpm add tinypine
```

## Build Tools

### Vite

TinyPine works seamlessly with Vite:

```javascript
// main.js
import 'tinypine'

// Your app code here
```

### Webpack

Import TinyPine in your entry file:

```javascript
// index.js
import 'tinypine'
```

### Parcel

Just import and Parcel will handle the rest:

```javascript
import 'tinypine'
```

## Verify Installation

Create a simple HTML file to test your installation:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TinyPine Test</title>
</head>
<body>

  <div t-data="{ message: 'TinyPine is working!' }">
    <h1 t-text="message"></h1>
  </div>

  <script type="module">
    import 'https://cdn.jsdelivr.net/npm/tinypine@latest/dist/tinypine.js'
  </script>

</body>
</html>
```

Open this file in your browser. If you see "TinyPine is working!", you're all set!

## Browser Support

TinyPine.js works in all modern browsers that support:

- ES6+ JavaScript
- ES Modules
- Proxy API

Supported browsers:

- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 79+

## Next Steps

Now that you have TinyPine installed, check out the [Quick Start](#/docs/quick-start) guide to build your first reactive component.
