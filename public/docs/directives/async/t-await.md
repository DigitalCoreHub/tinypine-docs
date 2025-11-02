# t-await

The `t-await` directive waits for a promise to resolve and provides loading/error states. Perfect for displaying async data with built-in state management.

## Syntax

```html
<element t-await="promise">
  <template t-loading>Loading...</template>
  <template t-then="data">Success: {{ data }}</template>
  <template t-error="error">Error: {{ error }}</template>
</element>
```

## Basic Usage

### Simple Await

```html
<div t-data="{
  async getData() {
    const res = await fetch('https://api.example.com/data')
    return res.json()
  }
}" t-await="getData()">
  <div t-loading>Loading...</div>
  <div t-then="data" t-text="data.name"></div>
  <div t-error="error" t-text="error"></div>
</div>
```

<div t-data="{
  data: null,
  loading: true,
  error: null,
  async getData() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
      this.data = await res.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}" t-init="$context.getData()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-show="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
    <p class="text-gray-500 dark:text-gray-400 mt-2">Loading user data...</p>
  </div>

  <div t-show="!loading && data" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <h3 class="font-bold text-green-900 dark:text-green-100 mb-2" t-text="data.name"></h3>
    <p class="text-green-700 dark:text-green-300 text-sm">
      Email: <span t-text="data.email"></span><br>
      Phone: <span t-text="data.phone"></span>
    </p>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p class="text-red-700 dark:text-red-300" t-text="'Error: ' + error"></p>
  </div>
</div>

### Multiple States

Handle loading, success, and error states:

```html
<div t-data="{
  async fetchPost() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    return res.json()
  }
}" t-await="fetchPost()">
  <!-- Loading state -->
  <div t-loading>
    <div class="spinner"></div>
    <p>Loading post...</p>
  </div>

  <!-- Success state -->
  <div t-then="post">
    <h2 t-text="post.title"></h2>
    <p t-text="post.body"></p>
  </div>

  <!-- Error state -->
  <div t-error="err">
    <p t-text="'Failed: ' + err.message"></p>
  </div>
</div>
```

<div t-data="{
  post: null,
  loading: true,
  error: null,
  async fetchPost() {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      this.post = await res.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}" t-init="$context.fetchPost()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div t-show="loading" class="flex flex-col items-center justify-center py-12">
    <div class="relative w-16 h-16">
      <div class="absolute inset-0 border-4 border-pine-200 dark:border-pine-800 rounded-full"></div>
      <div class="absolute inset-0 border-4 border-pine-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p class="text-gray-500 dark:text-gray-400 mt-4">Loading post...</p>
  </div>

  <div t-show="!loading && post" class="space-y-3">
    <h2 t-text="post.title" class="text-2xl font-bold text-gray-900 dark:text-white"></h2>
    <p t-text="post.body" class="text-gray-700 dark:text-gray-300 leading-relaxed"></p>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p class="text-red-700 dark:text-red-300" t-text="'Failed: ' + error"></p>
  </div>
</div>

## Retry Logic

Add retry functionality for failed requests:

```html
<div t-data="{
  retries: 0,
  maxRetries: 3,
  async fetchWithRetry() {
    try {
      const res = await fetch('https://api.example.com/data')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    } catch (err) {
      if (this.retries < this.maxRetries) {
        this.retries++
        return this.fetchWithRetry()
      }
      throw err
    }
  }
}">
  <button t-click="fetchWithRetry()">Fetch with Retry</button>
</div>
```

