# t-error

The `t-error` directive displays content when an error occurs during async operations. It works seamlessly with `t-fetch` and `t-await` for comprehensive error handling.

## Syntax

```html
<element t-error="errorVariable">
  Error: {{ errorVariable.message }}
</element>
```

## Basic Usage

### Simple Error Display

```html
<div t-data="{
  error: null,
  async fetch() {
    try {
      const res = await fetch('/api/data')
      if (!res.ok) throw new Error('Failed to fetch')
      this.data = await res.json()
    } catch (err) {
      this.error = err.message
    }
  }
}">
  <button t-click="fetch()">Load Data</button>
  <div t-show="error" t-text="error"></div>
</div>
```

<div t-data="{
  error: null,
  loading: false
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="flex gap-2">
    <button t-click="(async function(){ loading = true; error = null; try { const url = 'https://jsonplaceholder.typicode.com/todos/1'; const res = await fetch(url); if (!res.ok) throw new Error('Failed to fetch data'); const data = await res.json(); alert('Success! Loaded: ' + data.title); } catch (err) { error = err.message; } finally { loading = false; } })()" :disabled="loading" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
      Load Data (Success)
    </button>
    <button t-click="(async function(){ loading = true; error = null; try { const url = 'https://jsonplaceholder.typicode.com/invalid'; const res = await fetch(url); if (!res.ok) throw new Error('Failed to fetch data'); const data = await res.json(); alert('Success! Loaded: ' + data.title); } catch (err) { error = err.message; } finally { loading = false; } })()" :disabled="loading" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
      Load Data (Error)
    </button>
  </div>

  <div t-show="loading" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">Loading...</p>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p class="text-red-700 dark:text-red-300">
      <strong>❌ Error:</strong> <span t-text="error"></span>
    </p>
  </div>
</div>

### Styled Error Messages

```html
<div t-data="{ error: null }">
  <div t-show="error" class="error-box">
    <span class="error-icon">⚠</span>
    <p t-text="error"></p>
  </div>
</div>
```

