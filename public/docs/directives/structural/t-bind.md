# t-bind

The `t-bind` directive dynamically binds element attributes to reactive data. It's the key to creating dynamic, data-driven UIs.

## Syntax

```html
<!-- Long form -->
<element t-bind:attribute="expression"></element>

<!-- Short form (Vue-style) -->
<element :attribute="expression"></element>
```

## Basic Usage

### Dynamic Attributes

```html
<div t-data="{ imageUrl: 'https://via.placeholder.com/150' }">
  <img t-bind:src="imageUrl" alt="Dynamic image">
</div>
```

<div t-data="{ imageUrl: 'https://via.placeholder.com/150/2E7D32/FFFFFF?text=TinyPine' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="imageUrl = 'https://via.placeholder.com/150/2E7D32/FFFFFF?text=TinyPine'" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700">Green</button>
    <button t-click="imageUrl = 'https://via.placeholder.com/150/FF5722/FFFFFF?text=Hello'" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Orange</button>
    <button t-click="imageUrl = 'https://via.placeholder.com/150/2196F3/FFFFFF?text=World'" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Blue</button>
  </div>
  <img t-bind:src="imageUrl" alt="Dynamic image" class="rounded-lg shadow-md">
</div>

### Dynamic Links

```html
<div t-data="{ page: 'home' }">
  <a t-bind:href="'#/' + page">Go to <span t-text="page"></span></a>
</div>
```

<div t-data="{ page: 'home' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="page = 'home'" class="px-4 py-2 bg-gray-600 text-white rounded">Home</button>
    <button t-click="page = 'about'" class="px-4 py-2 bg-gray-600 text-white rounded">About</button>
    <button t-click="page = 'contact'" class="px-4 py-2 bg-gray-600 text-white rounded">Contact</button>
  </div>
  <a t-bind:href="'#/docs/' + page" class="inline-block px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Go to <span t-text="page" class="capitalize"></span> →
  </a>
</div>

## Multiple Bindings

Bind multiple attributes on the same element:

```html
<div t-data="{
  id: 'box-1',
  title: 'Hover me!',
  dataValue: '123'
}">
  <div t-bind:id="id"
       t-bind:title="title"
       t-bind:data-value="dataValue">
    Content
  </div>
</div>
```

<div t-data="{
  id: 'dynamic-box',
  title: 'This is a dynamic tooltip!',
  dataValue: '42'
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-bind:id="id"
       t-bind:title="title"
       t-bind:data-value="dataValue"
       class="p-4 bg-pine-100 dark:bg-pine-900/20 border border-pine-300 dark:border-pine-700 rounded cursor-help text-gray-900 dark:text-white">
    <p class="font-medium">Hover over me to see the title!</p>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
      ID: <code t-text="id" class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"></code><br>
      Data Value: <code t-text="dataValue" class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"></code>
    </p>
  </div>
</div>

## Dynamic Styles

Bind inline styles dynamically:

```html
<div t-data="{
  color: 'blue',
  size: '20px'
}">
  <p t-bind:style="`color: ${color}; font-size: ${size};`">
    Styled text
  </p>
</div>
```

<div t-data="{
  color: '#2E7D32',
  size: 20
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="space-y-3">
    <label class="block">
      <span class="text-gray-900 dark:text-white">Color:</span>
      <input t-model="color" type="color" class="ml-2 w-20 h-10 rounded cursor-pointer">
    </label>
    <label class="block">
      <span class="text-gray-900 dark:text-white">Size: <span t-text="size + 'px'"></span></span>
      <input t-model="size" type="range" min="12" max="48" class="ml-2 w-64">
    </label>
  </div>
  <p t-bind:style="`color: ${color}; font-size: ${size}px; font-weight: bold;`">
    This text changes dynamically!
  </p>
</div>

## Dynamic Classes (Alternative to t-class)

```html
<div t-data="{ isActive: false, theme: 'light' }">
  <div t-bind:class="isActive ? 'active' : 'inactive'">
    Status div
  </div>
</div>
```

<div t-data="{ isActive: true, theme: 'primary' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="isActive = !isActive" class="px-4 py-2 bg-gray-600 text-white rounded">
      Toggle Active
    </button>
    <select t-model="theme" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
      <option value="primary">Primary</option>
      <option value="secondary">Secondary</option>
      <option value="success">Success</option>
      <option value="danger">Danger</option>
    </select>
  </div>
  <div t-bind:class="`p-4 rounded-lg font-medium ${isActive ? 'opacity-100' : 'opacity-50'} ${
    theme === 'primary' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
    theme === 'secondary' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' :
    theme === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
    'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
  }`">
    Theme: <span t-text="theme" class="capitalize"></span> | Status: <span t-text="isActive ? 'Active' : 'Inactive'"></span>
  </div>
</div>

## Form Attributes

### Dynamic Disabled State

```html
<div t-data="{
  loading: false,
  terms: false
}">
  <button t-bind:disabled="loading || !terms">
    Submit
  </button>
