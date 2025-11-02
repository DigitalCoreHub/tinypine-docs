# t-fetch

The `t-fetch` directive simplifies fetching data from APIs. It automatically handles loading states, errors, and updates your component state with the response.

## Syntax

```html
<element t-fetch="url" t-key="dataProperty"></element>
```

## Basic Usage

### Simple GET Request

```html
<div t-data="{ users: [] }" t-fetch="'https://jsonplaceholder.typicode.com/users'" t-key="users">
  <div t-for="user in users">
    <p t-text="user.name"></p>
  </div>
</div>
```

<div t-data="{
  users: [],
  loading: true
}" t-init="(async function(){ try { const res = await fetch('https://jsonplaceholder.typicode.com/users'); users = await res.json(); } finally { loading = false; } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div t-show="loading" class="text-center py-4">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
    <p class="text-gray-500 dark:text-gray-400 mt-2">Loading users...</p>
  </div>
  <div t-show="!loading" class="space-y-2">
    <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p t-text="(users[0] && users[0].name) || ''" class="font-bold text-gray-900 dark:text-white"></p>
      <p t-text="(users[0] && users[0].email) || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p t-text="(users[1] && users[1].name) || ''" class="font-bold text-gray-900 dark:text-white"></p>
      <p t-text="(users[1] && users[1].email) || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
    <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p t-text="(users[2] && users[2].name) || ''" class="font-bold text-gray-900 dark:text-white"></p>
      <p t-text="(users[2] && users[2].email) || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
  </div>
</div>

### Random User

Fetch a random user from the API and display basic info.

```html
<div t-data="{ user: null, loading: false, error: '' }">
  <button onclick="(function(el){ const s = el.closest('[t-data]')._tinypineScope; s.loading = true; s.error = ''; (async function(){ try { const id = Math.floor(Math.random()*10)+1; const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id); s.user = await res.json(); } catch(e){ s.error = 'Failed to load user'; s.user = null; } finally { s.loading = false; } })(); })(this)">Get Random User</button>
  <div t-show="loading">Loading...</div>
  <div t-show="error" t-text="error"></div>
  <div t-show="!loading && user">
    <p><strong>Name:</strong> <span t-text="(user && user.name) || ''"></span></p>
    <p><strong>Email:</strong> <span t-text="(user && user.email) || ''"></span></p>
    <p><strong>Phone:</strong> <span t-text="(user && user.phone) || ''"></span></p>
  </div>
</div>
```

<div t-data="{ user: null, loading: false, error: '', async fetchUser() { this.loading = true; this.error = ''; try { const id = Math.floor(Math.random()*10)+1; const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id); this.user = await res.json(); } catch(e){ this.error = 'Failed to load user'; this.user = null; } finally { this.loading = false; } } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="fetchUser()" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">Get Random User</button>
  <div t-show="loading" class="text-gray-500 dark:text-gray-400">Loading...</div>
  <div t-show="error" class="text-red-600 dark:text-red-400" t-text="error"></div>
  <div t-show="!loading && user" class="space-y-1">
    <p class="text-gray-900 dark:text-white"><strong>Name:</strong> <span t-text="(user && user.name) || ''"></span></p>
    <p class="text-gray-900 dark:text-white"><strong>Email:</strong> <span t-text="(user && user.email) || ''"></span></p>
    <p class="text-gray-900 dark:text-white"><strong>Phone:</strong> <span t-text="(user && user.phone) || ''"></span></p>
  </div>
</div>

### Fetch Posts with Loading

```html
<div t-data="{
  posts: [],
  loading: false,
  async loadPosts() {
    this.loading = true
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    this.posts = await res.json()
    this.loading = false
  }
}" t-init="loadPosts()">
  <div t-show="loading">Loading...</div>
  <div t-for="post in posts">
    <h3 t-text="post.title"></h3>
  </div>
</div>
```

<div t-data="{
  posts: [],
  loading: false
}" t-init="(async function(){ loading = true; try { const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); posts = await res.json(); } finally { loading = false; } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div t-show="loading" class="flex items-center justify-center py-8">
    <div class="animate-spin rounded-full h-10 w-10 border-4 border-pine-600 border-t-transparent"></div>
  </div>
  <div t-show="!loading" class="space-y-4">
    <div class="p-4 bg-pine-50 dark:bg-pine-900/20 rounded-lg">
      <h3 t-text="(posts[0] && posts[0].title) || ''" class="font-bold text-gray-900 dark:text-white mb-2"></h3>
      <p t-text="(posts[0] && posts[0].body) || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
    <div class="p-4 bg-pine-50 dark:bg-pine-900/20 rounded-lg">
      <h3 t-text="(posts[1] && posts[1].title) || ''" class="font-bold text-gray-900 dark:text-white mb-2"></h3>
      <p t-text="(posts[1] && posts[1].body) || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
    <div class="p-4 bg-pine-50 dark:bg-pine-900/20 rounded-lg">
      <h3 t-text="(posts[2] && posts[2].title) || ''" class="font-bold text-gray-900 dark:text-white mb-2"></h3>
      <p t-text="(posts[2] && posts[2].body) || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
  </div>
</div>

## Error Handling

Handle fetch errors gracefully:

```html
<div t-data="{
  data: null,
  error: null,
  loading: false,
  async fetchData() {
    this.loading = true
    this.error = null
    try {
      const res = await fetch('https://api.example.com/data')
      if (!res.ok) throw new Error('Failed to fetch')
      this.data = await res.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}">
  <button t-click="fetchData()">Load Data</button>
  <div t-show="loading">Loading...</div>
  <div t-show="error" t-text="error"></div>
  <div t-show="data" t-text="data"></div>
</div>
```

<div t-data="{ data: null, error: null, loading: false, async fetchOk(){ this.loading = true; this.error = null; this.data = null; try { const res = await fetch('https://jsonplaceholder.typicode.com/todos/1'); if (!res.ok) throw new Error('Failed to fetch data'); this.data = await res.json(); } catch (e) { this.error = e.message; } finally { this.loading = false; } }, async fetchFail(){ this.loading = true; this.error = null; this.data = null; try { const res = await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint'); if (!res.ok) throw new Error('Failed to fetch data'); this.data = await res.json(); } catch (e) { this.error = e.message; } finally { this.loading = false; } } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="flex gap-2">
    <button t-click="fetchOk()" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
      Load Data (Success)
    </button>
    <button t-click="fetchFail()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      Load Data (Error)
    </button>
  </div>

  <div t-show="loading" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <p class="text-blue-700 dark:text-blue-300">Loading...</p>
  </div>

  <div t-show="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
    <p class="text-red-700 dark:text-red-300"><strong>Error:</strong> <span t-text="error"></span></p>
  </div>

  <div t-show="data" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <p class="text-green-700 dark:text-green-300"><strong>Success:</strong></p>
    <pre class="mt-2 text-xs overflow-x-auto" t-text="JSON.stringify(data, null, 2)"></pre>
  </div>
</div>

## POST Requests

Send data to an API:

```html
<div t-data="{
  title: '',
  result: null,
  async createPost() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: this.title, body: 'Content', userId: 1 })
    })
    this.result = await res.json()
  }
}">
  <input t-model="title" placeholder="Post title">
  <button t-click="createPost()">Create Post</button>
  <div t-show="result" t-text="'Created: ' + result.title"></div>
</div>
```

<div t-data="{ title: '', result: null, loading: false, async createPost(){ if (!(this.title && this.title.trim())) return; this.loading = true; try { const res = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: this.title, body: 'Sample content', userId: 1 }) }); this.result = await res.json(); this.title = ''; } finally { this.loading = false; } } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="flex gap-2">
    <input t-model="title" placeholder="Enter post title..." class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <button t-click="createPost()" t-bind:disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50 disabled:cursor-not-allowed">
      <span t-show="!loading">Create Post</span>
      <span t-show="loading">Creating...</span>
    </button>
  </div>

  <div t-show="result" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <p class="text-green-700 dark:text-green-300">
      <strong>✓ Post Created!</strong><br>
  ID: <span t-text="(result && result.id) || ''" class="font-mono"></span><br>
  Title: <span t-text="(result && result.title) || ''"></span>
    </p>
  </div>
</div>

## Refresh Data

Fetch a random user each time you click refresh:

```html
<div t-data="{
  user: null,
  async fetchUser() {
    const id = Math.floor(Math.random() * 10) + 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    this.user = await res.json()
  }
}" t-init="fetchUser()">
  <div t-show="user">
    <p>Name: <span t-text="user.name"></span></p>
    <p>Email: <span t-text="user.email"></span></p>
    <p>Phone: <span t-text="user.phone"></span></p>
  </div>
  <button t-click="fetchUser()">Refresh User</button>
</div>
```

<div t-data="{
  user: null,
  loading: false,
  error: ''
}" t-init="(async function(){ loading = true; error = ''; try { var id = Math.floor(Math.random()*10)+1; var res = await fetch('https://jsonplaceholder.typicode.com/users/' + id); user = await res.json(); } catch(e){ error = 'Failed to load user'; user = null; } finally { loading = false; } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-show="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
  </div>
  <div t-show="error" class="text-center text-red-600 dark:text-red-400" t-text="error"></div>
  <div t-show="!loading && user" class="space-y-1">
    <p class="text-gray-900 dark:text-white"><strong>Name:</strong> <span t-text="(user && user.name) || ''"></span></p>
    <p class="text-gray-900 dark:text-white"><strong>Email:</strong> <span t-text="(user && user.email) || ''"></span></p>
    <p class="text-gray-900 dark:text-white"><strong>Phone:</strong> <span t-text="(user && user.phone) || ''"></span></p>
  </div>
  <button t-click="(async function(){ loading = true; error = ''; try { const id = Math.floor(Math.random()*10)+1; const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id); user = await res.json(); } catch(e){ error = 'Failed to load user'; user = null; } finally { loading = false; } })()" t-bind:disabled="loading" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 disabled:opacity-50">
    <span t-show="!loading">🔄 Get Random User</span>
    <span t-show="loading">Loading...</span>
  </button>
</div>

## Search with Debounce

Debounce API calls for search:

```html
<div t-data="{
  query: '',
  results: [],
  timer: null,
  search() {
    clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      if (this.query.length > 2) {
        const res = await fetch(`https://api.example.com/search?q=${this.query}`)
        this.results = await res.json()
      }
    }, 300)
  }
}">
  <input t-model="query" t-input="search()" placeholder="Search...">
  <div t-for="result in results" t-text="result.name"></div>
