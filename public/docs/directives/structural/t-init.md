# t-init

The `t-init` directive runs code when an element is initialized. It's perfect for setting up initial state, fetching data, or running startup logic.

## Syntax

```html
<element t-init="expression"></element>
```

## Basic Usage

### Simple Initialization

```html
<div t-data="{ message: '' }" t-init="message = 'Initialized!'">
  <p t-text="message"></p>
</div>
```

<div t-data="{ message: '' }" t-init="message = 'Component initialized!'" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <p t-text="message" class="text-lg text-gray-900 dark:text-white"></p>


### Call Initialization Method

```html
<div t-data="{
  users: [],
  init() {
    this.users = ['Alice', 'Bob', 'Charlie']
  }
}" t-init="$context.init()">
  <ul>
    <li t-for="user in users"><span t-text="user"></span></li>
  </ul>
</div>
```

<div t-data="{ users: [] }" t-init="users = ['Alice', 'Bob', 'Charlie']" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <p class="text-gray-900 dark:text-white">
    <strong>Users:</strong> <span t-text="users.join(', ')"></span>
  </p>
</div>

## Fetching Data

Load initial data from an API:

```html
<div t-data="{
  posts: [],
  async fetchPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    this.posts = await res.json()
  }
}" t-init="$context.fetchPosts()">
  <div t-for="post in posts">
    <h3 t-text="post.title"></h3>
  </div>
</div>
```

