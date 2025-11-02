# t-html

The `t-html` directive renders HTML content into an element. Unlike `t-text`, it interprets the content as HTML rather than plain text.

⚠️ **Security Warning**: Only use `t-html` with trusted content. It can expose your application to XSS attacks if used with user-generated content.

## Syntax

```html
<element t-html="htmlExpression"></element>
```

## Basic Usage

### Simple HTML Rendering

```html
<div t-data="{ content: '<strong>Bold text</strong>' }">
  <div t-html="content"></div>
</div>
```

<div t-data="{ content: '<strong>Bold text</strong> and <em>italic text</em>' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-html="content" class="text-gray-900 dark:text-white"></div>
</div>

### Dynamic HTML Content

```html
<div t-data="{
  color: 'blue',
  get html() {
    return `<p style="color: ${this.color}">Colored text</p>`
  }
}">
  <select t-model="color">
    <option value="blue">Blue</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
  </select>
  <div t-html="html"></div>
</div>
```

<div t-data="{
  color: 'blue',
  get html() {
    return `<p style='color: ${this.color}; font-weight: bold; font-size: 1.25rem;'>Colored text</p>`
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <select t-model="color" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <option value="blue">Blue</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="purple">Purple</option>
  </select>
  <div t-html="html"></div>
</div>

## Rich Text Editor Output

Useful for displaying content from rich text editors:

```html
<div t-data="{
  article: '<h3>Article Title</h3><p>This is a paragraph with <a href=\'#\'>a link</a>.</p>'
}">
  <div t-html="article"></div>
</div>
```

<div t-data="{
  article: '<h3 style=\'margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: bold;\'>Article Title</h3><p style=\'margin-bottom: 1rem;\'>This is a paragraph with <a href=\'#\' style=\'color: #2E7D32; text-decoration: underline;\'>a link</a> and some <strong>bold text</strong>.</p><ul style=\'list-style: disc; margin-left: 1.5rem;\'><li>List item 1</li><li>List item 2</li></ul>'
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-html="article" class="prose dark:prose-invert"></div>
</div>

## Markdown to HTML

Combine with a markdown parser:

```html
<div t-data="{
  markdown: '## Heading\\n\\nThis is **bold** and *italic*.',
  get html() {
    // In real app, use a markdown parser like marked.js
    return this.markdown
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
  }
}">
  <div t-html="html"></div>
</div>
```

<div t-data="{
  markdown: '## Heading\\n\\nThis is **bold** and *italic*.',
  get html() {
    return this.markdown
      .replace(/## (.+)/g, '<h2 style=\'font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;\'>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\\n\\n/g, '<p style=\'margin-top: 1rem;\'>')
      .replace(/\\n/g, '<br>')
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-html="html" class="text-gray-900 dark:text-white"></div>
</div>

## Icon Libraries

Render icon SVG code:

```html
<div t-data="{
  icon: '<svg class=\'w-6 h-6\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M5 13l4 4L19 7\'></path></svg>'
}">
  <div t-html="icon"></div>
</div>
```

<div t-data="{
  icons: {
    check: '<svg class=\'w-8 h-8\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M5 13l4 4L19 7\'></path></svg>',
    star: '<svg class=\'w-8 h-8\' fill=\'currentColor\' viewBox=\'0 0 20 20\'><path d=\'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z\'></path></svg>',
    heart: '<svg class=\'w-8 h-8\' fill=\'currentColor\' viewBox=\'0 0 20 20\'><path fill-rule=\'evenodd\' d=\'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z\' clip-rule=\'evenodd\'></path></svg>'
  },
  selected: 'check'
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="selected = 'check'" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700">Check</button>
    <button t-click="selected = 'star'" class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">Star</button>
    <button t-click="selected = 'heart'" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Heart</button>
  </div>
  <div t-html="icons[selected]" class="text-pine-600 dark:text-pine-400"></div>
</div>

## Security Considerations

### ⚠️ XSS Vulnerability

**Never** use `t-html` with untrusted user input:

```html
<!-- DANGEROUS: User input can inject scripts -->
<div t-data="{ userInput: '' }">
  <input t-model="userInput">
  <div t-html="userInput"></div> <!-- BAD! -->
</div>
```

### ✅ Safe Alternative

Use `t-text` for user-generated content:

```html
<!-- SAFE: HTML is escaped -->
<div t-data="{ userInput: '' }">
  <input t-model="userInput">
  <div t-text="userInput"></div> <!-- GOOD! -->
</div>
```

<div t-data="{ userInput: '<script>alert(\'XSS\')</script>' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-model="userInput" placeholder="Try entering HTML..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">

  <div class="grid grid-cols-2 gap-4">
    <div>
      <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">❌ t-html (unsafe):</p>
      <div t-html="userInput" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded text-gray-900 dark:text-white"></div>
    </div>
    <div>
      <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">✅ t-text (safe):</p>
      <div t-text="userInput" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded text-gray-900 dark:text-white"></div>
    </div>
  </div>
</div>

## When to Use t-html

### ✅ Good Use Cases

- Rendering markdown/rich text from trusted sources
- Displaying pre-sanitized HTML from your CMS
- Rendering SVG icons
- Showing formatted email templates
- Displaying code with syntax highlighting

### ❌ Bad Use Cases

- Any user-generated content
- URL parameters
- Form inputs
- Data from third-party APIs (without sanitization)

## Sanitization

If you must use `t-html` with dynamic content, sanitize it first:

```javascript
{
  rawHtml: '<script>alert("xss")</script><p>Safe content</p>',

  get sanitizedHtml() {
    // Use DOMPurify or similar library
    return this.rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
  }
}
```

## t-html vs t-text

| Feature | t-html | t-text |
|---------|--------|--------|
| **Renders HTML** | ✅ Yes | ❌ No (escaped) |
| **Security** | ⚠️ Can be dangerous | ✅ Always safe |
| **Performance** | Slower (parses HTML) | Faster |
| **Use case** | Trusted HTML only | All text content |

## Best Practices

### 1. Prefer t-text When Possible

```html
<!-- Prefer this -->
<p t-text="description"></p>

<!-- Only use t-html when necessary -->
<div t-html="richTextContent"></div>
```

### 2. Sanitize External Content

```javascript
// Good: Sanitize before rendering
{
  externalHtml: '<div>Content</div>',
  get safeHtml() {
    return DOMPurify.sanitize(this.externalHtml)
  }
}
```

### 3. Use Content Security Policy

Add CSP headers to prevent inline script execution:

```html
<meta http-equiv="Content-Security-Policy"
      content="script-src 'self'">
```

## See Also

- [t-text](#/docs/directives/core/t-text) - Safe text rendering
- [t-data](#/docs/directives/core/t-data) - Component state
- [Security Best Practices](#/docs/security)
