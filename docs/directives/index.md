# TinyPine.js Directives Reference

Complete guide to all TinyPine v1.2.0 directives with live, working examples.

---

## 📚 Table of Contents

- [Core Directives](#core-directives) - Essential reactive bindings
- [Structural Directives](#structural-directives) - Control flow and DOM structure
- [Async Directives](#async-directives) - Network requests and async operations
- [Advanced Directives](#advanced-directives) - Routing, transitions, and i18n
- [Event Modifiers](#event-modifiers) - Event handling enhancements
- [Lifecycle Hooks](#lifecycle-hooks) - Component lifecycle management

---

## 🧩 Core Directives

Essential directives for reactive data binding and event handling.

| Directive | Purpose | Example |
|-----------|---------|---------|
| [t-data](#/docs/directives/core/t-data) | Defines reactive scope | `<div t-data="{ count: 0 }">` |
| [t-text](#/docs/directives/core/t-text) | Binds plain text | `<span t-text="message"></span>` |
| [t-html](#/docs/directives/core/t-html) | Renders HTML content | `<div t-html="htmlContent"></div>` |
| [t-show](#/docs/directives/core/t-show) | Toggles visibility (CSS) | `<p t-show="isVisible">Text</p>` |
| [t-click](#/docs/directives/core/t-click) | Click event handler | `<button t-click="count++">+</button>` |
| [t-model](#/docs/directives/core/t-model) | Two-way data binding | `<input t-model="name">` |
| [t-class](#/docs/directives/core/t-class) | Conditional classes | `<div t-class:active="isActive">` |

---

## 🧱 Structural Directives

Control rendering, loops, and DOM structure.

| Directive | Purpose | Example |
|-----------|---------|---------|
| [t-if](#/docs/directives/structural/t-if) | Conditional rendering | `<div t-if="show">Content</div>` |
| [t-for](#/docs/directives/structural/t-for) | List rendering | `<li t-for="item in items">` |
| [t-bind](#/docs/directives/structural/t-bind) | Dynamic attributes | `<img t-bind:src="imageUrl">` |
| [t-ref](#/docs/directives/structural/t-ref) | DOM references | `<input t-ref="emailInput">` |
| [t-init](#/docs/directives/structural/t-init) | Initialization hook | `<div t-init="setup()">` |

---

## 📡 Async Directives

Handle network requests and async data loading.

| Directive | Purpose | Example |
|-----------|---------|---------|
| [t-fetch](#/docs/directives/async/t-fetch) | Fetch remote data | `<div t-fetch="'/api/posts'">` |
| [t-await](#/docs/directives/async/t-await) | Await async data | `<div t-await="loadData()">` |
| [t-loading](#/docs/directives/async/t-loading) | Loading state | `<div t-loading>Loading...</div>` |
| [t-error](#/docs/directives/async/t-error) | Error handling | `<div t-error>Failed to load</div>` |

---

## 🌈 Advanced Directives

Transitions, routing, and internationalization.

| Directive | Purpose | Example |
|-----------|---------|---------|
| [t-transition](#/docs/directives/advanced/t-transition) | CSS transitions | `<div t-transition="fade">` |
| [t-route](#/docs/directives/advanced/t-route) | Route-based display | `<div t-route="'home'">` |
| [t-text.lang](#/docs/directives/advanced/t-text.lang) | i18n translations | `<span t-text.lang="'greeting'">` |

---

## ⚡ Event Modifiers

Enhance event handling with modifiers.

| Modifier | Purpose | Example |
|----------|---------|---------|
| `.prevent` | Prevent default | `<form t-click="submit.prevent">` |
| `.stop` | Stop propagation | `<button t-click="open.stop">` |
| `.once` | Fire once only | `<button t-click="init.once">` |
| `.outside` | Click outside | `<div t-click="close.outside">` |

[📖 Full Event Modifiers Guide](#/docs/directives/advanced/event-modifiers)

---

## 🔄 Lifecycle Hooks

Component lifecycle management.

| Hook | Trigger | Example |
|------|---------|---------|
| `mounted()` | After element mount | `mounted(el, ctx) { ... }` |
| `beforeUnmount()` | Before removal | `beforeUnmount(el, ctx) { ... }` |
| `unmounted()` | After removal | `unmounted(el, ctx) { ... }` |

[📖 Full Lifecycle Guide](#/docs/directives/advanced/lifecycle-hooks)

---

## 🧠 Context Variables

Available in all directives and expressions.

| Variable | Description | Example |
|----------|-------------|---------|
| `$el` | Current element | `$el.classList.add('active')` |
| `$refs` | DOM references | `$refs.emailInput.focus()` |
| `$parent` | Parent scope | `$parent.data` |
| `$root` | Root scope | `$root.data` |
| `$store` | Global stores | `$store.auth.user` |
| `$lang` | Current language | `$lang = 'tr'` |

---

## 🚀 Quick Start Example

Here's a complete working example using multiple directives:

```html
<div t-data="demoApp()">
  <!-- Input with two-way binding -->
  <input t-model="message" placeholder="Type something...">

  <!-- Conditional rendering -->
  <div t-show="message">
    <p t-text="message"></p>
  </div>

  <!-- List rendering -->
  <ul>
    <li t-for="item in items" t-text="item"></li>
  </ul>

  <!-- Event handling -->
  <button t-click="addItem()">Add Item</button>
</div>

<script>
function demoApp() {
  return {
    message: 'Hello TinyPine!',
    items: ['Item 1', 'Item 2'],

    addItem() {
      this.items.push(`Item ${this.items.length + 1}`)
    }
  }
}
</script>
```

<div t-data="{ message: 'Hello TinyPine!', items: ['Item 1', 'Item 2'], addItem() { this.items.push(`Item ${this.items.length + 1}`) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <input t-model="message" placeholder="Type something..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">

  <div t-show="message" class="p-3 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <p t-text="message" class="text-gray-900 dark:text-white font-medium"></p>
  </div>

  <div>
    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Items:</h4>
    <ul class="space-y-2">
      <li t-for="item in items" class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
        <span t-text="item"></span>
      </li>
    </ul>
  </div>

  <button t-click="addItem()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Add Item
  </button>
</div>

---

## 📖 Learn More

- [TinyPine GitHub](https://github.com/DigitalCoreHub/TinyPine)
- [NPM Package](https://www.npmjs.com/package/tinypine)
- [Getting Started](#/docs/installation)

---

**Ready to explore?** Click on any directive above to see detailed documentation with live examples!
