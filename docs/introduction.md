# Welcome to TinyPine.js 🌲

**TinyPine.js** is a minimal, reactive JavaScript framework with a tiny footprint and powerful features.

## Why TinyPine?

- **🪶 Lightweight** - Less than 5KB gzipped
- **⚡ Fast** - No virtual DOM, direct DOM manipulation
- **🎯 Simple** - Learn in minutes, master in hours
- **🔋 Batteries Included** - All the directives you need
- **🎨 Framework Agnostic** - Works with any CSS framework

## Quick Example

Here's a simple counter example to get you started:

```html
<div t-data="{ count: 0 }">
  <button t-click="count++">Increment</button>
  <span t-text="count"></span>
</div>
```

**Try it live:**

<div t-data="{ count: 0 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="flex items-center space-x-4">
    <button t-click="count++" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Increment
    </button>
    <button t-click="count--" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
      Decrement
    </button>
    <span class="text-2xl font-bold text-gray-900 dark:text-white" t-text="count">0</span>
  </div>
</div>

## Core Features

### Reactive Data Binding

TinyPine automatically tracks your data and updates the DOM when it changes:

```html
<div t-data="{ message: 'Hello TinyPine!' }">
  <input t-model="message" type="text">
  <p t-text="message"></p>
</div>
```

### Conditional Rendering

Show or hide elements based on conditions:

```html
<div t-data="{ show: true }">
  <button t-click="show = !show">Toggle</button>
  <p t-show="show">This text can be toggled!</p>
</div>
```

### List Rendering

Easily loop through arrays:

```html
<div t-data="{ items: ['Apple', 'Banana', 'Orange'] }">
  <ul>
    <li t-for="item in items" t-text="item"></li>
  </ul>
</div>
```

## Getting Started

Ready to dive in? Check out the [Installation](#/docs/installation) guide or jump straight to the [Quick Start](#/docs/quick-start) tutorial.

## Philosophy

TinyPine.js is built on these principles:

1. **Simplicity First** - The API should be intuitive and easy to learn
2. **Progressive Enhancement** - Start small, add complexity when needed
3. **No Build Step Required** - Drop it in via CDN and start coding
4. **Framework Friendly** - Works alongside React, Vue, or vanilla JS

## Community

- **GitHub**: [github.com/DigitalCoreHub/tinypine](https://github.com/DigitalCoreHub/tinypine)
- **NPM**: [npmjs.com/package/tinypine](https://www.npmjs.com/package/tinypine)
- **License**: MIT

---

**Next Steps**: Learn how to [install TinyPine](#/docs/installation) in your project.