</div>
```

<div t-data="{
  loading: false,
  terms: false,
  submit() {
    this.loading = true;
    setTimeout(() => { this.loading = false }, 2000);
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
    <input t-model="terms" type="checkbox" class="w-5 h-5">
    I accept the terms and conditions
  </label>
  <button t-click="submit()"
          t-bind:disabled="loading || !terms"
          class="px-6 py-3 rounded-lg font-medium transition-all"
          :class="(loading || !terms) ? 'bg-gray-400 cursor-not-allowed' : 'bg-pine-600 hover:bg-pine-700'"
          :class="(loading || !terms) ? 'text-gray-200' : 'text-white'">
    <span t-show="!loading">Submit</span>
    <span t-show="loading">Processing...</span>
  </button>
</div>

### Dynamic Placeholder

```html
<div t-data="{
  field: 'email',
  placeholders: {
    email: 'Enter your email...',
    phone: 'Enter your phone...',
    name: 'Enter your name...'
  }
}">
  <input t-bind:placeholder="placeholders[field]">
</div>
```

<div t-data="{
  field: 'email',
  value: '',
  placeholders: {
    email: 'you@example.com',
    phone: '+1 (555) 000-0000',
    name: 'John Doe'
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="field = 'email'" class="px-4 py-2 bg-gray-600 text-white rounded" :class="field === 'email' ? 'bg-pine-600' : ''">Email</button>
    <button t-click="field = 'phone'" class="px-4 py-2 bg-gray-600 text-white rounded" :class="field === 'phone' ? 'bg-pine-600' : ''">Phone</button>
    <button t-click="field = 'name'" class="px-4 py-2 bg-gray-600 text-white rounded" :class="field === 'name' ? 'bg-pine-600' : ''">Name</button>
  </div>
  <input t-model="value"
         t-bind:placeholder="placeholders[field]"
         t-bind:type="field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'"
         class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
</div>

## ARIA Attributes

Improve accessibility with dynamic ARIA attributes:

```html
<div t-data="{ expanded: false }">
  <button t-bind:aria-expanded="expanded"
          t-bind:aria-label="expanded ? 'Collapse menu' : 'Expand menu'">
    Menu
  </button>
</div>
```

<div t-data="{ expanded: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="expanded = !expanded"
          t-bind:aria-expanded="expanded"
          t-bind:aria-label="expanded ? 'Collapse menu' : 'Expand menu'"
          class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors flex items-center gap-2">
    <span>Menu</span>
    <span t-text="expanded ? '▲' : '▼'"></span>
  </button>

  <div t-show="expanded"
       t-bind:aria-hidden="!expanded"
       class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <ul class="space-y-2 text-gray-900 dark:text-white">
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
      <li>Menu Item 3</li>
    </ul>
  </div>
</div>

## Data Attributes

Bind custom data attributes:

```html
<div t-data="{ userId: 123, role: 'admin' }">
  <div t-bind:data-user-id="userId"
       t-bind:data-role="role">
    User Info
  </div>
</div>
```

<div t-data="{ userId: 42, role: 'admin', status: 'active' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-bind:data-user-id="userId"
       t-bind:data-role="role"
       t-bind:data-status="status"
       class="p-4 bg-pine-100 dark:bg-pine-900/20 border border-pine-300 dark:border-pine-700 rounded">
    <p class="font-medium text-gray-900 dark:text-white mb-2">User Dashboard</p>
    <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
      <p>User ID: <code t-text="userId" class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"></code></p>
      <p>Role: <code t-text="role" class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"></code></p>
      <p>Status: <code t-text="status" class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"></code></p>
    </div>
  </div>
</div>

## Best Practices

### 1. Use Short Form When Possible

```html
<!-- Prefer short form -->
<img :src="imageUrl">

<!-- Long form is more explicit -->
<img t-bind:src="imageUrl">
```

### 2. Combine with Static Attributes

```html
<!-- Static and dynamic together -->
<img src="fallback.jpg"
     :src="dynamicUrl"
     alt="Image"
     class="rounded">
```

### 3. Use Template Literals for Complex Expressions

```html
<!-- Good -->
<div :style="`width: ${width}px; height: ${height}px;`"></div>

<!-- Less readable -->
<div :style="'width: ' + width + 'px; height: ' + height + 'px;'"></div>
```

## Common Patterns

### Loading Images

```javascript
{
  loading: true,
  imageUrl: '',
  loadImage(url) {
    this.loading = true
    this.imageUrl = url
    // Image will trigger onload event
  }
}
```

### Dynamic Icons

```javascript
{
  icons: {
    success: 'check-circle.svg',
    error: 'x-circle.svg',
    warning: 'alert-circle.svg'
  },
  status: 'success',
  get iconUrl() {
    return `/icons/${this.icons[this.status]}`
  }
}
```

### Conditional Attributes

```javascript
{
  isExternal: true,
  get linkAttrs() {
    return this.isExternal
      ? { target: '_blank', rel: 'noopener' }
      : {}
  }
}
```

## See Also

- [t-class](#/docs/directives/core/t-class) - Conditional classes (cleaner for classes)
- [t-model](#/docs/directives/core/t-model) - Two-way binding
- [t-show](#/docs/directives/core/t-show) - Toggle visibility