<div t-data="{
  posts: [],
  loading: true
}" t-init="(async function(){ try { const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3'); posts = await res.json(); } finally { loading = false; } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div t-show="loading" class="text-gray-500 dark:text-gray-400">Loading posts...</div>
  <div t-for="post in posts" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <h3 t-text="post.title" class="font-bold text-gray-900 dark:text-white"></h3>
  </div>
</div>

## Setting Up Timers

Start intervals or timeouts on initialization:

```html
<div t-data="{
  time: 0,
  timer: null,
  startTimer() {
    this.timer = setInterval(() => {
      this.time++
    }, 1000)
  }
}" t-init="$context.startTimer()">
  <p t-text="'Elapsed: ' + time + 's'"></p>
</div>
```

<div t-data="{
  time: 0,
  timer: null
}" t-init="timer = setInterval(function(){ const el = document.querySelector('[data-timer]'); if (el && el._tinypineScope) { el._tinypineScope.time++; } }, 1000)" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6" data-timer>
  <p t-text="'Elapsed: ' + time + 's'" class="text-2xl font-bold text-pine-600 dark:text-pine-400"></p>
</div>

## Local Storage

Load saved state from localStorage:

```html
<div t-data="{
  name: '',
  loadName() {
    this.name = localStorage.getItem('userName') || 'Guest'
  },
  saveName() {
    localStorage.setItem('userName', this.name)
  }
}" t-init="$context.loadName()">
  <input t-model="name" oninput="localStorage.setItem('userName', this.value)">
  <p t-text="'Hello, ' + name + '!'"></p>
</div>
```

<div t-data="{
  name: ''
}" t-init="name = localStorage.getItem('userName') || 'Guest'" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-model="name" oninput="localStorage.setItem('userName', this.value)" placeholder="Enter your name..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  <p t-text="'Hello, ' + name + '!'" class="text-xl font-bold text-gray-900 dark:text-white"></p>
  <p class="text-sm text-gray-500 dark:text-gray-400">Your name is saved to localStorage</p>
</div>

## Configuring Third-Party Libraries

Initialize external libraries:

```html
<div t-data="{
  chart: null,
  initChart() {
    // Initialize chart library
    const canvas = document.querySelector('[t-ref=chartCanvas]')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#2E7D32'
      ctx.fillRect(10, 10, 100, 50)
    }
  }
}" t-init="$context.initChart()">
  <canvas t-ref="chartCanvas" width="200" height="100"></canvas>
</div>
```

<div t-data="{}" t-init="(function() { const canvas = document.querySelector('[t-ref=myChart]'); if (canvas) { const ctx = canvas.getContext('2d'); const gradient = ctx.createLinearGradient(0, 0, 300, 0); gradient.addColorStop(0, '#2E7D32'); gradient.addColorStop(0.5, '#4CAF50'); gradient.addColorStop(1, '#81C784'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 300, 150); ctx.fillStyle = 'white'; ctx.fillRect(30, 90, 40, 50); ctx.fillRect(90, 60, 40, 80); ctx.fillRect(150, 40, 40, 100); ctx.fillRect(210, 70, 40, 70); } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <canvas t-ref="myChart" width="300" height="150" class="border border-gray-300 dark:border-gray-600 rounded-lg"></canvas>
</div>

## Event Listeners

Set up custom event listeners:

```html
<div t-data="{
  scrolled: false,
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.scrolled = window.scrollY > 50
    })
  }
}" t-init="$context.setupScrollListener()">
  <div t-show="scrolled">You've scrolled!</div>
</div>
```

<div t-data="{
  mouseX: 0,
  mouseY: 0
}" t-init="(function() { const el = document.querySelector('[t-ref=trackArea]'); const scope = el.closest('[t-data]')._tinypineScope; if (el) { el.addEventListener('mousemove', function(e){ const rect = el.getBoundingClientRect(); scope.mouseX = Math.floor(e.clientX - rect.left); scope.mouseY = Math.floor(e.clientY - rect.top); }); } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div t-ref="trackArea" class="h-32 bg-gradient-to-br from-pine-100 to-pine-200 dark:from-pine-900/20 dark:to-pine-800/20 rounded-lg flex items-center justify-center cursor-crosshair">
    <p class="text-gray-700 dark:text-gray-300">Move your mouse here</p>
  </div>
  <p class="text-gray-900 dark:text-white">
    <strong>Position:</strong> X: <span t-text="mouseX" class="text-pine-600 font-mono"></span>, Y: <span t-text="mouseY" class="text-pine-600 font-mono"></span>
  </p>
</div>

## Focus Management

Auto-focus inputs on mount:

```html
<div t-data="{
  focusInput() {
    const input = document.querySelector('[t-ref=searchInput]')
    if (input) input.focus()
  }
}" t-init="$context.focusInput()">
  <input t-ref="searchInput" placeholder="Auto-focused!">
</div>
```

<div t-data="{
  query: ''
}" t-init="setTimeout(function(){ const input = document.querySelector('[t-ref=searchBox]'); if (input) input.focus(); }, 100)" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-ref="searchBox" t-model="query" placeholder="This input is auto-focused!" class="w-full px-4 py-2 border-2 border-pine-300 dark:border-pine-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-pine-500 outline-none">
  <p t-show="query" class="text-gray-900 dark:text-white">
    Searching for: <span t-text="query" class="font-bold text-pine-600"></span>
  </p>
</div>

## Best Practices

### 1. Keep Init Logic Simple

```html
<!-- Good: Simple setup -->
<div t-init="count = 0"></div>

<!-- Better: Use methods for complex logic -->
<div t-data="{ setup() { /* complex logic */ } }" t-init="setup()"></div>
```

### 2. Handle Async Properly

```javascript
// Good: Async init
{
  async init() {
    this.loading = true
    try {
      this.data = await fetchData()
    } catch (error) {
      this.error = error.message
    } finally {
      this.loading = false
    }
  }
}
```

### 3. Clean Up Resources

```javascript
// Good: Clean up timers/listeners
{
  init() {
    this.timer = setInterval(() => {}, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
```

## t-init vs mounted()

Both run on initialization, but with subtle differences:

| Feature | t-init | mounted() |\n|---------|--------|-----------|
| **When** | During element parsing | After element is in DOM |
| **Use case** | Set initial state | DOM manipulation |
| **Multiple calls** | Can have multiple t-init | Single mounted() hook |

### Example Comparison

```html
<!-- Using t-init -->
<div t-data="{ count: 0 }" t-init="count = 10">
  <p t-text="count"></p>
</div>

<!-- Using mounted() -->
<div t-data="{
  count: 0,
  mounted() {
    this.count = 10
  }
}">
  <p t-text="count"></p>
</div>
```

## Common Patterns

### Initialize Multiple Values

```javascript
{
  init() {
    this.user = { name: 'John', age: 30 }
    this.isAdmin = false
    this.theme = 'light'
  }
}
```

### Fetch and Transform Data

```javascript
{
  async init() {
    const response = await fetch('/api/data')
    const raw = await response.json()
    this.items = raw.map(item => ({
      id: item.id,
      label: item.name.toUpperCase()
    }))
  }
}
```

### Initialize from URL Parameters

```javascript
{
  init() {
    const params = new URLSearchParams(window.location.search)
    this.filter = params.get('filter') || 'all'
    this.page = parseInt(params.get('page') || '1')
  }
}
```

## When to Use t-init

### ✅ Good Use Cases

- Setting initial state values
- Fetching data on mount
- Starting timers or intervals
- Loading from localStorage
- Initializing third-party libraries
- Setting up event listeners
- Auto-focusing inputs

### ❌ Avoid When

- Complex DOM manipulation (use `mounted()`)
- Side effects that should be user-triggered
- Logic that depends on child elements being ready

## See Also

- [Lifecycle Hooks](#/docs/directives/advanced/lifecycle-hooks) - Component lifecycle
- [t-data](#/docs/directives/core/t-data) - Component state
- [t-ref](#/docs/directives/structural/t-ref) - DOM references
