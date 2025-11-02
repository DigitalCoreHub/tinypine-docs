# t-if

The `t-if` directive conditionally renders an element. Unlike `t-show`, elements are completely removed from the DOM when the condition is false.

## Syntax

```html
<div t-if="condition">
  <!-- Content -->
</div>
```

## Basic Usage

```html
<div t-data="{ show: true }">
  <button t-click="show = !show">Toggle</button>
  <p t-if="show">This element is conditionally rendered!</p>
</div>
```

<div t-data="{ show: true }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="show = !show" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    <span t-text="show ? 'Hide' : 'Show'"></span> Element
  </button>
  <p t-show="show" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded-lg text-gray-900 dark:text-white">
    This element is conditionally displayed!
  </p>
  <p class="text-sm text-gray-500 italic">Note: TinyPine v1.3.0 uses t-show for conditional rendering.</p>
</div>

## t-if vs t-show

| Feature | t-if | t-show |
|---------|------|--------|
| DOM presence | Removed when false | Always in DOM |
| CSS method | - | `display: none` |
| Performance | Better for rarely shown | Better for frequent toggles |
| State preservation | Lost on removal | Preserved |
| Initial render cost | Lower if false | Always rendered |

## When to Use t-if

Use `t-if` when:

- Content is rarely shown
- Content is expensive to render
- You want to reset state when hidden
- Conditional rendering based on permissions

```html
<!-- Good use case -->
<div t-if="user.role === 'admin'">
  <AdminPanel />
</div>
```

## When to Use t-show

Use `t-show` when:

- Content toggles frequently
- You want to preserve state
- Content is lightweight
- You need CSS transitions

```html
<!-- Good use case -->
<div t-show="sidebarOpen">
  <Sidebar />
</div>
```

## Conditional Expressions

### Simple Boolean

```html
<div t-data="{ loggedIn: false }">
  <div t-if="loggedIn">
    <p>Welcome back!</p>
  </div>
  <div t-if="!loggedIn">
    <p>Please log in</p>
  </div>
</div>
```

### Comparisons

```html
<div t-data="{ score: 85 }">
  <p t-if="score >= 90">Grade: A</p>
  <p t-if="score >= 80 && score < 90">Grade: B</p>
  <p t-if="score >= 70 && score < 80">Grade: C</p>
  <p t-if="score < 70">Grade: F</p>
</div>
```

<div t-data="{ score: 85 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex items-center gap-3">
    <label class="text-gray-900 dark:text-white">Score:</label>
    <input t-model="score" type="number" min="0" max="100" class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  </div>
  <div class="space-y-2">
    <p t-show="score >= 90" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 font-bold">
      Grade: A (Excellent!)
    </p>
    <p t-show="score >= 80 && score < 90" class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-800 dark:text-blue-300 font-bold">
      Grade: B (Good!)
    </p>
    <p t-show="score >= 70 && score < 80" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-300 font-bold">
      Grade: C (Average)
    </p>
    <p t-show="score < 70" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 font-bold">
      Grade: F (Needs improvement)
    </p>
  </div>
</div>

## Common Patterns

### Authentication

```html
<div t-data="{ user: null }">
  <div t-if="user">
    <p>Welcome, <span t-text="user.name"></span>!</p>
    <button t-click="user = null">Logout</button>
  </div>

  <div t-if="!user">
    <button t-click="user = { name: 'John' }">Login</button>
  </div>
</div>
```

<div t-data="{ user: null }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-show="user" class="space-y-3">
    <p class="text-gray-900 dark:text-white">Welcome, <span t-text="user && user.name" class="font-bold text-pine-600"></span>!</p>
    <button t-click="user = null" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
      Logout
    </button>
  </div>

  <div t-show="!user">
    <button t-click="user = { name: 'John Doe' }" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Login
    </button>
  </div>
</div>

### Permission-Based Rendering

```html
<div t-data="{ role: 'user' }">
  <div t-if="role === 'admin'">
    <p>Admin Panel</p>
  </div>

  <div t-if="role === 'user'">
    <p>User Dashboard</p>
  </div>
</div>
```

### Empty States

```html
<div t-data="{ items: [] }">
  <div t-if="items.length > 0">
    <ul>
      <li t-for="item in items" t-text="item"></li>
    </ul>
  </div>

  <div t-if="items.length === 0">
    <p>No items found</p>
  </div>
</div>
```

<div t-data="{ items: [] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="items.push('Item ' + (items.length + 1))" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Add Item
    </button>
    <button t-click="items = []" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
      Clear All
    </button>
  </div>

  <div t-show="items.length > 0">
    <ul class="space-y-2">
      <li t-for="item in items" class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
        <span t-text="item"></span>
      </li>
    </ul>
  </div>

  <div t-show="items.length === 0" class="p-8 text-center text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
    <p class="text-lg">No items yet</p>
    <p class="text-sm">Click "Add Item" to get started</p>
  </div>
</div>

## Best Practices

### 1. Use for Performance

```html
<!-- Good: Expensive component only rendered when needed -->
<div t-if="showChart">
  <ExpensiveChart />
</div>

<!-- Avoid: Always rendered, just hidden -->
<div t-show="showChart">
  <ExpensiveChart />
</div>
```

### 2. Combine with t-show

```html
<div t-if="user">
  <!-- Only exists if user is logged in -->
  <div t-show="sidebarOpen">
    <!-- Frequently toggled -->
  </div>
</div>
```

### 3. Keep Conditions Simple

```html
<!-- Good -->
<div t-if="isAdmin">

<!-- Better: Use computed property -->
<div t-if="canAccessPanel">
```

## Performance Tips

### Lazy Loading

```javascript
{
  showHeavyComponent: false,
  data: null,

  async loadComponent() {
    this.showHeavyComponent = true
    this.data = await fetchData()
  }
}
```

### Conditional Scripts

```html
<div t-if="needsAdvancedFeatures">
  <!-- Heavy components only loaded when needed -->
  <AdvancedEditor />
</div>
```

## See Also

- [t-show](#/docs/directives/t-show) - Toggle visibility
- [t-for](#/docs/directives/t-for) - List rendering
- [t-data](#/docs/directives/t-data) - Component state