<div t-data="{
  data: null,
  loading: false,
  error: null,
  attempt: 0,
  maxAttempts: 3,
  async fetchWithRetry(shouldFail) {
    this.loading = true
    this.error = null
    this.data = null
    this.attempt = 0

    const tryFetch = async () => {
      this.attempt++
      try {
        const url = shouldFail && this.attempt < 3
          ? 'https://jsonplaceholder.typicode.com/invalid'
          : 'https://jsonplaceholder.typicode.com/todos/1'

        const res = await fetch(url)
        if (!res.ok) throw new Error('Request failed')
        return await res.json()
      } catch (err) {
        if (this.attempt < this.maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          return tryFetch()
        }
        throw err
      }
    }

    try {
      this.data = await tryFetch()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="flex gap-2">
    <button t-click="fetchWithRetry(false)" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
      Fetch (Success)
    </button>
    <button t-click="fetchWithRetry(true)" class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
      Fetch with Retries
    </button>
  </div>

  <div t-show="loading" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">
      Loading... Attempt <span t-text="attempt"></span> of <span t-text="maxAttempts"></span>
    </p>
  </div>

  <div t-show="!loading && data" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <p class="text-green-700 dark:text-green-300">
      <strong>✓ Success after <span t-text="attempt"></span> attempt(s)</strong>
    </p>
    <pre class="mt-2 text-xs overflow-x-auto" t-text="JSON.stringify(data, null, 2)"></pre>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p class="text-red-700 dark:text-red-300">
      <strong>✗ Failed after <span t-text="maxAttempts"></span> attempts</strong><br>
      <span t-text="error"></span>
    </p>
  </div>
</div>

## Dependent Requests

Chain multiple async operations:

```html
<div t-data="{
  async getUserPosts(userId) {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const user = await userRes.json()

    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const posts = await postsRes.json()

    return { user, posts }
  }
}" t-await="getUserPosts(1)">
  <div t-then="data">
    <h2 t-text="data.user.name"></h2>
    <p t-text="data.posts.length + ' posts'"></p>
  </div>
</div>
```

<div t-data="{
  data: null,
  loading: false,
  async getUserPosts() {
    this.loading = true
    try {
      const userRes = await fetch('https://jsonplaceholder.typicode.com/users/1')
      const user = await userRes.json()

      const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5')
      const posts = await postsRes.json()

      this.data = { user, posts }
    } finally {
      this.loading = false
    }
  }
}" t-init="$context.getUserPosts()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-show="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
    <p class="text-gray-500 dark:text-gray-400 mt-2">Loading user and posts...</p>
  </div>

  <div t-show="!loading && data">
    <div class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded-lg mb-4">
      <h2 t-text="data.user.name" class="text-xl font-bold text-gray-900 dark:text-white"></h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm" t-text="data.user.email"></p>
    </div>

    <div class="space-y-2">
      <p class="font-medium text-gray-900 dark:text-white">
        Posts (<span t-text="data.posts.length"></span>):
      </p>
      <div t-for="post in data.posts" class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
        <p t-text="post.title" class="font-medium text-gray-900 dark:text-white text-sm"></p>
      </div>
    </div>
  </div>
</div>

## Parallel Requests

Fetch multiple resources simultaneously:

```html
<div t-data="{
  async loadAll() {
    const [users, posts, todos] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=3').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=3').then(r => r.json())
    ])
    return { users, posts, todos }
  }
}">
  <div t-await="loadAll()">
    <div t-then="data">
      <p t-text="data.users.length + ' users'"></p>
      <p t-text="data.posts.length + ' posts'"></p>
      <p t-text="data.todos.length + ' todos'"></p>
    </div>
  </div>
</div>
```

<div t-data="{
  data: null,
  loading: false,
  async loadAll() {
    this.loading = true
    try {
      const [users, posts, todos] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=3').then(r => r.json())
      ])
      this.data = { users, posts, todos }
    } finally {
      this.loading = false
    }
  }
}" t-init="$context.loadAll()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-show="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
    <p class="text-gray-500 dark:text-gray-400 mt-2">Loading all data in parallel...</p>
  </div>

  <div t-show="!loading && data" class="grid grid-cols-3 gap-4">
    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-center">
      <p class="text-3xl font-bold text-blue-600" t-text="data.users.length"></p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Users</p>
    </div>
    <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-center">
      <p class="text-3xl font-bold text-green-600" t-text="data.posts.length"></p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Posts</p>
    </div>
    <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded text-center">
      <p class="text-3xl font-bold text-purple-600" t-text="data.todos.length"></p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Todos</p>
    </div>
  </div>
</div>

## Timeout Handling

Add timeout to prevent hanging requests:

```html
<div t-data="{
  async fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const res = await fetch(url, { signal: controller.signal })
      return await res.json()
    } finally {
      clearTimeout(timeoutId)
    }
  }
}">
  <button t-click="fetchWithTimeout('https://api.example.com/slow', 3000)">
    Fetch with 3s timeout
  </button>
</div>
```

