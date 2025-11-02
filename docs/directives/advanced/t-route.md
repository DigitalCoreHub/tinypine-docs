# t-route

The `t-route` directive enables simple client-side routing in TinyPine applications. It shows content based on the current URL hash, perfect for single-page applications.

## Syntax

```html
<element t-route="routePath"></element>
```

## Basic Usage

### Simple Routes

```html
<div t-data="{ currentRoute: window.location.hash }">
  <a href="#/">Home</a>
  <a href="#/about">About</a>
  <a href="#/contact">Contact</a>

  <div t-show="currentRoute === '#/' || currentRoute === ''">
    <h1>Home Page</h1>
  </div>

  <div t-show="currentRoute === '#/about'">
    <h1>About Page</h1>
  </div>

  <div t-show="currentRoute === '#/contact'">
    <h1>Contact Page</h1>
  </div>
</div>
```

<div t-data="{
  route: window.location.hash || '#/home',
  init() {
    window.addEventListener('hashchange', () => {
      this.route = window.location.hash || '#/home'
    })
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <nav class="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
    <a href="#/home" class="px-4 py-2 rounded" :class="route === '#/home' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'">
      Home
    </a>
    <a href="#/about" class="px-4 py-2 rounded" :class="route === '#/about' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'">
      About
    </a>
    <a href="#/contact" class="px-4 py-2 rounded" :class="route === '#/contact' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'">
      Contact
    </a>
  </nav>

  <div t-show="route === '#/home'" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">🏠 Home Page</h2>
    <p class="text-gray-700 dark:text-gray-300">Welcome to the home page of our application!</p>
  </div>

  <div t-show="route === '#/about'" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">ℹ️ About Page</h2>
    <p class="text-gray-700 dark:text-gray-300">Learn more about what we do and our mission.</p>
  </div>

  <div t-show="route === '#/contact'" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">📧 Contact Page</h2>
    <p class="text-gray-700 dark:text-gray-300">Get in touch with us through our contact form.</p>
  </div>
</div>

### Route Parameters

Extract parameters from routes:

```html
<div t-data="{
  route: '',
  params: {},
  init() {
    this.updateRoute()
    window.addEventListener('hashchange', () => this.updateRoute())
  },
  updateRoute() {
    const hash = window.location.hash
    if (hash.startsWith('#/user/')) {
      this.route = 'user'
      this.params.id = hash.split('/')[2]
    }
  }
}">
  <div t-show="route === 'user'">
    <h1>User Profile</h1>
    <p t-text="'User ID: ' + params.id"></p>
  </div>
</div>
```

<div t-data="{
  route: '#/users',
  userId: null,
  users: [
    { id: 1, name: 'Alice Johnson', role: 'Developer' },
    { id: 2, name: 'Bob Smith', role: 'Designer' },
    { id: 3, name: 'Charlie Brown', role: 'Manager' }
  ],
  init() {
    this.updateRoute()
    window.addEventListener('hashchange', () => this.updateRoute())
  },
  updateRoute() {
    const hash = window.location.hash
    if (hash.startsWith('#/user/')) {
      this.route = '#/user'
      this.userId = parseInt(hash.split('/')[2])
    } else {
      this.route = hash || '#/users'
      this.userId = null
    }
  },
  get currentUser() {
    return this.users.find(u => u.id === this.userId)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <nav class="flex gap-2 mb-4">
    <a href="#/users" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700">
      ← Back to Users
    </a>
  </nav>

  <div t-show="route === '#/users'" class="space-y-2">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Users List</h2>
    <div t-for="user in users" class="p-3 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-between">
      <div>
        <p t-text="user.name" class="font-bold text-gray-900 dark:text-white"></p>
        <p t-text="user.role" class="text-sm text-gray-600 dark:text-gray-400"></p>
      </div>
      <a :href="'#/user/' + user.id" class="px-3 py-1 bg-pine-600 text-white rounded text-sm hover:bg-pine-700">
        View Profile
      </a>
    </div>
  </div>

  <div t-show="route === '#/user' && currentUser" class="p-6 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Profile</h2>
    <div class="space-y-2">
      <p class="text-gray-700 dark:text-gray-300">
        <strong>ID:</strong> <span t-text="currentUser.id"></span>
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        <strong>Name:</strong> <span t-text="currentUser.name"></span>
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        <strong>Role:</strong> <span t-text="currentUser.role"></span>
      </p>
    </div>
  </div>
</div>

## Nested Routes

Handle nested route structures:

```html
<div t-data="{
  route: '',
  parseRoute() {
    const parts = window.location.hash.split('/')
    return {
      section: parts[1] || 'home',
      subsection: parts[2] || null
    }
  }
}">
  <div t-show="parseRoute().section === 'docs'">
    <h1>Documentation</h1>
    <div t-show="parseRoute().subsection === 'intro'">
      Introduction content
    </div>
    <div t-show="parseRoute().subsection === 'api'">
      API Reference
    </div>
  </div>
</div>
```

<div t-data="{
  route: '#/docs',
  section: null,
  docs: {
    intro: { title: 'Introduction', content: 'Welcome to our documentation! This guide will help you get started.' },
    guide: { title: 'User Guide', content: 'Step-by-step instructions on how to use our product effectively.' },
    api: { title: 'API Reference', content: 'Complete API documentation with endpoints and examples.' }
  },
  init() {
    this.updateRoute()
    window.addEventListener('hashchange', () => this.updateRoute())
  },
  updateRoute() {
    const hash = window.location.hash
    if (hash.startsWith('#/docs/')) {
      this.route = '#/docs'
      this.section = hash.split('/')[2]
    } else {
      this.route = hash || '#/docs'
      this.section = null
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <nav class="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
    <div class="flex gap-2">
      <a href="#/docs/intro" class="px-3 py-2 rounded text-sm" :class="section === 'intro' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'">
        Introduction
      </a>
      <a href="#/docs/guide" class="px-3 py-2 rounded text-sm" :class="section === 'guide' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'">
        User Guide
      </a>
      <a href="#/docs/api" class="px-3 py-2 rounded text-sm" :class="section === 'api' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'">
        API Reference
      </a>
    </div>
  </nav>

  <div t-show="!section" class="p-6 bg-gray-50 dark:bg-gray-700 rounded text-center">
    <p class="text-gray-500 dark:text-gray-400">Select a documentation section above</p>
  </div>

  <div t-show="section && docs[section]" class="p-6 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <h2 t-text="docs[section]?.title" class="text-2xl font-bold text-gray-900 dark:text-white mb-3"></h2>
    <p t-text="docs[section]?.content" class="text-gray-700 dark:text-gray-300"></p>
  </div>
</div>

## 404 Not Found

Handle invalid routes:

```html
<div t-data="{
  route: '',
  validRoutes: ['#/', '#/about', '#/contact'],
  get is404() {
    return !this.validRoutes.includes(this.route)
  }
}">
  <div t-show="is404">
    <h1>404 - Page Not Found</h1>
    <a href="#/">Go Home</a>
  </div>
</div>
```

<div t-data="{
  route: '#/',
  validRoutes: ['#/', '#/page1', '#/page2'],
  init() {
    this.route = window.location.hash || '#/'
    window.addEventListener('hashchange', () => {
      this.route = window.location.hash || '#/'
    })
  },
  get is404() {
    return !this.validRoutes.includes(this.route)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <nav class="flex gap-2 mb-4">
    <a href="#/" class="px-3 py-2 bg-pine-600 text-white rounded text-sm hover:bg-pine-700">Home</a>
    <a href="#/page1" class="px-3 py-2 bg-pine-600 text-white rounded text-sm hover:bg-pine-700">Page 1</a>
    <a href="#/page2" class="px-3 py-2 bg-pine-600 text-white rounded text-sm hover:bg-pine-700">Page 2</a>
    <a href="#/invalid" class="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700">Invalid</a>
  </nav>

  <div t-show="!is404 && route === '#/'" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Home Page</h2>
    <p class="text-gray-700 dark:text-gray-300 mt-2">Welcome to the home page!</p>
  </div>

  <div t-show="!is404 && route === '#/page1'" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Page 1</h2>
    <p class="text-gray-700 dark:text-gray-300 mt-2">This is page 1 content.</p>
  </div>

  <div t-show="!is404 && route === '#/page2'" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Page 2</h2>
    <p class="text-gray-700 dark:text-gray-300 mt-2">This is page 2 content.</p>
  </div>

  <div t-show="is404" class="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-center">
    <div class="text-6xl mb-4">404</div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
    <p class="text-gray-700 dark:text-gray-300 mb-4">The page you're looking for doesn't exist.</p>
    <a href="#/" class="inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Go to Home
    </a>
  </div>
</div>

## Route Guards

Protect routes with authentication:

```html
<div t-data="{
  isAuthenticated: false,
  route: '',
  protectedRoutes: ['#/dashboard', '#/settings'],
  get canAccess() {
    return !this.protectedRoutes.includes(this.route) || this.isAuthenticated
  }
}">
  <div t-show="!canAccess">
    <h1>Access Denied</h1>
    <p>Please log in to view this page</p>
    <button t-click="isAuthenticated = true">Login</button>
  </div>
</div>
```

<div t-data="{
  isAuthenticated: false,
  route: '#/public',
  protectedRoutes: ['#/dashboard', '#/settings'],
  init() {
    this.route = window.location.hash || '#/public'
    window.addEventListener('hashchange', () => {
      this.route = window.location.hash || '#/public'
    })
  },
  get canAccess() {
    return !this.protectedRoutes.includes(this.route) || this.isAuthenticated
  },
  login() {
    this.isAuthenticated = true
  },
  logout() {
    this.isAuthenticated = false
    window.location.hash = '#/public'
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
    <nav class="flex gap-2">
      <a href="#/public" class="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm hover:bg-gray-300">
        Public
      </a>
      <a href="#/dashboard" class="px-3 py-2 bg-pine-600 text-white rounded text-sm hover:bg-pine-700">
        Dashboard 🔒
      </a>
      <a href="#/settings" class="px-3 py-2 bg-pine-600 text-white rounded text-sm hover:bg-pine-700">
        Settings 🔒
      </a>
    </nav>
    <button t-show="isAuthenticated" t-click="logout()" class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
      Logout
    </button>
  </div>

  <div t-show="canAccess && route === '#/public'" class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Public Page</h2>
    <p class="text-gray-700 dark:text-gray-300 mt-2">This page is accessible to everyone.</p>
  </div>

  <div t-show="canAccess && route === '#/dashboard'" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
    <p class="text-gray-700 dark:text-gray-300 mt-2">Welcome to your protected dashboard!</p>
  </div>

  <div t-show="canAccess && route === '#/settings'" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
    <p class="text-gray-700 dark:text-gray-300 mt-2">Manage your account settings here.</p>
  </div>

  <div t-show="!canAccess" class="p-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-center">
    <div class="text-5xl mb-4">🔒</div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
    <p class="text-gray-700 dark:text-gray-300 mb-4">Please log in to view this page.</p>
    <button t-click="login()" class="px-6 py-2 bg-pine-600 text-white rounded hover:bg-pine-700">
      Login
    </button>
  </div>
</div>

## Programmatic Navigation

Navigate using JavaScript:

```html
<div t-data="{
  navigate(path) {
    window.location.hash = path
  }
}">
  <button t-click="navigate('#/about')">Go to About</button>
</div>
```

<div t-data="{
  route: '#/',
  history: [],
  init() {
    this.route = window.location.hash || '#/'
    this.history.push(this.route)
    window.addEventListener('hashchange', () => {
      this.route = window.location.hash || '#/'
      this.history.push(this.route)
      if (this.history.length > 5) this.history.shift()
    })
  },
  navigate(path) {
    window.location.hash = path
  },
  goBack() {
    window.history.back()
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="grid grid-cols-3 gap-2">
    <button t-click="navigate('#/')" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700">
      Home
    </button>
    <button t-click="navigate('#/products')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Products
    </button>
    <button t-click="navigate('#/cart')" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
      Cart
    </button>
  </div>

  <button t-click="goBack()" class="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
    ← Go Back
  </button>

  <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
    <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Current Route:</p>
    <code t-text="route" class="text-pine-600 dark:text-pine-400"></code>
  </div>

  <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
    <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Navigation History:</p>
    <div class="space-y-1">
      <div t-for="h in history" class="text-sm text-gray-600 dark:text-gray-400">
        <code t-text="h"></code>
      </div>
    </div>
  </div>
</div>

## Best Practices

### 1. Always Handle Hash Changes

```javascript
// Good: Listen to hash changes
{
  init() {
    window.addEventListener('hashchange', () => {
      this.route = window.location.hash
    })
  }
}
```

### 2. Provide Default Routes

```javascript
// Good: Default to home
{
  route: window.location.hash || '#/'
}
```

### 3. Validate Routes

```javascript
// Good: Check if route exists
{
  validRoutes: ['#/', '#/about', '#/contact'],
  get isValid() {
    return this.validRoutes.includes(this.route)
  }
}
```

## See Also

- [t-show](#/docs/directives/core/t-show) - Conditional visibility
- [t-if](#/docs/directives/structural/t-if) - Conditional rendering
- [t-click](#/docs/directives/core/t-click) - Click events
- [t-transition](#/docs/directives/advanced/t-transition) - Page transitions
