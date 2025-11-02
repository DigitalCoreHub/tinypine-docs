# t-show

The `t-show` directive toggles the visibility of an element based on a boolean expression. The element remains in the DOM but is hidden with CSS `display: none`.

## Syntax

```html
<div t-show="condition">
  <!-- Content -->
</div>
```

## Basic Usage

```html
<div t-data="{ visible: true }">
  <button t-click="visible = !visible">Toggle</button>
  <p t-show="visible">This text can be toggled!</p>
</div>
```

<div t-data="{ visible: true }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="visible = !visible" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    <span t-text="visible ? 'Hide' : 'Show'"></span> Content
  </button>
  <p t-show="visible" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded-lg text-gray-900 dark:text-white">
    This text can be toggled! Click the button to hide/show it.
  </p>
</div>

## Conditional Expressions

### Simple Boolean

```html
<div t-data="{ loggedIn: false }">
  <p t-show="loggedIn">Welcome back!</p>
  <p t-show="!loggedIn">Please log in.</p>
</div>
```

### Comparison

```html
<div t-data="{ age: 18 }">
  <input t-model="age" type="number">
  <p t-show="age >= 18">You are an adult</p>
  <p t-show="age < 18">You are a minor</p>
</div>
```

<div t-data="{ age: 18 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex items-center gap-3">
    <label class="text-gray-900 dark:text-white">Age:</label>
    <input t-model="age" type="number" min="0" max="120" class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  </div>
  <p t-show="age >= 18" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300">
    ✓ You are an adult
  </p>
  <p t-show="age < 18" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-300">
    ⚠ You are a minor
  </p>
</div>

## t-show vs t-if

### t-show

- Element stays in DOM
- Uses CSS `display: none`
- Better for frequently toggled elements
- Preserves element state

```html
<div t-show="visible">
  <!-- Element is always in DOM -->
</div>
```

### t-if

- Element added/removed from DOM
- Better for conditional rendering
- No performance cost when hidden
- State is reset on removal

```html
<div t-if="visible">
  <!-- Element removed when false -->
</div>
```

## Common Patterns

### Loading State

```html
<div t-data="{ loading: true }">
  <div t-show="loading">Loading...</div>
  <div t-show="!loading">Content loaded!</div>
</div>
```

<div t-data="{ loading: true, load() { this.loading = false } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="loading = !loading" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Toggle Loading
  </button>
  <div t-show="loading" class="flex items-center gap-3 text-gray-900 dark:text-white">
    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-pine-600"></div>
    <span>Loading content...</span>
  </div>
  <div t-show="!loading" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300">
    ✓ Content loaded successfully!
  </div>
</div>

### Error Message

```html
<div t-data="{ error: '' }">
  <input t-model="email" type="email">
  <button t-click="error = email ? '' : 'Email is required'">
    Submit
  </button>
  <p t-show="error" t-text="error" class="text-red-600"></p>
</div>
```

### Dropdown Menu

```html
<div t-data="{ open: false }">
  <button t-click="open = !open">Menu</button>
  <ul t-show="open">
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
  </ul>
</div>
```

<div t-data="{ open: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="relative inline-block">
    <button t-click="open = !open" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Menu <span t-text="open ? '▲' : '▼'"></span>
    </button>
    <ul t-show="open" class="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
      <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">Profile</li>
      <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">Settings</li>
      <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-red-600">Logout</li>
    </ul>
  </div>
</div>

### Modal

```html
<div t-data="{ modalOpen: false }">
  <button t-click="modalOpen = true">Open Modal</button>

  <div t-show="modalOpen" class="modal-overlay">
    <div class="modal">
      <h2>Modal Title</h2>
      <p>Modal content goes here...</p>
      <button t-click="modalOpen = false">Close</button>
    </div>
  </div>
</div>
```

## Best Practices

### 1. Use for Frequent Toggles

```html
<!-- Good: Element toggled frequently -->
<div t-show="sidebarOpen">
  <!-- Sidebar content -->
</div>
```

### 2. Combine with Transitions

Use CSS transitions for smooth animations:

```css
[t-show] {
  transition: opacity 0.3s ease;
}
```

### 3. Keep Expressions Simple

```html
<!-- Good -->
<div t-show="isVisible">

<!-- Avoid -->
<div t-show="items.filter(x => x.active).length > 0 && user.role === 'admin'">
```

## See Also

- [t-if](#/docs/directives/t-if) - Conditional rendering
- [t-data](#/docs/directives/t-data) - Component state
- [t-click](#/docs/directives/t-click) - Event handling