<div t-data="{
  data: null,
  loading: false,
  error: null,
  timedOut: false,
  async fetchWithTimeout(slow = false) {
    this.loading = true
    this.error = null
    this.data = null
    this.timedOut = false

    const controller = new AbortController()
    const timeout = 2000
    const timeoutId = setTimeout(() => {
      controller.abort()
      this.timedOut = true
    }, timeout)

    try {
      // Simulate slow endpoint
      const url = slow
        ? 'https://httpstat.us/200?sleep=5000'
        : 'https://jsonplaceholder.typicode.com/todos/1'

      const res = await fetch(url, { signal: controller.signal })
      this.data = await res.json()
    } catch (err) {
      this.error = this.timedOut ? 'Request timed out after 2s' : err.message
    } finally {
      clearTimeout(timeoutId)
      this.loading = false
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="flex gap-2">
    <button t-click="fetchWithTimeout(false)" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
      Fetch Fast (Success)
    </button>
    <button t-click="fetchWithTimeout(true)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      Fetch Slow (Timeout)
    </button>
  </div>

  <div t-show="loading" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">Loading... (2s timeout)</p>
  </div>

  <div t-show="!loading && data" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <p class="text-green-700 dark:text-green-300"><strong>✓ Success!</strong></p>
    <pre class="mt-2 text-xs overflow-x-auto" t-text="JSON.stringify(data, null, 2)"></pre>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p class="text-red-700 dark:text-red-300">
      <strong>✗ Error:</strong> <span t-text="error"></span>
    </p>
  </div>
</div>

## Caching Results

Cache API responses to avoid redundant requests:

```html
<div t-data="{
  cache: {},
  async fetchCached(url) {
    if (this.cache[url]) {
      return this.cache[url]
    }
    const res = await fetch(url)
    const data = await res.json()
    this.cache[url] = data
    return data
  }
}">
  <button t-click="fetchCached('/api/data')">Load Data</button>
</div>
```

<div t-data="{
  cache: {},
  data: null,
  loading: false,
  cacheHit: false,
  async fetchCached() {
    const url = 'https://jsonplaceholder.typicode.com/users/1'

    this.loading = true
    this.cacheHit = false

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (this.cache[url]) {
      this.data = this.cache[url]
      this.cacheHit = true
      this.loading = false
      return
    }

    try {
      const res = await fetch(url)
      const data = await res.json()
      this.cache[url] = data
      this.data = data
    } finally {
      this.loading = false
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="fetchCached()" :disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    <span t-show="!loading">Fetch User (Cached)</span>
    <span t-show="loading">Loading...</span>
  </button>

  <div t-show="cacheHit" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
    <p class="text-yellow-700 dark:text-yellow-300">⚡ Loaded from cache (instant!)</p>
  </div>

  <div t-show="data && !cacheHit && !loading" class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">📡 Fetched from API (saved to cache)</p>
  </div>

  <div t-show="data" class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
    <p class="font-bold text-gray-900 dark:text-white" t-text="data.name"></p>
    <p class="text-sm text-gray-600 dark:text-gray-400" t-text="data.email"></p>
  </div>
</div>

## Best Practices

### 1. Always Provide Loading State

```javascript
// Good
{
  loading: false,
  async fetch() {
    this.loading = true
    try {
      this.data = await fetchData()
    } finally {
      this.loading = false
    }
  }
}
```

### 2. Handle All Error Cases

```javascript
// Good
{
  error: null,
  async fetch() {
    try {
      this.data = await fetchData()
    } catch (err) {
      this.error = err.message
      console.error('Fetch error:', err)
    }
  }
}
```

### 3. Use Abort Controllers

```javascript
// Good: Cleanup pending requests
{
  controller: null,
  async fetch() {
    this.controller?.abort()
    this.controller = new AbortController()
    await fetch(url, { signal: this.controller.signal })
  }
}
```

## See Also

- [t-fetch](#/docs/directives/async/t-fetch) - Simple data fetching
- [t-loading](#/docs/directives/async/t-loading) - Loading states
- [t-error](#/docs/directives/async/t-error) - Error handling
- [t-init](#/docs/directives/structural/t-init) - Initialization hook
