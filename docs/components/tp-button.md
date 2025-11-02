# tp-button Component

A ready-to-use button component with multiple variants and sizes.

## Basic Usage

```html
<button class="tp-button">Click Me</button>
```

## Variants

### Primary (Default)

```html
<button class="tp-button tp-button-primary">
  Primary Button
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
    Primary Button
  </button>
</div>

### Secondary

```html
<button class="tp-button tp-button-secondary">
  Secondary Button
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
    Secondary Button
  </button>
</div>

### Outline

```html
<button class="tp-button tp-button-outline">
  Outline Button
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button class="px-6 py-3 border-2 border-pine-600 text-pine-600 dark:text-pine-400 rounded-lg hover:bg-pine-50 dark:hover:bg-pine-900/20 transition-colors font-medium">
    Outline Button
  </button>
</div>

### Danger

```html
<button class="tp-button tp-button-danger">
  Delete
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
    Delete
  </button>
</div>

## Sizes

```html
<button class="tp-button tp-button-sm">Small</button>
<button class="tp-button">Medium</button>
<button class="tp-button tp-button-lg">Large</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 flex items-center gap-4">
  <button class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors text-sm font-medium">
    Small
  </button>
  <button class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
    Medium
  </button>
  <button class="px-8 py-4 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors text-lg font-medium">
    Large
  </button>
</div>

## States

### Disabled

```html
<button class="tp-button" disabled>
  Disabled Button
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button disabled class="px-6 py-3 bg-gray-400 text-gray-200 rounded-lg cursor-not-allowed font-medium">
    Disabled Button
  </button>
</div>

### Loading

```html
<div t-data="{ loading: false }">
  <button t-click="loading = !loading" class="tp-button">
    <span t-show="loading">Loading...</span>
    <span t-show="!loading">Click Me</span>
  </button>
</div>
```

<div t-data="{ loading: false, simulateLoad() { this.loading = true; setTimeout(() => { this.loading = false }, 2000) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button t-click="simulateLoad()" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium flex items-center gap-2">
    <span t-show="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
    <span t-text="loading ? 'Loading...' : 'Click Me'"></span>
  </button>
</div>

## With Icons

```html
<button class="tp-button">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
  </svg>
  Add Item
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 flex gap-4">
  <button class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
    Add Item
  </button>

  <button class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
    Delete
  </button>

  <button class="px-6 py-3 border-2 border-pine-600 text-pine-600 dark:text-pine-400 rounded-lg hover:bg-pine-50 dark:hover:bg-pine-900/20 transition-colors font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
    </svg>
    Download
  </button>
</div>

## Full Width

```html
<button class="tp-button w-full">
  Full Width Button
</button>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
    Full Width Button
  </button>
</div>

## Button Groups

```html
<div class="tp-button-group">
  <button class="tp-button">Left</button>
  <button class="tp-button">Center</button>
  <button class="tp-button">Right</button>
</div>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
    <button class="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium border-r border-gray-300 dark:border-gray-600">
      Left
    </button>
    <button class="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium border-r border-gray-300 dark:border-gray-600">
      Center
    </button>
    <button class="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium">
      Right
    </button>
  </div>
</div>

## CSS Classes Reference

```css
/* Base button */
.tp-button {
  @apply px-6 py-3 rounded-lg font-medium transition-colors;
}

/* Variants */
.tp-button-primary {
  @apply bg-pine-600 text-white hover:bg-pine-700;
}

.tp-button-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700;
}

.tp-button-outline {
  @apply border-2 border-pine-600 text-pine-600 hover:bg-pine-50;
}

.tp-button-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}

/* Sizes */
.tp-button-sm {
  @apply px-4 py-2 text-sm;
}

.tp-button-lg {
  @apply px-8 py-4 text-lg;
}
```

## See Also

- [tp-input](#/docs/components/tp-input) - Input component
- [t-click](#/docs/directives/t-click) - Click event handling
