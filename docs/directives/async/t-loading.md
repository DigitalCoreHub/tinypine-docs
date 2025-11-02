# t-loading

The `t-loading` directive shows content only during async operations. It automatically handles loading states for `t-fetch` and `t-await` directives.

## Syntax

```html
<element t-loading>Loading content...</element>
```

## Basic Usage

### Simple Loading Indicator

```html
<div t-data="{ loading: false }">
  <button t-click="loading = true">Start Loading</button>
  <div t-show="loading">Loading...</div>
</div>
```

<div t-data="{
  loading: false,
  startLoading() {
    this.loading = true
    setTimeout(() => { this.loading = false }, 2000)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="startLoading()" :disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    <span t-show="!loading">Start Loading</span>
    <span t-show="loading">Loading...</span>
  </button>

  <div t-show="loading" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-center">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
    <p class="text-blue-700 dark:text-blue-300 mt-2">Loading...</p>
  </div>
</div>

### Spinner Loading

```html
<div t-data="{
  loading: false,
  async fetch() {
    this.loading = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.loading = false
  }
}">
  <button t-click="fetch()">Load Data</button>
  <div t-show="loading" class="spinner"></div>
</div>
```

<div t-data="{
  loading: false
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="(async function(){ loading = true; await new Promise(resolve => setTimeout(resolve, 2000)); loading = false; })()" :disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    Load Data
  </button>

  <div t-show="loading" class="flex items-center justify-center py-8">
    <div class="relative w-16 h-16">
      <div class="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
      <div class="absolute inset-0 border-4 border-pine-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>

  <div t-show="!loading" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-center">
    <p class="text-green-700 dark:text-green-300">✓ Data loaded successfully!</p>
  </div>
</div>

## Loading States

### Skeleton Loaders

Show placeholder content while loading:

```html
<div t-data="{ loading: true }">
  <div t-show="loading">
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
  </div>
  <div t-show="!loading">
    <p>Actual content here...</p>
  </div>
</div>
```

<div t-data="{
  loading: false,
  data: null,
  async loadContent() {
    this.loading = true
    this.data = null
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.data = {
      title: 'Article Title',
      author: 'John Doe',
      content: 'This is the article content that was loaded from the server.'
    }
    this.loading = false
  }
}" t-init="$context.loadContent()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="loadContent()" :disabled="loading" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    Reload
  </button>

  <div t-show="loading" class="space-y-3 animate-pulse">
    <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
  </div>

  <div t-show="!loading && data" class="space-y-2">
    <h3 t-text="data.title" class="text-xl font-bold text-gray-900 dark:text-white"></h3>
    <p t-text="'By ' + data.author" class="text-sm text-gray-500 dark:text-gray-400"></p>
    <p t-text="data.content" class="text-gray-700 dark:text-gray-300"></p>
  </div>
</div>

### Progress Bar

Show loading progress:

```html
<div t-data="{
  progress: 0,
  loading: false,
  async load() {
    this.loading = true
    this.progress = 0
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      this.progress = i
    }
    this.loading = false
  }
}">
  <button t-click="load()">Start</button>
  <div t-show="loading">
    <div class="progress-bar" :style="'width: ' + progress + '%'"></div>
  </div>
</div>
```

<div t-data="{
  progress: 0,
  loading: false,
  async load() {
    this.loading = true
    this.progress = 0
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 150))
      this.progress = i
    }
    this.loading = false
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="load()" :disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    <span t-show="!loading">Start Loading</span>
    <span t-show="loading">Loading...</span>
  </button>

  <div t-show="loading" class="space-y-2">
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
      <div class="bg-pine-600 h-full transition-all duration-300" :style="'width: ' + progress + '%'"></div>
    </div>
    <p class="text-center text-gray-900 dark:text-white font-medium">
      <span t-text="progress"></span>%
    </p>
  </div>

  <div t-show="!loading && progress === 100" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-center">
    <p class="text-green-700 dark:text-green-300 font-medium">✓ Complete!</p>
  </div>
</div>

## Loading Messages

### Dynamic Loading Text

```html
<div t-data="{
  step: 1,
  loading: false,
  messages: ['Connecting...', 'Loading data...', 'Processing...', 'Almost done...'],
  async load() {
    this.loading = true
    for (let i = 0; i < this.messages.length; i++) {
      this.step = i
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    this.loading = false
  }
}">
  <div t-show="loading" t-text="messages[step]"></div>
</div>
```

