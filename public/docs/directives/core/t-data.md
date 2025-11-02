# t-data

The `t-data` directive declares a new component scope and defines its reactive state.

## Syntax

```html
<div t-data="{ count: 0 }">
  <!-- Component scope -->
</div>
```

Or with a function:

```html
<div t-data="counter()">
  <!-- Component scope -->
</div>

<script>
  function counter() {
    return {
      count: 0,
      increment() {
        this.count++
      }
    }
  }
</script>
```

## Basic Usage

### Inline Object

Simple components can be defined inline:

```html
<div t-data="{ name: 'John', age: 30 }">
  <p>Name: <span t-text="name"></span></p>
  <p>Age: <span t-text="age"></span></p>
</div>
```

<div t-data="{ name: 'John', age: 30 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <p class="text-gray-900 dark:text-white">Name: <span t-text="name" class="font-bold text-pine-600"></span></p>
  <p class="text-gray-900 dark:text-white">Age: <span t-text="age" class="font-bold text-pine-600"></span></p>
</div>

### Component Function

For complex components, use a function:

```html
<div t-data="userProfile()">
  <input t-model="name" type="text" placeholder="Enter name">
  <button t-click="greet()">Greet</button>
  <p t-show="greeting" t-text="greeting"></p>
</div>

<script>
  function userProfile() {
    return {
      name: '',
      greeting: '',

      greet() {
        this.greeting = `Hello, ${this.name}!`
      }
    }
  }
</script>
```

<div t-data="{ name: '', greeting: '' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <input t-model="name" type="text" placeholder="Enter your name" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  <button t-click="greeting = name ? `Hello, ${name}!` : ''" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Greet Me
  </button>
  <p t-show="greeting" t-text="greeting" class="text-lg font-medium text-gray-900 dark:text-white"></p>
</div>

## State Management

### Reactive Properties

All properties in your data object are automatically reactive:

```html
<div t-data="{ count: 0, doubled: 0 }">
  <button t-click="count++; doubled = count * 2">
    Count: <span t-text="count"></span>
  </button>
  <p>Doubled: <span t-text="doubled"></span></p>
</div>
```

### Methods

Define methods to encapsulate logic:

```html
<div t-data="calculator()">
  <input t-model="a" type="number">
  +
  <input t-model="b" type="number">
  =
  <span t-text="sum()"></span>
</div>

<script>
  function calculator() {
    return {
      a: 0,
      b: 0,

      sum() {
        return Number(this.a) + Number(this.b)
      }
    }
  }
</script>
```

<div t-data="{ a: 5, b: 3 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="flex items-center gap-3 text-gray-900 dark:text-white">
    <input t-model="a" type="number" class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <span class="text-2xl">+</span>
    <input t-model="b" type="number" class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <span class="text-2xl">=</span>
    <span t-text="Number(a) + Number(b)" class="text-2xl font-bold text-pine-600"></span>
  </div>
</div>

## Initialization

### Init Method

Use `init()` method for setup logic:

```javascript
function component() {
  return {
    data: null,

    init() {
      // Called when component is initialized
      this.fetchData()
    },

    async fetchData() {
      const response = await fetch('/api/data')
      this.data = await response.json()
    }
  }
}
```

### Lifecycle

The `init()` method is called once when the component is mounted:

```html
<div t-data="timer()">
  <p>Elapsed: <span t-text="seconds"></span>s</p>
</div>

<script>
  function timer() {
    return {
      seconds: 0,

      init() {
        setInterval(() => {
          this.seconds++
        }, 1000)
      }
    }
  }
</script>
```

## Nested Components

Components can be nested:

```html
<div t-data="parent()">
  <h2 t-text="parentName"></h2>

  <div t-data="child()">
    <p t-text="childName"></p>
  </div>
</div>
```

Each component has its own isolated scope.

## Best Practices

### 1. Use Functions for Reusability

```html
<!-- Good: Reusable -->
<div t-data="counter()"></div>
<div t-data="counter()"></div>

<!-- Bad: Shared state -->
<div t-data="{ count: 0 }"></div>
<div t-data="{ count: 0 }"></div>
```

### 2. Keep State Flat

```javascript
// Good
{
  firstName: 'John',
  lastName: 'Doe',
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

// Avoid
{
  user: {
    name: {
      first: 'John',
      last: 'Doe'
    }
  }
}
```

### 3. Descriptive Names

```javascript
// Good
function todoList() { ... }

// Bad
function component1() { ... }
```

## Common Patterns

### Loading State

```javascript
function dataLoader() {
  return {
    loading: false,
    data: null,
    error: null,

    async fetch() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('/api/data')
        this.data = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
```

### Form Handling

```javascript
function contactForm() {
  return {
    form: {
      name: '',
      email: '',
      message: ''
    },
    submitted: false,

    submit() {
      console.log('Submitting:', this.form)
      this.submitted = true
    },

    reset() {
      this.form = { name: '', email: '', message: '' }
      this.submitted = false
    }
  }
}
```

## See Also

- [t-model](#/docs/directives/t-model) - Two-way data binding
- [t-click](#/docs/directives/t-click) - Event handling
- [t-show](#/docs/directives/t-show) - Conditional rendering