</div>
```

<div t-data="{
  query: '',
  results: [],
  loading: false,
  timer: null,
  search() {
    clearTimeout(this.timer)
    if (this.query.length < 3) {
      this.results = []
      return
    }
    this.loading = true
    this.timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${this.query}`)
        this.results = await res.json()
      } finally {
        this.loading = false
      }
    }, 500)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-model="query" oninput="(function(el){ const scope = el.closest('[t-data]')._tinypineScope; clearTimeout(scope.timer); if (!scope.query || scope.query.length < 3) { scope.results = []; scope.loading = false; return; } scope.loading = true; scope.timer = setTimeout(async function(){ try { const res = await fetch('https://jsonplaceholder.typicode.com/users?name_like=' + encodeURIComponent(scope.query)); const json = await res.json(); scope.results = json; } finally { scope.loading = false; } }, 500); })(this)" placeholder="Search users (type at least 3 characters)..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">

  <div t-show="loading" class="text-gray-500 dark:text-gray-400 text-sm">
    Searching...
  </div>

  <div t-show="!loading && results.length > 0" class="space-y-2">
    <p class="text-sm font-medium text-gray-900 dark:text-white">
      Found <span t-text="results.length"></span> results:
    </p>
    <div t-for="(result, index) in results" class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
      <p t-text="results[index] && results[index].name || ''" class="font-bold text-gray-900 dark:text-white"></p>
      <p t-text="results[index] && results[index].email || ''" class="text-sm text-gray-600 dark:text-gray-400"></p>
    </div>
  </div>

  <div t-show="!loading && query.length >= 3 && results.length === 0" class="text-gray-500 dark:text-gray-400 text-sm">
    No results found
  </div>
  </div>