<div t-data="{
  error: null,
  showError(type) {
    const messages = {
      network: 'Network connection failed. Please check your internet.',
      auth: 'Authentication failed. Please log in again.',
      validation: 'Invalid input. Please check your data.',
      server: 'Server error. Please try again later.'
    }
    this.error = messages[type]
  },
  clearError() {
    this.error = null
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="grid grid-cols-2 gap-2">
    <button t-click="showError('network')" class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
      Network Error
    </button>
    <button t-click="showError('auth')" class="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm">
      Auth Error
    </button>
    <button t-click="showError('validation')" class="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
      Validation Error
    </button>
    <button t-click="showError('server')" class="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
      Server Error
    </button>
  </div>

  <div t-show="error" class="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
    <span class="text-2xl">⚠️</span>
    <div class="flex-1">
      <p t-text="error" class="text-red-700 dark:text-red-300 font-medium"></p>
      <button t-click="clearError()" class="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:no-underline">
        Dismiss
      </button>
    </div>
  </div>
</div>

## Error Types

### Network Errors

```html
<div t-data="{
  error: null,
  async fetch() {
    try {
      const res = await fetch('/api/data', {
        signal: AbortSignal.timeout(5000)
      })
      this.data = await res.json()
    } catch (err) {
      if (err.name === 'AbortError') {
        this.error = 'Request timed out'
      } else if (err.name === 'TypeError') {
        this.error = 'Network error - check your connection'
      } else {
        this.error = err.message
      }
    }
  }
}">
  <div t-show="error" t-text="error"></div>
</div>
```

<div t-data="{
  error: null,
  loading: false,
  errorType: null
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="flex gap-2">
    <button t-click="(async function(){ loading = true; error = null; errorType = 'timeout'; try { const controller = new AbortController(); setTimeout(() => controller.abort(), 100); await fetch('https://httpstat.us/200?sleep=5000', { signal: controller.signal }); } catch (err) { if (err.name === 'AbortError') { error = '⏱️ Request timed out after 5 seconds'; } else if (err.name === 'TypeError') { error = '🌐 Network error - check your connection'; } else { error = '❌ ' + err.message; } } finally { loading = false; } })()" :disabled="loading" class="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm">
      Timeout
    </button>
    <button t-click="(async function(){ loading = true; error = null; errorType = 'network'; try { await fetch('https://invalid-domain-that-does-not-exist-12345.com'); } catch (err) { if (err.name === 'AbortError') { error = '⏱️ Request timed out after 5 seconds'; } else if (err.name === 'TypeError') { error = '🌐 Network error - check your connection'; } else { error = '❌ ' + err.message; } } finally { loading = false; } })()" :disabled="loading" class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
      Network
    </button>
    <button t-click="(async function(){ loading = true; error = null; errorType = '404'; try { await fetch('https://jsonplaceholder.typicode.com/invalid'); } catch (err) { if (err.name === 'AbortError') { error = '⏱️ Request timed out after 5 seconds'; } else if (err.name === 'TypeError') { error = '🌐 Network error - check your connection'; } else { error = '❌ ' + err.message; } } finally { loading = false; } })()" :disabled="loading" class="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
      404 Error
    </button>
  </div>

  <div t-show="loading" class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">Attempting request...</p>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p t-text="error" class="text-red-700 dark:text-red-300 font-medium"></p>
  </div>
</div>

### Validation Errors

Display form validation errors:

```html
<div t-data="{
  errors: {},
  async submit() {
    this.errors = {}
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(this.form)
      })
      if (!res.ok) {
        const data = await res.json()
        this.errors = data.errors
      }
    } catch (err) {
      this.errors = { general: err.message }
    }
  }
}">
  <div t-show="errors.email" t-text="errors.email"></div>
  <div t-show="errors.password" t-text="errors.password"></div>
</div>
```

<div t-data="{
  form: { email: '', password: '' },
  errors: {},
  submitting: false,
  validate() {
    this.errors = {}
    if (!this.form.email) {
      this.errors.email = 'Email is required'
    } else if (!this.form.email.includes('@')) {
      this.errors.email = 'Invalid email format'
    }
    if (!this.form.password) {
      this.errors.password = 'Password is required'
    } else if (this.form.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters'
    }
    return Object.keys(this.errors).length === 0
  },
  async submit() {
    if (!this.validate()) return
    this.submitting = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Form submitted successfully!')
    this.submitting = false
    this.form = { email: '', password: '' }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div>
    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Email</label>
    <input t-model="form.email" type="text" placeholder="your@email.com" class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" :class="errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'">
    <p t-show="errors.email" t-text="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400"></p>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Password</label>
    <input t-model="form.password" type="password" placeholder="••••••" class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" :class="errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'">
    <p t-show="errors.password" t-text="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400"></p>
  </div>

  <button t-click="submit()" :disabled="submitting" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    <span t-show="!submitting">Submit</span>
    <span t-show="submitting">Submitting...</span>
  </button>
</div>

## Retry Logic

Add retry button for failed requests:

```html
<div t-data="{
  error: null,
  retries: 0,
  async fetch() {
    try {
      const res = await fetch('/api/data')
      if (!res.ok) throw new Error('Failed')
      this.data = await res.json()
      this.error = null
    } catch (err) {
      this.error = err.message
    }
  }
}">
  <div t-show="error">
    <p t-text="error"></p>
    <button t-click="fetch(); retries++">
      Retry (Attempt: {{ retries + 1 }})
    </button>
  </div>
</div>
```

<div t-data="{
  error: null,
  loading: false,
  retries: 0,
  data: null
}" t-init="(async function(){ loading = true; error = null; try { if (retries < 2) { throw new Error('Request failed. Please try again.'); } const res = await fetch('https://jsonplaceholder.typicode.com/todos/1'); data = await res.json(); retries = 0; } catch (err) { error = err.message; } finally { loading = false; } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div t-show="loading" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">Loading...</p>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded space-y-3">
    <div>
      <p class="text-red-700 dark:text-red-300 font-medium">❌ <span t-text="error"></span></p>
      <p class="text-sm text-red-600 dark:text-red-400 mt-1">
        Attempts: <span t-text="retries"></span> of 3
      </p>
    </div>
    <button t-click="(async function(){ retries++; loading = true; error = null; try { if (retries < 2) { throw new Error('Request failed. Please try again.'); } const res = await fetch('https://jsonplaceholder.typicode.com/todos/1'); data = await res.json(); retries = 0; } catch (err) { error = err.message; } finally { loading = false; } })()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      🔄 Retry
    </button>
  </div>

  <div t-show="data && !error" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <p class="text-green-700 dark:text-green-300">
      <strong>✓ Success!</strong> Data loaded after <span t-text="retries"></span> retries
    </p>
    <pre class="mt-2 text-xs overflow-x-auto" t-text="JSON.stringify(data, null, 2)"></pre>
  </div>
</div>

## Error Boundaries

Catch and handle component errors:

```html
<div t-data="{
  error: null,
  errorBoundary(fn) {
    try {
      return fn()
    } catch (err) {
      this.error = err.message
      console.error('Component error:', err)
    }
  }
}">
  <div t-show="error">
    <h3>Something went wrong</h3>
    <p t-text="error"></p>
    <button t-click="error = null; location.reload()">
      Reload Page
    </button>
  </div>
</div>
```

<div t-data="{
  error: null,
  count: 0,
  triggerError() {
    try {
      this.count++
      if (this.count % 3 === 0) {
        throw new Error('Critical error occurred at count ' + this.count)
      }
    } catch (err) {
      this.error = err.message
      console.error('Component error:', err)
    }
  },
  recover() {
    this.error = null
    this.count = 0
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-show="!error" class="space-y-3">
    <p class="text-gray-900 dark:text-white">
      Count: <span t-text="count" class="font-bold text-pine-600"></span>
    </p>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Every 3rd click will trigger an error
    </p>
    <button t-click="triggerError()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
      Increment Counter
    </button>
  </div>

  <div t-show="error" class="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-lg text-center space-y-4">
    <div class="text-4xl">💥</div>
    <h3 class="text-xl font-bold text-red-900 dark:text-red-100">Something went wrong</h3>
    <p t-text="error" class="text-red-700 dark:text-red-300"></p>
    <button t-click="recover()" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
      🔄 Recover and Reset
    </button>
  </div>
</div>

## Toast Notifications

Show error notifications:

```html
<div t-data="{
  toasts: [],
  showError(message) {
    const id = Date.now()
    this.toasts.push({ id, message, type: 'error' })
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }, 5000)
  }
}">
  <div t-for="toast in toasts" class="toast error">
    <p t-text="toast.message"></p>
  </div>
</div>
```

<div t-data="{
  toasts: [],
  showError(type) {
    const messages = {
      save: 'Failed to save changes',
      delete: 'Failed to delete item',
      upload: 'File upload failed',
      network: 'Network connection lost'
    }
    const id = Date.now()
    this.toasts.push({ id, message: messages[type] })
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }, 4000)
  },
  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="grid grid-cols-2 gap-2">
    <button t-click="showError('save')" class="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700">
      Save Error
    </button>
    <button t-click="showError('delete')" class="px-3 py-2 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
      Delete Error
    </button>
    <button t-click="showError('upload')" class="px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
      Upload Error
    </button>
    <button t-click="showError('network')" class="px-3 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
      Network Error
    </button>
  </div>

  <div class="fixed top-4 right-4 space-y-2 z-50" style="max-width: 300px;">
    <div t-for="toast in toasts" class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 animate-slide-in">
      <span class="text-xl">❌</span>
      <p t-text="toast.message" class="flex-1 font-medium"></p>
      <button t-click="removeToast(toast.id)" class="text-white hover:text-gray-200">✕</button>
    </div>
  </div>

  <p class="text-sm text-gray-500 dark:text-gray-400">
    Notifications appear in the top-right corner
  </p>
</div>

## Fallback UI

Show fallback content on error:

```html
<div t-data="{
  data: null,
  error: null,
  async load() {
    try {
      this.data = await fetchData()
    } catch (err) {
      this.error = err
    }
  }
}" t-init="$context.load()">
  <div t-show="!error && data">
    <!-- Normal UI -->
  </div>

  <div t-show="error">
    <!-- Fallback UI -->
    <p>Unable to load data</p>
    <button t-click="load()">Try Again</button>
  </div>
</div>
```

<div t-data="{
  data: null,
  error: null,
  loading: false
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="(async function(){ loading = true; error = null; data = null; try { await new Promise(resolve => setTimeout(resolve, 1000)); data = { title: 'Dashboard', stats: { users: 1234, posts: 567, comments: 8901 } }; } catch (err) { error = err.message; } finally { loading = false; } })()" :disabled="loading" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700 disabled:opacity-50">
      Load Successfully
    </button>
    <button t-click="(async function(){ loading = true; error = null; data = null; try { await new Promise(resolve => setTimeout(resolve, 1000)); throw new Error('Unable to connect to server'); } catch (err) { error = err.message; } finally { loading = false; } })()" :disabled="loading" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
      Load with Error
    </button>
  </div>

  <div t-show="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
  </div>

  <div t-show="!loading && data && !error" class="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <h3 t-text="data.title" class="text-2xl font-bold text-gray-900 dark:text-white mb-4"></h3>
    <div class="grid grid-cols-3 gap-4">
      <div class="text-center">
        <p class="text-3xl font-bold text-pine-600" t-text="data.stats.users"></p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Users</p>
      </div>
      <div class="text-center">
        <p class="text-3xl font-bold text-blue-600" t-text="data.stats.posts"></p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Posts</p>
      </div>
      <div class="text-center">
        <p class="text-3xl font-bold text-purple-600" t-text="data.stats.comments"></p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Comments</p>
      </div>
    </div>
  </div>

  <div t-show="error" class="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center space-y-4">
    <div class="text-6xl">⚠️</div>
    <div>
      <h3 class="text-xl font-bold text-red-900 dark:text-red-100 mb-2">Unable to load data</h3>
      <p t-text="error" class="text-red-700 dark:text-red-300"></p>
    </div>
    <button t-click="load(false)" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
      Try Again
    </button>
  </div>
</div>

## Best Practices

### 1. Always Catch Errors

```javascript
// Good
async fetch() {
  try {
    await fetchData()
  } catch (err) {
    this.error = err.message
  }
}
```

### 2. Provide User-Friendly Messages

```javascript
// Good: Clear, actionable message
this.error = 'Unable to save changes. Please check your connection and try again.'

// Bad: Technical jargon
this.error = 'TypeError: Cannot read property X of undefined'
```

### 3. Offer Recovery Options

```html
<!-- Good: Give user options to recover -->
<div t-show="error">
  <p t-text="error"></p>
  <button t-click="retry()">Retry</button>
  <button t-click="goBack()">Go Back</button>
</div>
```

## See Also

- [t-fetch](#/docs/directives/async/t-fetch) - Data fetching
- [t-await](#/docs/directives/async/t-await) - Async operations
- [t-loading](#/docs/directives/async/t-loading) - Loading states
- [t-show](#/docs/directives/core/t-show) - Conditional visibility