<div t-data="{
  step: 0,
  loading: false,
  messages: ['🔌 Connecting to server...', '📦 Loading data...', '⚙️ Processing...', '✨ Almost done...'],
  async load() {
    this.loading = true
    for (let i = 0; i < this.messages.length; i++) {
      this.step = i
      await new Promise(resolve => setTimeout(resolve, 1200))
    }
    this.loading = false
    this.step = 0
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="load()" :disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    Start Process
  </button>

  <div t-show="loading" class="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <div class="animate-spin rounded-full h-6 w-6 border-3 border-pine-600 border-t-transparent"></div>
    <p t-text="messages[step]" class="text-blue-700 dark:text-blue-300 font-medium"></p>
  </div>

  <div t-show="!loading" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-center">
    <p class="text-green-700 dark:text-green-300 font-medium">✓ All steps completed!</p>
  </div>
</div>

## Inline Loading

Show loading state inline with content:

```html
<div t-data="{ saving: false }">
  <button t-click="save()">
    <span t-show="!saving">Save</span>
    <span t-show="saving">Saving...</span>
  </button>
</div>
```

<div t-data="{
  saving: false,
  saved: false,
  async save() {
    this.saving = true
    this.saved = false
    await new Promise(resolve => setTimeout(resolve, 1500))
    this.saving = false
    this.saved = true
    setTimeout(() => { this.saved = false }, 2000)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="save()" :disabled="saving" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50 flex items-center gap-2">
    <div t-show="saving" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
    <span t-show="!saving && !saved">💾 Save Changes</span>
    <span t-show="saving">Saving...</span>
    <span t-show="saved && !saving">✓ Saved!</span>
  </button>

  <p class="text-sm text-gray-600 dark:text-gray-400">
    Click the button to save
  </p>
</div>

## Button Loading States

Disable buttons during loading:

```html
<div t-data="{
  submitting: false,
  async submit() {
    this.submitting = true
    await fetch('/api/submit', { method: 'POST' })
    this.submitting = false
  }
}">
  <button t-click="submit()" :disabled="submitting">
    <span t-show="!submitting">Submit</span>
    <span t-show="submitting">Submitting...</span>
  </button>
</div>
```

<div t-data="{
  submitting: false,
  success: false,
  async submit() {
    this.submitting = true
    this.success = false
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.submitting = false
    this.success = true
    setTimeout(() => { this.success = false }, 3000)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="submit()" :disabled="submitting" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2">
    <div t-show="submitting" class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
    <span t-show="!submitting && !success">Submit Form</span>
    <span t-show="submitting">Submitting...</span>
    <span t-show="success && !submitting">✓ Submitted!</span>
  </button>

  <div t-show="success" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-center">
    <p class="text-green-700 dark:text-green-300">Form submitted successfully!</p>
  </div>
</div>

## Multiple Loading States

Handle multiple async operations:

```html
<div t-data="{
  loadingUsers: false,
  loadingPosts: false,
  async loadUsers() {
    this.loadingUsers = true
    await fetchUsers()
    this.loadingUsers = false
  },
  async loadPosts() {
    this.loadingPosts = true
    await fetchPosts()
    this.loadingPosts = false
  }
}">
  <button t-click="loadUsers()">Load Users</button>
  <button t-click="loadPosts()">Load Posts</button>

  <div t-show="loadingUsers">Loading users...</div>
  <div t-show="loadingPosts">Loading posts...</div>
</div>
```

<div t-data="{
  loadingUsers: false,
  loadingPosts: false,
  users: null,
  posts: null,
  async loadUsers() {
    this.loadingUsers = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    this.users = ['Alice', 'Bob', 'Charlie']
    this.loadingUsers = false
  },
  async loadPosts() {
    this.loadingPosts = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.posts = ['Post 1', 'Post 2', 'Post 3']
    this.loadingPosts = false
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="loadUsers()" :disabled="loadingUsers" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
      <span t-show="!loadingUsers">Load Users</span>
      <span t-show="loadingUsers">Loading...</span>
    </button>
    <button t-click="loadPosts()" :disabled="loadingPosts" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
      <span t-show="!loadingPosts">Load Posts</span>
      <span t-show="loadingPosts">Loading...</span>
    </button>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 class="font-bold text-gray-900 dark:text-white mb-2">Users</h4>
      <div t-show="loadingUsers" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-6 w-6 border-3 border-blue-600 border-t-transparent"></div>
      </div>
      <ul t-show="users && !loadingUsers" class="space-y-1">
        <li t-for="user in users" class="text-gray-700 dark:text-gray-300"><span t-text="user"></span></li>
      </ul>
      <p t-show="!users && !loadingUsers" class="text-gray-500 dark:text-gray-400 text-sm">Click to load</p>
    </div>

    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 class="font-bold text-gray-900 dark:text-white mb-2">Posts</h4>
      <div t-show="loadingPosts" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-6 w-6 border-3 border-green-600 border-t-transparent"></div>
      </div>
      <ul t-show="posts && !loadingPosts" class="space-y-1">
        <li t-for="post in posts" class="text-gray-700 dark:text-gray-300"><span t-text="post"></span></li>
      </ul>
      <p t-show="!posts && !loadingPosts" class="text-gray-500 dark:text-gray-400 text-sm">Click to load</p>
    </div>
  </div>
</div>

## Best Practices

### 1. Always Provide Feedback

```javascript
// Good: Clear loading state
{
  loading: false,
  async fetch() {
    this.loading = true
    try {
      await fetchData()
    } finally {
      this.loading = false
    }
  }
}
```

### 2. Disable Interactive Elements

```html
<!-- Good: Disable button during loading -->
<button t-click="submit()" :disabled="loading">
  Submit
</button>
```

### 3. Use Appropriate Indicators

```html
<!-- Fast operations: spinner -->
<div t-show="loading" class="spinner"></div>

<!-- Slow operations: progress bar -->
<div t-show="loading" class="progress-bar"></div>

<!-- File uploads: percentage -->
<div t-show="loading">Uploading: {{ progress }}%</div>
```

## See Also

- [t-fetch](#/docs/directives/async/t-fetch) - Data fetching
- [t-await](#/docs/directives/async/t-await) - Async operations
- [t-error](#/docs/directives/async/t-error) - Error handling
- [t-show](#/docs/directives/core/t-show) - Conditional visibility