</div>

## Pagination

Implement paginated data fetching:

```html
<div t-data="{
  items: [],
  page: 1,
  async loadPage() {
    const res = await fetch(`https://api.example.com/items?page=${this.page}`)
    this.items = await res.json()
  },
  nextPage() {
    this.page++
    this.loadPage()
  }
}" t-init="loadPage()">
  <div t-for="item in items" t-text="item.name"></div>
  <button t-click="nextPage()">Next Page</button>
</div>
```

<div t-data="{
  photos: [],
  page: 1,
  loading: false,
  async loadPage() {
    this.loading = true
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${this.page}&_limit=6`)
      this.photos = await res.json()
    } finally {
      this.loading = false
    }
  },
  nextPage() {
    if (this.page < 5) {
      this.page++
      this.loadPage()
    }
  },
  prevPage() {
    if (this.page > 1) {
      this.page--
      this.loadPage()
    }
  }
}" t-init="(async function(){ loading = true; try { const res = await fetch('https://jsonplaceholder.typicode.com/photos?_page=' + page + '&_limit=6'); photos = await res.json(); } finally { loading = false; } })()" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-show="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pine-600 border-t-transparent"></div>
  </div>

  <div t-show="!loading" class="grid grid-cols-3 gap-3">
    <div t-for="(photo, index) in photos" class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
      <img t-bind:src="(photos[index] && photos[index].thumbnailUrl) || ''" t-bind:alt="(photos[index] && photos[index].title) || ''" class="w-full h-full object-cover">
    </div>
  </div>

  <div class="flex items-center justify-between">
  <button t-click="prevPage()" t-bind:disabled="page === 1 || loading" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
      ← Previous
    </button>
    <span class="text-gray-900 dark:text-white font-medium">
      Page <span t-text="page"></span> of 5
    </span>
  <button t-click="nextPage()" t-bind:disabled="page === 5 || loading" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
      Next →
    </button>
  </div>
</div>

## Best Practices

### 1. Always Handle Loading State

```javascript
// Good
{
  loading: false,
  async fetch() {
    this.loading = true
    try {
      // fetch data
    } finally {
      this.loading = false
    }
  }
}
```

### 2. Handle Errors Gracefully

```javascript
// Good
{
  error: null,
  async fetch() {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed')
      this.data = await res.json()
    } catch (err) {
      this.error = err.message
    }
  }
}
```

### 3. Avoid Race Conditions

```javascript
// Good: Track request ID
{
  requestId: 0,
  async fetch() {
    const id = ++this.requestId
    const data = await fetchData()
    if (id === this.requestId) {
      this.data = data
    }
  }
}
```

## See Also

- [t-await](#/docs/directives/async/t-await) - Await async operations
- [t-loading](#/docs/directives/async/t-loading) - Loading states
- [t-error](#/docs/directives/async/t-error) - Error handling
- [t-init](#/docs/directives/structural/t-init) - Initialization hook
