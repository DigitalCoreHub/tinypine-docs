<div class="relative -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 mb-12 p-12 sm:p-16 bg-gradient-to-br from-pine-500 via-pine-600 to-pine-700 dark:from-pine-900 dark:via-pine-950 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
  <div class="absolute top-10 right-10 text-9xl opacity-10 text-white">🌲</div>
  <div class="relative z-10 text-center">
    <h1 class="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg" style="color: white !important;">
      Welcome to TinyPine.js
    </h1>
    <p class="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto font-medium" style="color: white !important;">
      A minimal, reactive JavaScript framework with a tiny footprint and powerful features.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="#/docs/quick-start" class="px-8 py-3 bg-white text-pine-700 rounded-xl font-semibold hover:bg-pine-50 hover:scale-105 transition-all duration-300 shadow-xl">
        Get Started
      </a>
      <a href="https://github.com/DigitalCoreHub/tinypine" target="_blank" class="px-8 py-3 bg-pine-800/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-pine-800/70 hover:scale-105 transition-all duration-300 shadow-xl border border-white/20" style="color: white !important;">
        View on GitHub
      </a>
    </div>
  </div>
</div>

## Why TinyPine?

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
  <div class="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pine-300 dark:hover:border-pine-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🪶</div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightweight</h3>
    <p class="text-gray-600 dark:text-gray-400">Less than 5KB gzipped</p>
  </div>

  <div class="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pine-300 dark:hover:border-pine-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast</h3>
    <p class="text-gray-600 dark:text-gray-400">No virtual DOM, direct DOM manipulation</p>
  </div>

  <div class="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pine-300 dark:hover:border-pine-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Simple</h3>
    <p class="text-gray-600 dark:text-gray-400">Learn in minutes, master in hours</p>
  </div>

  <div class="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pine-300 dark:hover:border-pine-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔋</div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Batteries Included</h3>
    <p class="text-gray-600 dark:text-gray-400">All the directives you need</p>
  </div>

  <div class="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pine-300 dark:hover:border-pine-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Framework Agnostic</h3>
    <p class="text-gray-600 dark:text-gray-400">Works with any CSS framework</p>
  </div>
</div>

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
